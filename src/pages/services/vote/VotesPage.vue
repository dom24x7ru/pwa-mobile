<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="primary" to="/votes/create">Новое голосование</v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="vote of votes" :key="vote.id" cols="12">
        <v-card :to="{ name: 'vote', params: { voteId: vote.id } }">
          <v-card-subtitle>
            <span class="font-weight-medium text-uppercase">{{ vote.title }}</span><br />
            <span class="text--disabled">{{ vote.createdAt | formatDate }}</span>
            <span v-if="answered(vote)" class="blue--text"><br />Вы уже проголосовали</span>
            <span v-if="vote.closed" class="text--disabled"><br />Голосование завершено</span>
          </v-card-subtitle>
          <v-card-text>
            Проголосовало {{ vote.answers.length }} из {{ vote.persons }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "VotesPage",
  computed: {
    ...mapState(["votes", "user"]),
  },
  created() {
    this.setTitle("Голосование");
  },
  methods: {
    answered(vote) {
      const answers = vote.answers;
      if (answers == null) return false;

      const person = this.user.person;
      if (person == null) return null;

      return answers.filter(answer => answer.person.id == person.id).length != 0;
    },
    ...mapMutations(["setTitle"]),
  },
  filters: {
    formatDate(value) {
      if (value == null) return "";
      return moment(value).format("DD.MM.YYYY HH:mm:ss");
    },
  },
};
</script>