<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="recommendation of getRecommendationList(categoryId)" :key="recommendation.id" cols="12">
        <v-card>
          <v-img :src="recommendation.category.img" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="120px">
            <v-card-title>{{ recommendation.title }}</v-card-title>
          </v-img>
          <v-card-subtitle>
            Автор: <router-link :to="{ name: 'flat', params: { flatNumber: recommendation.person.flat.number } }">{{ recommendation.person | showName }}</router-link>
          </v-card-subtitle>
          <v-card-text>
            <span v-if="notEmpty(recommendation.extra.address)">
              <v-icon small>mdi-map-marker</v-icon> {{ recommendation.extra.address }}<br />
            </span>
            <span v-if="notEmpty(recommendation.extra.phone)">
              <v-icon small>mdi-cellphone-android</v-icon>
              <a :href="'tel:+7' + recommendation.extra.phone">{{ recommendation.extra.phone | formatMobile }}</a>
              <br />
            </span>
            <span v-if="notEmpty(recommendation.extra.site)">
              <v-icon small>mdi-earth</v-icon>
              <a :href="'https://' + recommendation.extra.site">{{ recommendation.extra.site }}</a>
              <br />
            </span>
            <span v-if="notEmpty(recommendation.extra.email)">
              <v-icon small>mdi-email</v-icon>
              <a :href="'mailto:' + recommendation.extra.email">{{ recommendation.extra.email }}</a>
              <br />
            </span>
            <span v-if="notEmpty(recommendation.extra.instagram)">
              <v-icon small>mdi-instagram</v-icon>
              <a :href="'https://www.instagram.com/' + recommendation.extra.instagram + '/'">{{ recommendation.extra.instagram }}</a>
              <br />
            </span>
            <span v-if="notEmpty(recommendation.extra.telegram)">
              <v-icon small>mdi-telegram</v-icon>
              <a :href="'https://t.me/' + recommendation.extra.telegram">{{ recommendation.extra.telegram }}</a>
            </span>
          </v-card-text>
          <v-divider class="mx-4" />
          <v-card-text>
            <div v-html="html(recommendation.body)" />
            <v-carousel cycle height="200" v-if="recommendation.extra.files != null && recommendation.extra.files.length != 0">
              <v-carousel-item v-for="(img, i) in recommendation.extra.files" :key="i" :src="img" />
            </v-carousel>
          </v-card-text>
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
      return `+7${value}`;
    },
    showName(profile) {
      const empty = value => value == null || value.trim().length == 0;

      const flat = profile.flat; 
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      const result = `${surname} ${name} ${midname}`;
      return empty(result) ? `сосед(ка) из кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}` : result;
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  margin-left: 5px;
}
</style>