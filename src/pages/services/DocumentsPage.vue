<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="doc of documents" :key="doc.id" cols="12">
        <v-card :href="doc.url">
          <v-card-subtitle>
            <v-icon left>mdi-file</v-icon>
            <span class="font-weight-medium text-uppercase">{{ doc.title }}</span><br />
          </v-card-subtitle>
          <v-card-text v-if="doc.annotation != null">{{ doc.annotation }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "DocumentsPage",
  computed: {
    ...mapState(["documents"]),
  },
  created() {
    this.setTitle("Документы");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>