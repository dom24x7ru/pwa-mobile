<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in getSections()" :key="item.section" cols="12">
        <v-card>
          <v-card-title>Подъезд {{ item.section }}</v-card-title>
          <v-card-subtitle>
            Этажей: {{ item.floors }}<br />
            Квартиры: {{ item.min }} - {{ item.max }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon :to="{ name: 'section', params: { sectionId: item.section } }">
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
    ...mapGetters(["getSections"]),
  },
  created() {
    this.setTitle("Подъезды");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>