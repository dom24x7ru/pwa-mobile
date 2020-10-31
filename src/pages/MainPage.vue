<template>
  <v-container fluid></v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "MainPage",
  created() {
    this.setTitle("Главная");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>