<template>
  <v-card>
    <v-card-subtitle><v-checkbox :label="item.title" /></v-card-subtitle>
    <v-card-actions v-if="item.body">
      <v-btn text color="teal accent-4" @click="reveal = true">Подробности</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition v-if="item.body">
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text v-html="item.body" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "InstrComponent",
  props: ["item"],
  data() {
    return {
      show: false,
    };
  },
};
</script>