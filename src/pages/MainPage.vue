<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="post of posts" :key="post.id" cols="12">
        <v-card elevation="0">
          <v-card-title v-if="post.title != null">{{ post.title }}</v-card-title>
          <v-card-subtitle>{{ post.createdAt | formatDate }}</v-card-subtitle>
          <v-card-text>{{ post.body }}</v-card-text>
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
  name: "MainPage",
  computed: {
    ...mapState(["posts"]),
  },
  created() {
    this.setTitle("Главная");
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