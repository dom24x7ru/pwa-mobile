<template>
  <v-container fluid>
    <v-list v-if="instrId == null">
      <v-list-item v-for="instr of instructions" :key="instr.id" :to="{ name: 'instruction', params: { instrId: instr.id } }">
        <v-list-item-content>
          <v-list-item-title>{{ instr.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <v-row v-if="instrId != null && instruction != null">
      <v-col cols="12">
        <v-card>
          <v-card-title>{{ instruction.title }}</v-card-title>
          <v-card-subtitle v-if="instruction.subtitle != null">{{ instruction.subtitle }}</v-card-subtitle>
        </v-card>
      </v-col>
      <v-col v-for="item of instruction.body" :key="item.id" cols="12">
        <v-card>
          <v-card-title>{{ item.title }}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "InstructionsPage",
  data() {
    return {
      instruction: null,
    };
  },
  computed: {
    instrId() {
      return this.$route.params.instrId;
    },
    ...mapState(["instructions", "ready"]),
  },
  created() {
    this.setTitle("Инструкции");
  },
  updated() {
    if (this.ready.instructions) this.init();
  },
  methods: {
    init() {
      if (this.instrId == null) return;
      for (let instr of this.instructions) {
        if (instr.id == this.instrId) this.instruction = instr;
      }
    },
    ...mapMutations(["setTitle"]),
  },
  watch: {
    "ready.instructions"() {
      this.init();
    },
  },
};
</script>