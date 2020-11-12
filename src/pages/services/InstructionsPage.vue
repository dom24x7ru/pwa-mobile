<template>
  <v-container fluid>
    <v-card>
      <v-card-title>Приемка квартиры</v-card-title>
      <v-card-subtitle>Пошаговая инструкция по необходимым действиям при приемке квартиры и оценке качества ремонта</v-card-subtitle>
      <v-list flat>
        <v-list-item-group multiple>
          <v-list-item v-for="item of list" :key="item.id">
            <template v-slot:default="{ active }">
              <v-list-item-action>
                <v-checkbox :input-value="active"></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "InstructionsPage",
  data() {
    return {
      list: [
        { id: 1, title: "Сделать первое действие" },
        { id: 2, title: "Сделать второе действи" },
        { id: 3, title: "Сделать третье действи" },
      ],
    };
  },
  created() {
    this.setTitle("Инструкции");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>