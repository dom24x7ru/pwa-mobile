<template>
  <v-container fluid>
    <span>Полезные контакты не найдены</span>
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