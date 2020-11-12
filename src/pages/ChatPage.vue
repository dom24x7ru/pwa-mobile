<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="12">
        <v-card color="red" dark>
          <v-card-title>В разработке</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "ChatPage",
  created() {
    this.setTitle("Чаты");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>