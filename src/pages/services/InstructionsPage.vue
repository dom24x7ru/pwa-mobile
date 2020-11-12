<template>
  <v-container fluid>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "InstructionsPage",
  created() {
    this.setTitle("Инструкции");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>