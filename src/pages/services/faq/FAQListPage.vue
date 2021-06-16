<template>
  <v-container fluid>
    <v-expansion-panels accordion>
      <v-expansion-panel v-for="answer of getFAQList(categoryId)" :key="answer.id">
        <v-expansion-panel-header>{{ answer.title }}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card elevation="0">
            <v-card-text v-html="answer.body" />
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <br /><br />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "FAQListPage",
  computed: {
    categoryId() {
      return this.$route.params.categoryId;
    },
    ...mapState(["ready"]),
    ...mapGetters(["getFAQList", "getFAQCategory"]),
  },
  created() {
    this.setTitle(this.getFAQCategory(this.categoryId));
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
  watch: {
    "ready.faq"() {
      this.setTitle(this.getFAQCategory(this.categoryId));
    },
  },
};
</script>