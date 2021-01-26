<template>
  <v-card color="#1F7087" dark>
    <v-card-title>Статистика</v-card-title>
    <v-card-subtitle v-if="stat != null">
      Квартир: {{ stat.flats }}<br />
      Заселено: {{ stat.busy }} ({{ (stat.busy / stat.flats * 100).toFixed(2) }}%)<br />
      Жильцов: {{ stat.persons }}<br />
      Площадь: {{ stat.squares.toFixed(2) }} кв. м. (заселено {{ (stat.busySquares / stat.squares * 100).toFixed(2) }}%)
    </v-card-subtitle>
    <v-card-actions v-if="extra">
      <v-btn text @click="reveal = true">Подробности</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition v-if="extra">
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text><slot></slot></v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "HomeStatComponent",
  props: {
    stat: Object,
    extra: Boolean
  },
  data() {
    return {
      show: false,
    };
  }
}
</script>