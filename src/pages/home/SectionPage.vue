<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in getFloors(sectionId)" :key="item.floor" cols="12">
        <v-card>
          <v-card-title>Этаж {{ item.floor }}</v-card-title>
          <v-card-subtitle>
            Квартиры: {{ item.min }} - {{ item.max }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon :to="{ name: 'floor', params: { sectionId, floorId: item.floor } }">
              <v-icon>mdi-account-supervisor-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SectionsPage",
  computed: {
    sectionId() {
      return this.$route.params.sectionId;
    },
    ...mapGetters(["getFloors"]),
  },
  created() {
    this.setTitle(`Подъезд ${this.sectionId}`);
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>