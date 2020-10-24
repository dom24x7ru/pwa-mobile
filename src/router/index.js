import Vue from "vue";
import Router from "vue-router";

import MainPage from "@/pages/MainPage";
import NeighborsPage from "@/pages/NeighborsPage";
import ChatPage from "@/pages/ChatPage";
import ServicesPage from "@/pages/ServicesPage";

import AboutPage from "@/pages/AboutPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import AuthPage from "@/pages/AuthPage";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "main", component: MainPage },
    { path: "/neighbors", name: "maneighborsin", component: NeighborsPage },
    { path: "/im", name: "im", component: ChatPage },
    { path: "/services", name: "services", component: ServicesPage },

    { path: "/about", name: "about", component: AboutPage },
    { path: "/profile", name: "profile", component: ProfilePage },
    { path: "/settings", name: "settings", component: SettingsPage },
    { path: "/signin", name: "auth", component: AuthPage },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});