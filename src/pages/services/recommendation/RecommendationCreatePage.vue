<template>
  <v-container fluid>
    <v-select v-model="category" :items="getRecommendationCategories()" label="Категория" />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RecommendationCreatePage",
  data() {
    return {
      category: null,
    };
  },
  computed: {
    ...mapGetters(["getRecommendationCategories"]),
  },
  created() {
    this.setTitle("Сохранение рекомендации");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
 }
</script>