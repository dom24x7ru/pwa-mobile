<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="category in getFAQCategories()" :key="category.id" cols="12">
        <v-card :to="{ name: 'faqCategory', params: { categoryId: category.id } }">
          <v-card-title>{{ category.name }}</v-card-title>
          <v-card-subtitle>{{ category.description }}</v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FAQCategoryPage",
  computed: {
    ...mapGetters(["getFAQCategories"]),
  },
  created() {
    this.setTitle("FAQ");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>