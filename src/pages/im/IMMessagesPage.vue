<template>
  <v-container fluid>
    <v-row v-if="more" class="text-center">
      <v-col cols="12">
        <v-progress-circular indeterminate color="primary" v-intersect="onIntersect" />
      </v-col>
    </v-row>
    <Message v-for="(message, index) in messages" :key="message.id" :message="message" :prevMessage="getPrevMessage(index)" />
    <span id="footer"></span>
    <br /><br /><br /><br />
    <v-footer color="primary" :dark="true" :fixed="true">
      <v-row>
        <v-col cols="12">
          <v-text-field v-model="message" label="Сообщение..." append-outer-icon="mdi-send" @keydown.enter="send" @click:append-outer="send" />
        </v-col>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Message from "./components/MessageBlockComponent";

export default {
  name: "IMMessagesPage",
  data() {
    return {
      channelId: null,
      channel: null,
      messages: [],
      message: null,
      more: false,
    };
  },
  computed: {
    channelName() {
      if (this.user == null) return null;
      return `imMessages.${this.channelId}.${this.user.id}`;
    },
    ...mapState(["client", "user", "ready"]),
    ...mapGetters(["getIMChannel"]),
  },
  created() {
    this.setTitle("...");
    this.channelId = this.$route.params.channelId;
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
        this.$vuetify.goTo("#footer");
        setTimeout(async () => {
          this.more = (this.messages.length < this.channel.count);
          while (this.more) {
            await this.loadMoreMessages();
          }
        }, 2000);
      }
    },
    async loadMoreMessages() {
      const messages = await this.client.wrapEmit("im.load", { channelId: this.channelId, limit: 20, offset: this.messages.length });
      for (let i = messages.length - 1; i >= 0; i--) {
        for (let j = 0; j < this.messages.length; j++) {
          if (this.messages[j].id == messages[i].id) {
            this.messages.splice(j, 1, messages[i]);
            return;
          }
        }
        this.messages.unshift(messages[i]);
      }
      this.more = (this.messages.length < this.channel.count);
    },
    getPrevMessage(index) {
      if (index == 0) return null;
      else return this.messages[index - 1];
    },
    async send() {
      if (this.message == null || this.message.trim().length == 0) return;
      const result = await this.client.wrapEmit("im.save", { channelId: this.channelId, body: { text: this.message.trim() } });
      if (result.status == "OK") this.message = null;
    },
    async onIntersect (entries) {
      if (entries[0].intersectionRatio > 0) {
        console.log("Необходимо загрузить еще пачку сообщений");
        if (this.more) await this.loadMoreMessages();
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