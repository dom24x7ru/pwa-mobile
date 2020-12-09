<template>
  <v-container fluid>
    <v-list dense three-line>
      <v-list-item v-for="doc of documents" :key="doc.id" :href="doc.url">
        <v-list-item-content>
          <v-list-item-title>{{ doc.title }}</v-list-item-title>
          <v-list-item-subtitle v-if="doc.annotation != null">{{ doc.annotation }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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