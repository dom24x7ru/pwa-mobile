<template>
  <v-container fluid>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="recommendation of getRecommendationList(categoryId)" :key="recommendation.id">
        <v-expansion-panel-header>{{ recommendation.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card elevation="0">
            <v-card-text v-html="recommendation.body" />
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br /><br />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RecommendationListPage",
  computed: {
    categoryId() {
      return this.$route.params.categoryId;
    },
    ...mapGetters(["getRecommendationList"]),
  },
  created() {
    this.setTitle("Рекомендации");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>