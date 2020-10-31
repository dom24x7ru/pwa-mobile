<template>
  <v-container fluid>
    <v-list>
      <v-subheader>ПОДЪЕЗД {{ sectionId }}</v-subheader>
      <v-list-group v-for="floor in getFlats({ section: sectionId })" :key="floor.number">
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title>Этаж {{ floor.number }}</v-list-item-title>
          </v-list-item-content>
        </template>
        <v-list-item v-for="flat of floor.flats" :key="flat.number">
          <v-list-item-content>
            <v-list-item-title>Квартира № {{ flat.number }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SectionsPage",
  computed: {
    sectionId() {
      return this.$route.params.sectionId;
    },
    ...mapGetters(["getFlats"]),
  },
};
</script>