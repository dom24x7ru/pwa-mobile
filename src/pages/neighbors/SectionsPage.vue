<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="index of getSections()" :key="index">
        <v-card>
          <v-card-title>Подъезд {{ index }}</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon :to="{ name: 'section', params: { sectionId: index } }">
              <v-icon>mdi-account-supervisor-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
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