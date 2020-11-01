<template>
  <v-container fluid></v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "AboutPage",
  created() {
    this.setTitle("О приложении");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>