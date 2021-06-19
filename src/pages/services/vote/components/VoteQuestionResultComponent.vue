<template>
  <table width="100%" cellpadding="0" cellspacing="0" @click="click">
    <tbody>
      <tr>
        <td width="60" align="right">{{ percent() }}%</td>
        <td width="3"></td>
        <td>{{ question.body }}</td>
      </tr>
      <tr>
        <td width="60" align="right"><v-icon small v-if="checked()" color="primary">mdi-check-circle</v-icon></td>
        <td width="3"></td>
        <td height="24"><v-progress-linear :value="percent()" height="2" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "VoteQuestionResultComponent",
  props: ["vote", "question", "person", "type"],
  computed: {
    ...mapState(["flats"]),
  },
  methods: {
    checked() {
      if (this.vote.answers == null || this.vote.answers.length == 0) return false;
      if (this.person == null) return false;
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == this.question.id);
      return qAnswers.filter(answer => answer.person.id == this.person.id).length != 0
    },
    percent() {
      switch (this.type) {
        case "persons": return this.percentPersons();
        case "flats": return this.percentFlats();
        case "squares": return this.percentSquares();
        default: return this.percentPersons();
      }
    },
    click() {
      this.$emit("click");
    },
    percentPersons() {
      if (this.vote.answers == null || this.vote.answers.length == 0) return 0;
      // отфильтровываем голоса по конкретному вопросу
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == this.question.id);
      return (qAnswers.length / this.vote.persons * 100).toFixed(2);
    },
    percentFlats() {
      if (this.vote.answers == null || this.vote.answers.length == 0) return 0;
      if (this.flats == null || this.flats.length == 0) return 0;
      // отфильтровываем голоса по конкретному вопросу
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == this.question.id);
      // получаем количество квартир, проголосовавших по конкретному вопросу
      let qUniqueFlatsCount = 0;
      const qFlats = {};
      for (let answer of qAnswers) {
        const aFlat = answer.person.flat;
        if (qFlats[aFlat.id] == null) {
          qFlats[aFlat.id] = [];
          qUniqueFlatsCount++;
        }
        qFlats[aFlat.id].push(answer.person);
      }
      return (qUniqueFlatsCount / this.flats.length * 100).toFixed(2);
    },
    percentSquares() {
      if (this.vote.answers == null || this.vote.answers.length == 0) return 0;
      if (this.flats == null || this.flats.length == 0) return 0;
      // отфильтровываем голоса по конкретному вопросу
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == this.question.id);
      // получаем количество квартир, проголосовавших по конкретному вопросу
      let qUniqueFlatsSquares = 0;
      const qFlats = {};
      for (let answer of qAnswers) {
        const aFlat = answer.person.flat;
        if (qFlats[aFlat.id] == null) {
          qFlats[aFlat.id] = [];
          qUniqueFlatsSquares += aFlat.square;
        }
        qFlats[aFlat.id].push(answer.person);
      }
      return (qUniqueFlatsSquares / this.flats.reduce((sum, flat) => sum + flat.square, 0) * 100).toFixed(2);
    },
  },
};
</script>