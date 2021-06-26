<template>
  <v-container fluid>
    <v-expansion-panels>
      <v-expansion-panel v-for="question of vote.questions" :key="question.id">
        <v-expansion-panel-header>{{ question.body }} - {{ qAnswersCount(question) | answerCountFormat }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list dense>
            <v-list-item v-for="answer of qAnswers(question)" :key="answer.id" :to="{ name: 'flat', params: { flatNumber: answer.person.flat.number } }">
              <v-list-item-content>
                <v-list-item-title>{{ showPersonInfo(answer) }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script>
export default {
  name: "VoteResultsComponent",
  props: ["vote"],
  methods: {
    checked(question) {
      if (this.vote.answers == null || this.vote.answers.length == 0) return false;
      if (this.person == null) return false;
      const qAnswers = this.vote.answers.filter(answer => answer.question.id == question.id);
      return qAnswers.filter(answer => answer.person.id == this.person.id).length != 0
    },
    qAnswers(question) {
      return this.vote.answers.filter(answer => answer.question.id == question.id);
    },
    qAnswersCount(question) {
      const qAnswers = this.qAnswers(question);
      return qAnswers.length;
    },
    showPersonInfo(answer) {
      const empty = value => value == null || value.trim().length == 0;

      const profile = answer.person;
      const flat = answer.person.flat;
      
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      const result = `${surname} ${name} ${midname}`;
      return empty(result) ? `Сосед из кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}` : result;
    },
  },
  filters: {
    answerCountFormat(count) {
      if (count == null) return "";
      if (count < 11 || count > 19) {
        switch (count % 10) {
          case 0:
          case 5:
          case 6:
          case 7:
          case 8:
          case 9:
            return `${count} голосов`;
          case 1:
            return `${count} голос`;
          case 2:
          case 3:
          case 4:
            return `${count} голоса`;
          default: return `${count} голосов`;
        }
      } else {
        return `${count} голосов`;
      }
    }
  }
};
</script>