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
                    <td><VoteQuestionResult :vote="vote" :question="question" :person="user.person" @click="if (!vote.anonymous) sheet = !sheet" /></td>
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
    <v-bottom-sheet v-if="vote != null && !vote.anonymous" v-model="sheet" scrollable>
      <v-card>
        <v-card-title>Результаты</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;">
          <VoteResults :vote="vote" />
        </v-card-text>
      </v-card>
    </v-bottom-sheet>
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toast.show = !toast.show" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import moment from "moment";
import Toast from "@/components/ToastComponent";
import VoteQuestionResult from "./components/VoteQuestionResultComponent";
import VoteResults from "./components/VoteResultsComponent";

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
      sheet: false,
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
    ...mapState(["ready", "client", "user", "changed"]),
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
    "changed.votes"() {
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
    Toast, VoteQuestionResult, VoteResults,
  },
};
</script>