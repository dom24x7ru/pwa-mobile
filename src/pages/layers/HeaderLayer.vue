<template>
  <v-app-bar app color="primary" dark>
    <v-btn v-if="showNavBack" icon @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <MenuLayer />
    <template v-if="showFabBtnMenu" v-slot:extension>
      <FabBtnMenuLayer @chat="chat" @vote="vote" />
    </template>
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" color="warning" @close="toastClose" />
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
import MenuLayer from "@/pages/layers/MenuLayer";
import FabBtnMenuLayer from "@/pages/layers/FabBtnMenuLayer";
import Toast from "@/components/ToastComponent";

export default {
  name: "HeaderLayer",
  data() {
    return {
      toast: {
        show: false,
        text: "Метод в разработке",
      },
    };
  },
  computed: {
    title() {
      return this.appName + " - " + this.pageName;
    },
    showNavBack() {
      switch (this.$route.name) {
        case "main":
        case "sections":
        case "im":
        case "services":
        case "about":
        case "profile":
        case "settings":
        case "invite":
          return false;
        default:
          return true;
      }
    },
    showFabBtnMenu() {
      switch (this.$route.name) {
        case "main":
        case "im":
        case "services":
        case "about":
        case "profile":
        case "settings":
        case "invite":
        case "documents":
        case "instructions":
        case "instruction":
        case "votes":
        case "contacts":
          return false;
        default:
          return true;
      }
    },
    ...mapState(["appName", "pageName"]),
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    chat() {
      console.log("chat");
      this.toast.show = true;
    },
    vote() {
      console.log("vote");
      this.toast.show = true;
    },
    toastClose() {
      this.toast.show = false;
    },
  },
  components: {
    MenuLayer, FabBtnMenuLayer, Toast,
  },
};
</script>