import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appName: "Dom24x7",
    appCurrentVersion: null,
    pageName: null,
    user: null,
    house: null,
    flats: null,
    posts: null,
    pinnedPosts: null,
    instructions: null,
    invites: null,
    documents: null,
    faq: null,
    recommendations: null,
    votes: null,
    imChannels: null,
    imChannelMute: false,
    ready: {
      house: false,
      flats: false,
      posts: false,
      pinnedPosts: false,
      instructions: false,
      invites: false,
      documents: false,
      faq: false,
      recommendations: false,
      votes: false,
      imChannels: false,
    },
    // счетчик пришедших изменений, нужно, чтобы подхватывать обновления в онлайне
    changed: {
      votes: 0,
      imChannels: 0,
    },
  },
  getters,
  mutations,
  actions,
});