<template>
  <v-container fluid>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "DocumentsPage",
  created() {
    this.setTitle("Голосование");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>