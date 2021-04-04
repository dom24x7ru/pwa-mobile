<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/instructions">
          <v-card-title>{{ $t("services.instructions.title") }}</v-card-title>
          <v-card-subtitle>{{ $t("services.count") }}: {{ getInstructionsCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/documents">
          <v-card-title>{{ $t("services.documents.title") }}</v-card-title>
          <v-card-subtitle>{{ $t("services.count") }}: {{ getDocumentsCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/votes">
          <v-card-title>{{ $t("services.votes.title") }}</v-card-title>
          <v-card-subtitle>{{ $t("services.count") }}: {{ getVotesCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/faq">
          <v-card-title>{{ $t("services.faq.title") }}</v-card-title>
          <v-card-subtitle>{{ $t("services.count") }}: {{ getFAQCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card color="#1F7087" dark to="/recommendations">
          <v-card-title>{{ $t("services.recommendations.title") }}</v-card-title>
          <v-card-subtitle>{{ $t("services.count") }}: {{ getRecommendationsCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "ServicesPage",
  computed: {
    ...mapGetters(["getInstructionsCount", "getDocumentsCount", "getFAQCount", "getVotesCount", "getRecommendationsCount"]),
  },
  created() {
    this.setTitle(this.$t("services.title"));
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>