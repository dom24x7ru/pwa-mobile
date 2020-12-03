<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="vote of votes" :key="vote.id" cols="12">
        <v-card :to="{ name: 'vote', params: { voteId: vote.id } }">
          <v-card-subtitle>
            <span class="font-weight-medium text-uppercase">{{ vote.title }}</span><br />
            <span class="text--disabled">{{ vote.createdAt | formatDate }}</span>
            <span v-if="vote.closed" class="text--disabled"><br />Голосование завершено</span>
          </v-card-subtitle>
          <v-card-text>
            Проголосовало {{ vote.answers.length }} из {{ vote.persons }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "DocumentsPage",
  computed: {
    ...mapState(["votes"]),
  },
  created() {
    this.setTitle("Голосование");
  },
  methods: {
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