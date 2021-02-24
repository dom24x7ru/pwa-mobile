<template>
  <v-container fluid>
    <v-select v-model="recommendation.categoryId" :items="categories" item-text="name" item-value="id" label="Категория" />
    <v-text-field v-model="recommendation.title" label="Заголовок" />
    <v-textarea v-model="recommendation.body" label="Описание рекомендации" />
    <br />
    <v-text-field v-model="recommendation.extra.phone" label="Телефон" prepend-icon="mdi-cellphone-android" prefix="+7" />
    <v-text-field v-model="recommendation.extra.site" label="Сайт" prepend-icon="mdi-earth" prefix="https://" />
    <v-text-field v-model="recommendation.extra.email" label="Эл. почта" prepend-icon="mdi-email-outline" />
    <v-text-field v-model="recommendation.extra.address" label="Адрес" prepend-icon="mdi-map-marker-outline" />
    <v-text-field v-model="recommendation.extra.instagram" label="Инстаграм" prepend-icon="mdi-instagram" prefix="@" />
    <v-text-field v-model="recommendation.extra.telegram" label="Телеграм" prepend-icon="mdi-telegram" prefix="@" />
    <router-link to="/upload">загрузить картирки</router-link>
    <br /><br />
    <v-btn x-large color="success" dark @click="save">Сохранить</v-btn>
    <br /><br /><br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toast.show = !toast.show" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";

export default {
  name: "RecommendationCreatePage",
  data() {
    return {
      recommendation: {
        id: null,
        title: null,
        body: null,
        categoryId: null,
        extra: {
          phone: null,
          site: null,
          email: null,
          address: null,
          instagram: null,
          telegram: null,
        },
        files: []
      },
      categories: [],
      toast: {
        show: false,
        text: null,
        color: null
      },
    };
  },
  computed: {
    recommendationId() {
      return this.$route.params.recommendationId;
    },
    ...mapState(["client", "files"]),
    ...mapGetters(["getRecommendation"])
  },
  async created() {
    this.categories = await this.client.wrapEmit("recommendation.categories");
    if (this.recommendationId == null) {
      this.setTitle("Создание рекомендации");
    } else {
      this.setTitle("Редактирование рекомендации");
      const recommendation = this.getRecommendation(this.recommendationId);
      if (recommendation == null) {
        this.$router.push("/recommendations");
      } else {
        this.init(recommendation);
      }
    }
  },
  methods: {
    init(recommendation) {
      if (recommendation == null) return;
      this.recommendation.id = recommendation.id;
      this.recommendation.title = recommendation.title;
      this.recommendation.body = recommendation.body;
      this.recommendation.categoryId = recommendation.category.id;
      this.recommendation.extra.phone = recommendation.extra.phone;
      this.recommendation.extra.site = recommendation.extra.site;
      this.recommendation.extra.email = recommendation.extra.email;
      this.recommendation.extra.address = recommendation.extra.address;
      this.recommendation.extra.instagram = recommendation.extra.instagram;
      this.recommendation.extra.telegram = recommendation.extra.telegram;
    },
    async save() {
      console.log("сохранение рекомендации");
      this.recommendation.files = this.files;
      console.log(this.recommendation);
      const result = await this.client.wrapEmit("recommendation.save", this.recommendation);
      console.log(result);
      if (result.status == "OK") {
        this.clearFiles();
        this.recommendation.id = result.recommendation.id;
        this.toast.text = "Успешно сохранили";
        this.toast.color = "success";
        this.toast.show = true;
        console.log(this.toast.text);
      } else {
        this.toast.text = "Сохранить не удалось. Попробуйте позже";
        this.toast.color = "error";
        this.toast.show = true;
        console.error(this.toast.text);
      }
    },
    ...mapMutations(["setTitle", "clearFiles"]),
  },
  components: {
    Toast
  },
 }
</script>