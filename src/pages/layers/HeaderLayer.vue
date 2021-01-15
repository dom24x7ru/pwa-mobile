<template>
  <v-app-bar app color="primary" dark>
    <v-btn v-if="showNavBack" icon @click="goBack">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon v-if="$route.name == 'imMessages'" @click="mute">
      <v-icon v-if="imChannelMute">mdi-volume-variant-off</v-icon>
      <v-icon v-else>mdi-volume-low</v-icon>
    </v-btn>
    <MenuLayer />
    <template v-if="showFabBtnMenu" v-slot:extension>
      <FabBtnMenuLayer @chat="chat" @vote="vote" />
    </template>
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" color="warning" @close="toastClose" />
  </v-app-bar>
</template>

<script>
import { mapState, mapMutations } from "vuex";
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
      return this.pageName;
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
          return false;
      }
    },
    ...mapState(["appName", "pageName", "imChannelMute", "client"]),
  },
  methods: {
    goBack() {
      if (window.history.length == 0 && this.$route.name == "imMessages") {
        this.$router.push("im");
      } else {
        this.$router.go(-1);
      }
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
    async mute() {
      if (this.$route.name != "imMessages") return;
      const channelId = this.$route.params.channelId;
      const result = await this.client.wrapEmit("im.setMute", { channelId, mute: !this.imChannelMute });
      if (result.mute != null) this.setIMChannelMute(result.mute);
    },
    ...mapMutations(["setIMChannelMute"]),
  },
  components: {
    MenuLayer, FabBtnMenuLayer, Toast,
  },
};
</script>