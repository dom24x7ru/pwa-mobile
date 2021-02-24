<template>
  <v-bottom-sheet :value="visibleSheet" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn v-if="!onlyIcon" :color="color" class="ma-2 white--text" dark v-bind="attrs" v-on="on" @click="open">{{btnText}}</v-btn>
      <v-btn v-if="onlyIcon" icon v-bind="attrs" v-on="on" @click="open"><v-icon :color="color">{{btnIcon}}</v-icon></v-btn>
    </template>
    <v-sheet class="text-center">
      <v-btn class="mt-6" text color="error" @click="close">Закрыть</v-btn>
      <slot></slot>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script>
export default {
  name: "SheetComponent",
  props: {
    show: Boolean,
    color: String,
    btnText: String,
    btnIcon: String,
    onlyIcon: Boolean,
  },
  data() {
    return {
      visible: this.show,
    };
  },
  computed: {
    visibleSheet() {
      return this.show && this.visible;
    }
  },
  methods: {
    open() {
      this.visible = true;
      this.$emit("open");
    },
    close() {
      this.visible = false;
      this.$emit("close");
    },
  },
}
</script>