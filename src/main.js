import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import SocketClient from "./api/SocketClient";

const PRODUCTION_MODE = false;
Vue.config.productionTip = PRODUCTION_MODE

const client = new SocketClient({
  port: 8000,
  hostname: "185.15.211.83",
});
client.on("login", data => {
  console.log("emit login");
  store.commit("setUser", data.user);
  if (router.currentRoute.name == "auth") {
    router.push("/");
  } else if (store.state.user.person == null && router.currentRoute.name != "settings") {
    router.push("/settings");
  }
});
client.on("logout", () => {
  console.log("emit logout");
  store.commit("setUser", null);
  if (router.currentRoute.name != "auth") router.push("/signin");
});
client.on("flats", flat => {
  store.commit("setFlat", flat.data);
});
client.on("posts", post => {
  store.commit("setPost", post.data);
});
client.on("instructions", instruction => {
  store.commit("setInstruction", instruction.data);
});
client.on("invites", invite => {
  store.commit("setInvite", invite.data);
});
client.on("channel.ready", data => {
  store.commit("setChannelsReady", { channel: data.name, status: true });
});
store.commit("setClient", client);

router.beforeEach((to, from, next) => {
  if (to.name == "auth") {
    next();
  } else if (store.state.user != null && store.state.user.person == null && to.name != "settings") {
    next({ name: "settings" });
  } else {
    next();
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
