<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="flat in getFlats({ section: sectionId, floor: floorId })" :key="flat.number" cols="12">
        <v-card>
          <v-card-title>Квартира №{{ flat.number }}</v-card-title>
          <v-card-subtitle>
            <span v-if="flat.rooms != null">Комнат: {{ flat.rooms }}<br /></span>
            <span v-if="flat.square != null">Размер: {{ flat.square }} кв.м.</span>
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon>
              <v-icon>mdi-chat-outline</v-icon>
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
  name: "FloorPage",
  computed: {
    sectionId() {
      return this.$route.params.sectionId;
    },
    floorId() {
      return this.$route.params.floorId;
    },
    ...mapGetters(["getFlats"]),
  },
  created() {
    this.setTitle(`Подъезд ${this.sectionId} этаж ${this.floorId}`);
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
}
</script>