<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="recommendation of getRecommendationList(categoryId)" :key="recommendation.id" cols="12">
        <v-card>
          <v-img height="250" :src="recommendation.category.img" />
          <v-card-title>{{ recommendation.title }}</v-card-title>
          <v-card-text>
            <div v-html="html(recommendation.body)" />
          </v-card-text>
          <v-divider class="mx-4" />
          <v-card-text>
            <span v-if="notEmpty(recommendation.extra.address)">
              <v-icon small>mdi-map-marker</v-icon> {{ recommendation.extra.address }}<br />
            </span>
            <span v-if="notEmpty(recommendation.extra.phone)">
              <v-icon small>mdi-cellphone-android</v-icon> {{ recommendation.extra.phone | formatMobile }}<br />
            </span>
            <span v-if="notEmpty(recommendation.extra.site)">
              <v-icon small>mdi-earth</v-icon> {{ recommendation.extra.site }}<br />
            </span>
            <span v-if="notEmpty(recommendation.extra.email)">
              <v-icon small>mdi-email</v-icon> {{ recommendation.extra.email }}<br />
            </span>
            <span v-if="notEmpty(recommendation.extra.instagram)">
              <v-icon small>mdi-instagram</v-icon> {{ recommendation.extra.instagram }}<br />
            </span>
            <span v-if="notEmpty(recommendation.extra.telegram)">
              <v-icon small>mdi-telegram</v-icon> {{ recommendation.extra.telegram }}
            </span>
          </v-card-text>
          <v-divider class="mx-4" />
          <v-card-actions v-if="owner">
              <v-spacer></v-spacer>
              <v-btn v-if="owner" icon :to="{ name: 'recommendationCreate', params: { recommendationId: recommendation.id } }">
                <v-icon>mdi-pencil-outline</v-icon>
              </v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";

export default {
  name: "RecommendationListPage",
  computed: {
    categoryId() {
      return this.$route.params.categoryId;
    },
    ...mapState(["user"]),
    ...mapGetters(["getRecommendationList"]),
  },
  created() {
    this.setTitle("Рекомендации");
  },
  methods: {
    owner(recommendation) {
      if (this.user == null || this.user.person == null) return false;
      if (this.user.person.id == recommendation.person.id) return true;
      return false;
    },
    html(value) {
      if (value == null) return "";
      return value.replaceAll("\n", "<br />");
    },
    notEmpty(value) {
      return value != null && value.trim().length != 0;
    },
    ...mapMutations(["setTitle"]),
  },
  filters: {
    formatMobile(value) {
      if (value == null) return "";
      return `+${value}`;
    },
  },
};
</script>