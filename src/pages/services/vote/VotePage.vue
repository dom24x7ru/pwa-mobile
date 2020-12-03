<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card v-if="vote != null">
          <v-card-subtitle>
            <span class="font-weight-medium text-uppercase">{{ vote.title }}</span><br />
            <span class="text--disabled">{{ vote.createdAt | formatDate }}</span>
            <span v-if="vote.closed" class="text--disabled"><br />Голосование завершено</span>
          </v-card-subtitle>
          <v-card-text>
            Проголосовало {{ vote.answers.length }} из {{ vote.persons }}
            <v-divider />
            <div v-if="answered == null"></div>
            <div v-if="answered == false && !vote.closed">
              <v-checkbox v-for="question of vote.questions" :key="question.id" :label="question.body" :value="question.id" v-model="answers" hide-details />
            </div>
            <div v-else>
              <br />
              <table width="100%" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr v-for="question of vote.questions" :key="question.id">
                    <td>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tbody>
                          <tr>
                            <td width="60" align="right">
                              {{ percent(question) }}%
                            </td>
                            <td width="3"></td>
                            <td>
                              {{ question.body }}
                            </td>
                          </tr>
                          <tr>
                            <td width="60" align="right">
                              <v-icon small v-if="checked(question)" color="primary">mdi-check-circle</v-icon>
                            </td>
                            <td width="3"></td>
                            <td height="24">
                              <v-progress-linear :value="percent(question)" height="2" />
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </v-card-text>
          <v-card-actions v-if="answered != null && answered == false && !vote.closed">
            <v-btn text color="primary" :disabled="answers.length == 0 || waitResult" @click="send">Проголосовать</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import Toast from "@/components/ToastComponent";

export default {
  name: "VotePage",
  data() {
    return {
      vote: null,
      answers: [],
      waitResult: false,
      toast: {
        show: false,
        text: null,
        color: null
      },
    };
  },
  computed: {
    voteId() {
      return this.$route.params.voteId;
    },
    answered() {
      const answers = this.vote.answers;
      if (answers == null) return false;

      const person = this.user.person;
      if (person == null) return null;

      return answers.filter(answer => answer.person.id == person.id).length != 0;
    },
    ...mapState(["ready", "client", "user"]),
    ...mapGetters(["getVote"]),
  },
  created() {
    this.setTitle("Голосование");
    if (this.ready.votes) this.vote = this.getVote(this.voteId);
  },
  methods: {
    async send() {
      console.log("Отправить свой ответ по голосованию");
      if (this.vote.closed) {
        console.warn("Нельзя голосовать в уже закрытом голосовании");
        return;
      }
      if (this.answers.length == 0) {
        console.warn("Ни одного ответа не выбрано");
        return;
      }
      if (this.answered) {
        console.warn("Нельзя голосовать дважды");
        return;
      }
      this.waitResult = true;
      const result = await this.client.wrapEmit("vote.answer", { voteId: this.vote.id, answers: this.answers });
      console.log(result);
      if (result.status == "OK") {
        this.toast.text = "Успешно проголосовали";
        this.toast.color = "success";
        this.toast.show = true;
        console.log(this.toast.text);
      } else {
        this.toast.text = "Проголосовать не удалось. Попробуйте позже";
        this.toast.color = "error";
        this.toast.show = true;
        console.error(this.toast.text);
      }
      this.waitResult = false;
    },
    checked(question) {
      if (this.vote.answers == null || this.vote.answers.length == 0) return false;
      if (this.user == null || this.user.person == null) return false;
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == question.id);
      return qAnswers.filter(answer => answer.person.id == this.user.person.id).length != 0
    },
    percent(question) {
      if (this.vote.answers == null || this.vote.answers.length == 0) return 0;
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == question.id);
      return (qAnswers.length / this.vote.persons * 100).toFixed(2);
    },
    toastClose() {
      this.toast.show = false;
    },
    ...mapMutations(["setTitle"]),
  },
  filters: {
    formatDate(value) {
      if (value == null) return "";
      return moment(value).format("DD.MM.YYYY HH:mm:ss");
    },
  },
  watch: {
    "ready.votes"() {
      this.vote = this.getVote(this.voteId);
    },
    answers() {
      if (!this.vote.multi && this.answers.length > 1) {
        // можно только один выбрать
        const lastAnswer = this.answers[this.answers.length - 1];
        this.answers = [lastAnswer];
      }
    },
  },
  components: {
    Toast,
  },
};
</script>