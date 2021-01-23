import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import SocketClient from "./api/SocketClient";

import moment from "moment";

moment.locale("ru");

const PRODUCTION_MODE = true;
Vue.config.productionTip = PRODUCTION_MODE

const client = new SocketClient({
  port: 443,
  hostname: "dom24x7-backend.nl.yapahost.ru",
  secure: true,
});
// const client = new SocketClient({ port: 8000 });
client.on("login", async (data) => {
  console.log("emit login");
  store.commit("setUser", data.user);
  
  const version = await client.wrapEmit("version.current");
  if (version.status == "ERROR") {
    if (version.message == "BANNED" || version.message == "DELETED") {
      await client.wrapEmit("user.logout");
      store.commit("setUser", null);
      if (router.currentRoute.name != "auth") {
        router.push("/signin");
        return;
      }
    }
  }
  store.commit("setAppCurrentVertion", version);
  
  if (router.currentRoute.name == "auth") router.push("/");
});
client.on("logout", () => {
  console.log("emit logout");
  store.commit("setUser", null);
  if (router.currentRoute.name != "auth") router.push("/signin");
});
client.on("user", user => {
  store.commit("setUser", user.data);
  if ((store.state.user.person == null || store.state.user.resident == null) && router.currentRoute.name != "settings") {
    router.push("/settings");
  }
});
client.on("all", allData => {
  const data = allData.data;
  if (data.posts.length != 0) {
    store.commit("setPosts", allData.data.posts);
    client.initChannel("posts");
  }
  if (data.flats.length != 0) {
    store.commit("setFlats", allData.data.flats);
    client.initChannel("flats");
  }
  if (data.invites.length != 0) {
    store.commit("setInvites", allData.data.invites);
    client.initChannel(`invites.${store.state.user.id}`);
  }
});
client.on("flats", flat => {
  store.commit("setFlat", flat.data);
});
client.on("posts", post => {
  store.commit("setPost", post.data);
});
client.on("invites", invite => {
  store.commit("setInvite", invite.data);
});
client.on("instructions", instruction => {
  store.commit("setInstruction", instruction.data);
});
client.on("documents", document => {
  store.commit("setDocument", document.data);
});
client.on("faq", answer => {
  store.commit("setFAQ", answer.data);
});
client.on("votes", vote => {
  store.commit("setVote", vote.data);
});
client.on("vote", vote => {
  store.commit("setVote", vote.data);
});
client.on("imChannels", channel => {
  store.commit("setIMChannel", channel.data);
});
client.on("imChannel", channel => {
  store.commit("setIMChannel", channel.data);
});
client.on("channel.ready", data => {
  const info = { channel: data.name.split(".")[0], status: true };
  store.commit("setChannelsReady", info);
  if (info.channel == "imChannels") {
    // подписываемся на конкретные каналы групп, чтобы получать обновленную информацию по ним
    for (let imChannel of store.state.imChannels) {
      client.initChannel(`imChannel.${imChannel.id}`);
    }
  } else if (info.channel == "votes") {
    // подписываемся на конкретные каналы голосования, чтобы получать обновленную информацию по ним
    for (let vote of store.state.votes) {
      client.initChannel(`vote.${vote.id}`);
    }
  }
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
