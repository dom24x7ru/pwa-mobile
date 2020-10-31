<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <MenuLayer />
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import MenuLayer from "@/pages/layers/MenuLayer";

export default {
  name: "HeaderLayer",
  computed: {
    title() {
      return this.appName + " - " + this.pageName;
    },
    ...mapState(["appName", "pageName"]),
  },
  components: {
    MenuLayer,
  },
};
</script>