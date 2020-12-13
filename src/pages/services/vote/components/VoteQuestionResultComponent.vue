<template>
  <table width="100%" cellpadding="0" cellspacing="0" @click="click">
    <tbody>
      <tr>
        <td width="60" align="right">{{ percent(question) }}%</td>
        <td width="3"></td>
        <td>{{ question.body }}</td>
      </tr>
      <tr>
        <td width="60" align="right"><v-icon small v-if="checked(question)" color="primary">mdi-check-circle</v-icon></td>
        <td width="3"></td>
        <td height="24"><v-progress-linear :value="percent(question)" height="2" /></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "VoteQuestionResultComponent",
  props: ["vote", "question", "person"],
  methods: {
    checked(question) {
      if (this.vote.answers == null || this.vote.answers.length == 0) return false;
      if (this.person == null) return false;
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == question.id);
      return qAnswers.filter(answer => answer.person.id == this.person.id).length != 0
    },
    percent(question) {
      if (this.vote.answers == null || this.vote.answers.length == 0) return 0;
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == question.id);
      return (qAnswers.length / this.vote.persons * 100).toFixed(2);
    },
    click() {
      this.$emit("click");
    },
  },
};
</script>