<template>
  <v-snackbar v-model="visible" :color="color" timeout="5000" @input="close">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="close">Закрыть</v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "ToastComponent",
  props: {
    show: Boolean,
    color: String,
    text: String,
  },
  data() {
    return {
      visible: false,
    };
  },
  created() {
    this.visible = this.show;
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
}
</script>