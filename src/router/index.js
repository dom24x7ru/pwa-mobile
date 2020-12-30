import Vue from "vue";
import Router from "vue-router";

import MainPage from "@/pages/MainPage";

import IMChannelsPage from "@/pages/im/IMChannelsPage";
import IMMessagesPage from "@/pages/im/IMMessagesPage";

import ServicesPage from "@/pages/services/ServicesPage";
import DocumentsPage from "@/pages/services/DocumentsPage";
import InstructionsPage from "@/pages/services/InstructionsPage";
import ContactsPage from "@/pages/services/ContactsPage";

import VotesPage from "@/pages/services/vote/VotesPage";
import VotePage from "@/pages/services/vote/VotePage";
import VoteCreatePage from "@/pages/services/vote/VoteCreatePage";

import FAQCategoryPage from "@/pages/services/faq/FAQCategoryPage";
import FAQListPage from "@/pages/services/faq/FAQListPage";

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

    { path: "/im", name: "im", component: IMChannelsPage },
    { path: "/im/:channelId", name: "imMessages", component: IMMessagesPage },

    { path: "/services", name: "services", component: ServicesPage },
    { path: "/documents", name: "documents", component: DocumentsPage },
    { path: "/instructions", name: "instructions", component: InstructionsPage },
    { path: "/instruction/:instrId", name: "instruction", component: InstructionsPage },
    { path: "/contacts", name: "contacts", component: ContactsPage },
    
    { path: "/votes", name: "votes", component: VotesPage },
    { path: "/vote/:voteId", name: "vote", component: VotePage },
    { path: "/votes/create", name: "voteCreate", component: VoteCreatePage },

    { path: "/faq", name: "faq", component: FAQCategoryPage },
    { path: "/faq/:categoryId", name: "faqCategory", component: FAQListPage },

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