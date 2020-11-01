<template>
  <v-container fluid></v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "SettingsPage",
  created() {
    this.setTitle("Настройки");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>