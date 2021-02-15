<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="primary" to="/recommendation/create">Новая рекомендация</v-btn>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col v-for="category in getRecommendationCategories()" :key="category.id" cols="12">
        <v-card :to="{ name: 'recommendationCategory', params: { categoryId: category.id } }">
          <v-img :src="category.img" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
            <v-card-title>{{ category.name }}</v-card-title>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "RecommendationCategoryPage",
  computed: {
    ...mapGetters(["getRecommendationCategories"]),
  },
  created() {
    this.setTitle("Рекомендации");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>