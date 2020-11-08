<template>
  <v-container fluid>
    <v-list>
      <v-list-item v-for="post of posts" :key="post.id">
        <v-list-item-content>
          <v-list-item-title>{{ post.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ post.createdAt | formatDate }}</v-list-item-subtitle>
          <v-list-item-subtitle>{{ post.body }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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