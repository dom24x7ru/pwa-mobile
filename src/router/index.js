import Vue from "vue";
import Router from "vue-router";

import MainPage from "@/pages/MainPage";
import ChatPage from "@/pages/ChatPage";

import ServicesPage from "@/pages/services/ServicesPage";
import DocumentsPage from "@/pages/services/DocumentsPage";
import InstructionsPage from "@/pages/services/InstructionsPage";
import ContactsPage from "@/pages/services/ContactsPage";
import VotesPage from "@/pages/services/VotesPage";

import SectionsPage from "@/pages/home/SectionsPage";
import SectionPage from "@/pages/home/SectionPage";
import FloorPage from "@/pages/home/FloorPage";
import FlatPage from "@/pages/home/FlatPage";

import AboutPage from "@/pages/AboutPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import AuthPage from "@/pages/AuthPage";
import InvitePage from "@/pages/InvitePage";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", name: "main", component: MainPage },
    { path: "/im", name: "im", component: ChatPage },

    { path: "/services", name: "services", component: ServicesPage },
    { path: "/documents", name: "documents", component: DocumentsPage },
    { path: "/instructions", name: "instructions", component: InstructionsPage },
    { path: "/instruction/:instrId", name: "instruction", component: InstructionsPage },
    { path: "/contacts", name: "contacts", component: ContactsPage },
    { path: "/votes", name: "votes", component: VotesPage },

    { path: "/sections", name: "sections", component: SectionsPage },
    { path: "/section/:sectionId/floors", name: "section", component: SectionPage },
    { path: "/section/:sectionId/floor/:floorId", name: "floor", component: FloorPage },
    { path: "/flat/:flatNumber", name: "flat", component: FlatPage },

    { path: "/about", name: "about", component: AboutPage },
    { path: "/profile", name: "profile", component: ProfilePage },
    { path: "/invite", name: "invite", component: InvitePage },
    { path: "/settings", name: "settings", component: SettingsPage },
    { path: "/signin", name: "auth", component: AuthPage },
  ],
  scrollBehavior() {
    return { x: 0, y: 0 }
  },
});