<template>
  <v-card color="#1F7087" dark>
    <v-card-title>Статистика</v-card-title>
    <v-card-subtitle v-if="stat != null">
      Квартир: {{ stat.flats }}<br />
      Заселено: {{ stat.busy }} ({{ (stat.busy / stat.flats * 100).toFixed(2) }}%)<br />
      Жильцов: {{ stat.persons }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: "HomeStatComponent",
  props: {
    stat: Object
  }
}
</script>