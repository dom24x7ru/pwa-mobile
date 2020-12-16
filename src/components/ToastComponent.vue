<template>
  <v-snackbar v-model="visible" :color="color" :timeout="dataTimeout" @input="close">
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
    timeout: Number,
  },
  data() {
    return {
      visible: false,
      dataTimeout: 5000,
    };
  },
  created() {
    this.visible = this.show;
    if (this.timeout != null) this.dataTimeout = this.timeout;
  },
  methods: {
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
}
</script>