<template>
  <v-container fluid>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ContactsPage",
  created() {
    this.setTitle("Контакты");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>