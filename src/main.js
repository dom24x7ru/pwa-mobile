import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import SocketClient from "./api/SocketClient";

// import firebase from "firebase/app";

const PRODUCTION_MODE = false;
Vue.config.productionTip = PRODUCTION_MODE

// firebase.initializeApp({
//   apiKey: "AIzaSyCjmBpkkvQz0W81xMs9_1Dyw0IX3LPr5lo",
//   authDomain: "dom24x7-f28f7.firebaseapp.com",
//   databaseURL: "https://dom24x7-f28f7.firebaseio.com",
//   projectId: "dom24x7-f28f7",
//   storageBucket: "dom24x7-f28f7.appspot.com",
//   messagingSenderId: "631025425076",
//   appId: "1:631025425076:web:0125df1c64403c783ed5e1",
//   measurementId: "G-0YR7766JHF"
// });
// const messaging = firebase.messaging();
// Notification.requestPermission().then(permission => {
//   if (permission === "granted") {
//     messaging.getToken().then(token => {
//       // отправка токена на сервер
//       console.log(`push token: ${token}`);
//     });
//   } else {
//     console.log("Не удалось получить разрешение для отправки клиенту push-уведомлений");
//   }
// });

const client = new SocketClient({
  port: 443,
  hostname: "dom24x7-backend.nl.yapahost.ru",
  secure: true,
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
    client.initChannel("invites");
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
