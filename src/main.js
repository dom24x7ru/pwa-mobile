import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import SocketClient from "./api/SocketClient";

import moment from "moment";
import i18n from './i18n'

moment.locale("ru");

const PRODUCTION_MODE = true;
Vue.config.productionTip = PRODUCTION_MODE

// production
const client = new SocketClient({
  port: 443,
  hostname: "dom24x7-backend.nl.yapahost.ru",
  secure: true,
});

// development
// const client = new SocketClient({
//   port: 443,
//   hostname: "dom24x7-backend-test.nl.yapahost.ru",
//   secure: true,
// });

// local
// const client = new SocketClient({ port: 8000 });

client.on("login", async (data) => {
  console.log("emit login");
  store.commit("setUser", data.user);
  
  const version = await client.wrapEmit("version.current");
  if (version.status == "ERROR") {
    if (version.message == "BANNED" || version.message == "DELETED") {
      await client.wrapEmit("user.logout");
      store.commit("clearAll");
      if (router.currentRoute.name != "auth") {
        router.push("/signin");
        return;
      }
    }
  }
  store.commit("setAppCurrentVertion", version);
});
client.on("logout", () => {
  console.log("emit logout");
  
  // закрываем каналы
  const user = store.state.user;
  const houseId = user.houseId;
  const channels = [
    `posts.${houseId}`,
    `pinnedPosts.${houseId}`,
    `flats.${houseId}`,
    `instructions.${houseId}`,
    `invites.${user.id}`,
    `documents.${houseId}`,
    `faq.${houseId}`,
    `recommendations.${houseId}`
  ];
  for (let channel of channels) client.closeChannel(channel);

  store.commit("clearAll");

  if (router.currentRoute.name != "auth") router.push("/signin");
});
client.on("user", user => {
  store.commit("setUser", user.data);
  const houseId = user.data.houseId;
  client.initChannel(`all.${houseId}.flats`);
  if (store.state.user.person == null || store.state.user.resident == null) {
    // пользователь новый и еще не сформирована персона и нет привязки к квартире
    if (router.currentRoute.name != "settings") router.push("/settings");
  } else {
    // пользователь уже полностью сформирован и можно подписаться на нужные каналы
    const channels = [
      `all.${houseId}.posts`, `all.${houseId}.invites`, // начальная инициализация
      `pinnedPosts.${houseId}`,
      `instructions.${houseId}`,
      `documents.${houseId}`,
      `faq.${houseId}`,
      `recommendations.${houseId}`
    ];
    for (let channel of channels) {
      client.initChannel(channel);
    }

    if (router.currentRoute.name == "auth") router.push("/");
  }
});
client.on("all", allData => {
  const data = allData.data;
  const user = store.state.user;
  const houseId = user.houseId;

  if (data.posts.length != 0) {
    store.commit("setPosts", allData.data.posts);
    client.closeChannel(`all.${houseId}.posts`);
    client.initChannel(`posts.${houseId}`);
  }
  if (data.flats.length != 0) {
    store.commit("setFlats", allData.data.flats);
    client.closeChannel(`all.${houseId}.flats`);
    client.initChannel(`flats.${houseId}`);
  }
  if (data.invites.length != 0) {
    store.commit("setInvites", allData.data.invites);
    client.closeChannel(`all.${houseId}.invites`);
    client.initChannel(`invites.${user.id}`);
  }
});
client.on("house", house => {
  store.commit("setHouse", house.data);
});
client.on("flats", flat => {
  store.commit("setFlat", flat.data);
});
client.on("posts", post => {
  store.commit("setPost", post.data);
});
client.on("pinnedPosts", post => {
  store.commit("setPinnedPost", post.data);
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
client.on("recommendations", recommendation => {
  store.commit("setRecommendation", recommendation.data);
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
    if (!store.state.imChannels) store.commit("setIMChannels", []);
    for (let imChannel of store.state.imChannels) {
      client.initChannel(`imChannel.${imChannel.id}`);
    }
  } else if (info.channel == "votes") {
    // подписываемся на конкретные каналы голосования, чтобы получать обновленную информацию по ним
    if (!store.state.votes) store.commit("setVotes", []);
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
  i18n,
  render: h => h(App)
}).$mount("#app");
