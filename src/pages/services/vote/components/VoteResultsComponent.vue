<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="question of vote.questions" :key="question.id" cols="12">
        <span class="font-weight-medium">{{ question.body }}</span><br />
        <span>Голосов: {{ qAnswersCount(question) }} [{{ percent(question) }}%]</span>
        <v-list dense>
          <v-list-item v-for="answer of qAnswers(question)" :key="answer.id" :to="{ name: 'flat', params: { flatNumber: answer.person.flat.number } }">
            <v-list-item-content>
              <v-list-item-title>{{ showPersonInfo(answer) }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
      </v-col>
    </v-row>
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
    percent(question) {
      if (this.vote.answers == null || this.vote.answers.length == 0) return 0;
      return (this.qAnswersCount(question) / this.vote.persons * 100).toFixed(2);
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
};
</script>