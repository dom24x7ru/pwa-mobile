import Vue from "vue";
import Router from "vue-router";

import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";
import ServicesPage from "@/pages/ServicesPage";

import SectionsPage from "@/pages/neighbors/SectionsPage";
import SectionPage from "@/pages/neighbors/SectionPage";
import NeighborsPage from "@/pages/neighbors/NeighborsPage";

import AboutPage from "@/pages/AboutPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import AuthPage from "@/pages/AuthPage";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "main", component: MainPage },
    { path: "/im", name: "im", component: ChatPage },
    { path: "/services", name: "services", component: ServicesPage },

    { path: "/sections", name: "sections", component: SectionsPage },
    { path: "/section/:sectionId/floors", name: "section", component: SectionPage },
    { path: "/neighbors", name: "neighbors", component: NeighborsPage },

    { path: "/about", name: "about", component: AboutPage },
    { path: "/profile", name: "profile", component: ProfilePage },
    { path: "/settings", name: "settings", component: SettingsPage },
    { path: "/signin", name: "auth", component: AuthPage },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});