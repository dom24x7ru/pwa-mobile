import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "Dom24x7",
    pageName: null,
    user: null,
    flats: null,
    posts: null,
    instructions: null,
    invites: null,
    documents: null,
    faq: null,
    votes: null,
    ready: {
      flats: false,
      posts: false,
      instructions: false,
      invites: false,
      documents: false,
      faq: false,
      votes: false,
    },
  },
  getters,
  mutations,
  actions,
});