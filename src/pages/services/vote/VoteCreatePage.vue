<template>
  <v-container fluid>
    <v-text-field v-model="title" label="Заголовок" required />

    <VoteQuestion v-for="question of questions" :key="question.id" :question="question" @change="changeQuestion" @delete="delQuestion" />
    <v-btn color="primary" text @click="addQuestion">Добавить вопрос</v-btn>
    
    <v-checkbox v-model="anonymous" label="анонимно" hide-details />
    <v-checkbox v-model="multi" label="несколько ответов" hide-details />
    
    <v-radio-group v-model="type">
      <v-radio label="весь дом" value="house" />
      <v-radio label="весь подъезд" value="section" />
      <v-radio label="весь этаж в подъезде" value="floor" />
    </v-radio-group>

    <v-btn color="primary" @click="save" :disabled="!checkVote || waitResult">Сохранить</v-btn>
    <br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import VoteQuestion from "./components/VoteQuestionComponent";
import Toast from "@/components/ToastComponent";

export default {
  name: "VoteCreatePage",
  data() {
    return {
      title: null,
      questions: [],
      anonymous: false,
      multi: false,
      type: null,
      waitResult: false,
      toast: {
        show: false,
        text: null,
        color: null
      },
    };
  },
  computed: {
    checkVote() {
      if (this.title == null || this.title.trim().length == 0) return false;
      if (this.questions.length < 2) return false;
      if (this.type == null) return false;

      // более сложная проверка, что непустых вопросов должно быть не менее двух
      const questions = this.questions.filter(question => question.body != null && question.body.trim().length != 0);
      if (questions.length < 2) return false;

      return true;
    },
    ...mapState(["client"]),
  },
  created() {
    this.setTitle("Новое голосование");
  },
  methods: {
    addQuestion() {
      this.questions.push({ id: new Date().getTime(), body: null });
    },
    delQuestion(question) {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].id == question.id) {
          this.questions.splice(i, 1);
          return;
        }
      }
    },
    changeQuestion(question) {
      for (let i = 0; i < this.questions.length; i++) {
        if (this.questions[i].id == question.id) {
          this.questions.splice(i, 1, question);
          return;
        }
      }
    },
    async save() {
      console.log("Создание голосования");
      if (!this.checkVote) {
        this.toast.text = "Необходимо указать заголовок, задать хотя бы два не пустых вопроса, а также выбрать кому будет доступно голосование";
        this.toast.color = "error";
        this.toast.show = true;
        console.error(this.toast.text);
        return;
      }
      const params = {
        title: this.title,
        questions: this.questions,
        anonymous: this.anonymous,
        multi: this.multi,
        type: this.type,
      };
      this.waitResult = true;
      const result = await this.client.wrapEmit("vote.save", params);
      console.log(result);
      if (result.status == "OK") {
        this.$router.push("/votes");
      } else {
        this.toast.text = "Не удалось создать голосование. Попробуйте позже";
        this.toast.color = "error";
        this.toast.show = true;
        console.error(this.toast.text);
      }
      this.waitResult = false;
    },
    toastClose() {
      this.toast.show = false;
    },
    ...mapMutations(["setTitle"]),
  },
  components: {
    Toast, VoteQuestion,
  },
};
</script>