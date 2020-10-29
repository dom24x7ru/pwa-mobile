<template>
  <v-container fluid>
    <v-list>
      <v-subheader>СЕКЦИИ / ПОДЪЕЗДЫ</v-subheader>
      <v-list-item v-for="index of getSections()" :key="index" :to="{ name: 'section', params: { sectionId: index } }">
        <v-list-item-content>
          <v-list-item-title>Подъезд {{ index }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SectionsPage",
  computed: {
    ...mapGetters(["getSections"]),
  },
};
</script>