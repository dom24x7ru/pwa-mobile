<template>
  <v-snackbar v-model="visible" :color="color" :timeout="dataTimeout" @input="close">
    {{ text }}
    <template v-slot:action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="click">{{ dataBtnText }}</v-btn>
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
    btnText: String,
  },
  data() {
    return {
      visible: false,
      dataTimeout: 5000,
      dataBtnText: "Закрыть",
    };
  },
  created() {
    this.visible = this.show;
    if (this.timeout != null) this.dataTimeout = this.timeout;
    if (this.btnText != null) this.dataBtnText = this.btnText;
  },
  methods: {
    click() {
      this.close();
      this.$emit("click");
    },
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
}
</script>