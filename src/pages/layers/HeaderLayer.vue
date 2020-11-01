<template>
  <v-app-bar app color="primary" dark>
    <v-btn v-if="showNavBack" icon @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <MenuLayer />
    <template v-if="showFabBtnMenu" v-slot:extension>
      <FabBtnMenuComponent />
    </template>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import MenuLayer from "@/pages/layers/MenuLayer";
import FabBtnMenuComponent from "@/components/FabBtnMenuComponent";

export default {
  name: "HeaderLayer",
  computed: {
    title() {
      return this.appName + " - " + this.pageName;
    },
    showNavBack() {
      switch (this.$route.name) {
        case "main":
        case "sections":
        case "im":
        case "services":
        case "about":
        case "profile":
        case "settings":
          return false;
        default:
          return true;
      }
    },
    showFabBtnMenu() {
      switch (this.$route.name) {
        case "main":
        case "im":
        case "services":
        case "about":
        case "profile":
        case "settings":
          return false;
        default:
          return true;
      }
    },
    ...mapState(["appName", "pageName"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
  },
  components: {
    MenuLayer, FabBtnMenuComponent,
  },
};
</script>