<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-if="vote != null" cols="12">
        <v-card dark color="#952175" :to="{ name: 'vote', params: { voteId: vote.id } }">
          <v-card-subtitle>
            <span class="font-weight-medium text-uppercase">{{ vote.title }}</span>
          </v-card-subtitle>
          <v-card-text>
            Проголосовало {{ vote.answers.length }} из {{ vote.persons }}
          </v-card-text>
        </v-card>
      </v-col>
      <v-col v-for="post of posts" :key="post.id" cols="12">
        <v-card elevation="0">
          <v-card-subtitle>
            <v-icon left :color="postTypeIcon(post).color">{{ postTypeIcon(post).icon }}</v-icon>
            <span class="font-weight-medium text-uppercase">{{ post.title }}</span><br />
            <span class="text--disabled">{{ post.createdAt | formatDate }}</span>
          </v-card-subtitle>
          <v-card-text v-if="post.url != null"><router-link :to="post.url">{{ post.body }}</router-link></v-card-text>
          <v-card-text v-else>{{ post.body }}</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
    <Toast v-if="toast.show"
      :show="toast.show"
      :text="toast.text"
      :color="toast.color"
      :timeout="toast.timeout"
      :btnText="toast.btnText"
      @click="reload" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";

import moment from "moment";
import firebase from "firebase/app";
import "firebase/messaging";
import config from "../../config";

export default {
  name: "MainPage",
  data() {
    return {
      version: config.version,
      vote: null,
      toast: {
        show: false,
        text: "Версия приложения устарела. Необходимо обновить.",
        btnText: "Обновить",
        color: "blue",
        timeout: 15000,
      },
    };
  },
  computed: {
    ...mapState(["posts", "ready", "changed", "client", "appCurrentVersion"]),
    ...mapGetters(["getRndVote"]),
  },
  created() {
    this.setTitle("Новости");
    if (this.ready.votes) this.vote = this.getRndVote();
    if ("Notification" in window && Notification.permission == "default") {
      Notification.requestPermission().then(permission => {
        if (permission == "denied") return;
        this.subscribe();
      });
    }
    if (this.appCurrentVersion != null) {
      if (this.version.number < this.appCurrentVersion.number) {
        // версия устарела, отображаем сообщение, что нужно обновить приложение
        this.toast.show = true;
      }
    }
  },
  methods: {
    postTypeIcon(post) {
      if (post.type == "person") return { icon: "mdi-account", color: "green darken-2" };
      if (post.type == "instruction") return { icon: "mdi-clipboard-check", color: "blue darken-2" };
      if (post.type == "document") return { icon: "mdi-file", color: "purple darken-2" };
      if (post.type == "faq") return { icon: "mdi-lightbulb", color: "yellow accent-3" };
      if (post.type == "holiday") return { icon: "mdi-party-popper", color: "orange darken-2" }
      return { icon: "mdi-twitter", color: "orange darken-2" };
    },
    subscribe() {
      firebase.initializeApp({
        apiKey: "AIzaSyCjmBpkkvQz0W81xMs9_1Dyw0IX3LPr5lo",
        authDomain: "dom24x7-f28f7.firebaseapp.com",
        databaseURL: "https://dom24x7-f28f7.firebaseio.com",
        projectId: "dom24x7-f28f7",
        storageBucket: "dom24x7-f28f7.appspot.com",
        messagingSenderId: "631025425076",
        appId: "1:631025425076:web:0125df1c64403c783ed5e1",
        measurementId: "G-0YR7766JHF"
      });

      let messaging = firebase.messaging();
      
      messaging.requestPermission()
        .then(() => {
          messaging.getToken()
            .then(currentToken => {
              console.log(currentToken);
              this.client.wrapEmit("notification.saveToken", { token: currentToken });
            })
            .catch(error => {
              console.warn(`При получении токена произошла ошибка. ${error}`);
            });
        })
        .catch(error => {
          console.warn(`Не удалось получить разрешение на показ уведомлений. ${error}`);
        });
    },
    reload() {
      this.toast.show = false;
      location.reload(true);
    },
    ...mapMutations(["setTitle"]),
  },
  filters: {
    formatDate(value) {
      if (value == null) return "";
      return moment(value).format("DD.MM.YYYY HH:mm:ss");
    },
  },
  watch: {
    "ready.votes"() {
      this.vote = this.getRndVote();
    },
    "changed.votes"() {
      if (this.vote != null) this.vote = this.getVote(this.vote.id);
    },
    "appCurrentVersion"() {
      if (this.version.number < this.appCurrentVersion.number) {
        // версия устарела, отображаем сообщение, что нужно обновить приложение
        this.toast.show = true;
      }
    }
  },
  components: {
    Toast,
  },
};
</script>