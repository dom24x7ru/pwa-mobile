<template>
  <v-container fluid></v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "InvitePage",
  created() {
    this.setTitle("Пригласить соседа");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>