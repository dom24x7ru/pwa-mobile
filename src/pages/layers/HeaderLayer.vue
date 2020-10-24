<template>
  <v-app-bar app color="primary" dark>
    <v-toolbar-title>{{ appName }}</v-toolbar-title>
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
    ...mapState(["appName"]),
  },
  components: {
    MenuLayer,
  },
};
</script>