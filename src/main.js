import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";

import data from "../data.json";

Vue.config.productionTip = false

store.state.user = data.user;
store.state.flats = data.flats;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
