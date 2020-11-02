<template>
  <v-speed-dial v-model="fab" top left direction="bottom">
    <template v-slot:activator>
      <v-btn v-model="fab" color="purple" dark fab>
        <v-icon v-if="fab">mdi-close</v-icon>
        <v-icon v-else>mdi-chevron-double-down</v-icon>
      </v-btn>
    </template>
    <slot></slot>
  </v-speed-dial>
</template>

<script>
export default {
  name: "FabBtnMenuComponent",
  data() {
    return {
      fab: false,
    };
  },
};
</script>