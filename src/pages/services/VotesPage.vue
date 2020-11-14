<template>
  <v-container fluid>
    <span>На текущий момент ни одного голосования не было проведено</span>
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