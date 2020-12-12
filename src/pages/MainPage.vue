<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-if="vote != null" cols="12">
        <v-card dark color="#952175" :to="{ name: 'vote', params: { voteId: vote.id } }">
          <v-card-subtitle>
            <span class="font-weight-medium text-uppercase">{{ vote.title }}</span>
          </v-card-subtitle>
          <v-card-text>
            Проголосовало {{ vote.answers.length }} из {{ vote.persons }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-for="post of posts" :key="post.id" cols="12">
        <v-card elevation="0">
          <v-card-subtitle>
            <v-icon left :color="postTypeIcon(post).color">{{ postTypeIcon(post).icon }}</v-icon>
            <span class="font-weight-medium text-uppercase">{{ post.title }}</span><br />
            <span class="text--disabled">{{ post.createdAt | formatDate }}</span>
          </v-card-subtitle>
          <v-card-text v-if="post.url != null"><router-link :to="post.url">{{ post.body }}</router-link></v-card-text>
          <v-card-text v-else>{{ post.body }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "MainPage",
  data() {
    return {
      vote: null
    };
  },
  computed: {
    ...mapState(["posts", "ready", "changed"]),
    ...mapGetters(["getRndVote"]),
  },
  created() {
    this.setTitle("Новости");
    if (this.ready.votes) this.vote = this.getRndVote();
  },
  methods: {
    postTypeIcon(post) {
      if (post.type == "person") return { icon: "mdi-account", color: "green darken-2" };
      if (post.type == "instruction") return { icon: "mdi-clipboard-check", color: "blue darken-2" };
      if (post.type == "document") return { icon: "mdi-file", color: "purple darken-2" };
      return { icon: "mdi-twitter", color: "orange darken-2" };
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
      this.vote = this.getRndVote();
    },
    "changed.votes"() {
      this.vote = this.getVote(this.vote.id);
    },
  },
};
</script>