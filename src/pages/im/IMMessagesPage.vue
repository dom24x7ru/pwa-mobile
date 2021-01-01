<template>
  <v-container fluid>
    <Message v-for="message of messages" :key="message.id" :message="message" />
    <br /><br />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Message from "./components/MessageBlockComponent";

export default {
  name: "IMMessagesPage",
  data() {
    return {
      channel: null,
      messages: [],
    };
  },
  computed: {
    channelId() {
      return this.$route.params.channelId;
    },
    channelName() {
      if (this.user == null) return null;
      return `imMessages.${this.channelId}.${this.user.id}`;
    },
    ...mapState(["client", "user", "ready"]),
    ...mapGetters(["getIMChannel"]),
  },
  created() {
    this.setTitle("...");
    if (this.ready.imChannels) this.channel = this.getIMChannel(this.channelId);
    this.client.on("channel.ready", this.loadMessagesReady);
    this.client.on("imMessages", this.loadMessages);
    if (this.channelName != null) this.client.initChannel(this.channelName);
  },
  destroyed() {
    // отписаться от канала чата
    if (this.channelName != null) this.client.closeChannel(this.channelName);
    this.client.off("imMessages", this.loadMessages);
    this.client.off("channel.ready", this.loadMessagesReady);
  },
  methods: {
    loadMessages(message) {
      for (let i = 0; i < this.messages.length; i++) {
        if (this.messages[i].id == message.data.id) {
          this.messages.splice(i, 1, message.data);
          return;
        }
      }
      this.messages.push(message.data);
    },
    loadMessagesReady({ name }) {
      if (name.indexOf("imMessages") != -1) {
        this.$vuetify.goTo(99999);
      }
    },
    ...mapMutations(["setTitle"]),
  },
  watch: {
    "ready.imChannels"() {
      this.channel = this.getIMChannel(this.channelId);
    },
    "channel"() {
      this.setTitle(this.channel.title);
    },
    "channelName"() {
      if (this.channelName != null) this.client.initChannel(this.channelName);
    },
  },
  components: {
    Message,
  },
};
</script>