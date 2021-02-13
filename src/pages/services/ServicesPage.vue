<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/instructions">
          <v-card-title>Инструкции</v-card-title>
          <v-card-subtitle>Доступно: {{ getInstructionsCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/documents">
          <v-card-title>Документы</v-card-title>
          <v-card-subtitle>Доступно: {{ getDocumentsCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/votes">
          <v-card-title>Голосование</v-card-title>
          <v-card-subtitle>Доступно: {{ getVotesCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card color="#1F7087" dark to="/faq">
          <v-card-title>ЧаВо</v-card-title>
          <v-card-subtitle>Доступно: {{ getFAQCount() }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card color="#1F7087" dark to="/recommendations">
          <v-card-title>Рекомендации</v-card-title>
          <v-card-subtitle>Доступно: {{ getRecommendationsCount() }}</v-card-subtitle>
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
    this.setTitle("Сервисы");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>