<template>
  <v-container fluid>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "DocumentsPage",
  created() {
    this.setTitle("Документы");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>