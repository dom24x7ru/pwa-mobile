<template>
  <v-container fluid>
    <v-row v-if="more" class="text-center">
      <v-col cols="12">
        <v-progress-circular indeterminate color="primary" v-intersect="onIntersect" />
      </v-col>
    </v-row>
    <Message v-for="(message, index) in messages" :key="message.id" :message="message" :prevMessage="getPrevMessage(index)" @click-menu-item="action" />
    <span id="footer"></span>
    <br /><br /><br /><br />
    <InputMessage :channel="channel" :action="inputMessageProps.action" :msg="inputMessageProps.message" @cancel="cancel" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Message from "./components/MessageBlockComponent";
import InputMessage from "./components/InputMessageComponent";

export default {
  name: "IMMessagesPage",
  data() {
    return {
      channelId: null,
      channel: null,
      messages: [],
      more: false,
      inputMessageProps: {
        action: null,
        message: null,
      },
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
          if (message.event == "destroy") {
            this.$nextTick(() => {
              this.messages.splice(i, 1);
              this.channel.count--;
            });
          } else {
            this.$nextTick(() => { this.messages.splice(i, 1, message.data); });
          }
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
    async onIntersect (entries) {
      if (entries[0].intersectionRatio > 0) {
        console.log("Необходимо загрузить еще пачку сообщений");
        if (this.more) await this.loadMoreMessages();
      }
    },
    action(code, message) {
      this[code](message);
    },
    copy(message) {
      this.inputMessageProps.action = "copy";
      this.inputMessageProps.message = message;
    },
    edit(message) {
      this.inputMessageProps.action = "edit";
      this.inputMessageProps.message = message;
    },
    answer(message) {
      this.inputMessageProps.action = "answer";
      this.inputMessageProps.message = message;
    },
    async delete(message) {
      await this.client.wrapEmit("im.del", { messageId: message.id });
    },
    cancel() {
      this.inputMessageProps.action = null;
      this.inputMessageProps.message = null;
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
    Message, InputMessage,
  },
};
</script>