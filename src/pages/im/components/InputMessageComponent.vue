<template>
  <v-footer color="primary" dark fixed>
    <v-row>
      <v-col cols="12">
        <v-list v-if="['edit', 'answer'].indexOf(action) != -1" color="primary">
          <v-list-item>
            <v-list-item-icon>
              <v-icon v-if="action == 'edit'">mdi-pencil-outline</v-icon>
              <v-icon v-if="action == 'answer'">mdi-subdirectory-arrow-left</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-subtitle>{{ msg | showText }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon @click="close"><v-icon>mdi-close</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>

        <v-text-field v-model="message" label="Сообщение..." append-outer-icon="mdi-send" @keydown.enter="send" @click:append-outer="send" />
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InputMessageComponent",
  props: {
    channel: Object,
    msg: Object,
    action: String,
  },
  data() {
    return {
      message: null,
    };
  },
  computed: {
    ...mapState(["client"]),
  },
  methods: {
    async send() {
      if (this.message == null || this.message.trim().length == 0) return;
      
      let data = { channelId: this.channel.id, body: { text: this.message.trim() } };
      if (this.action == "edit") {
        // редактируем сообщение
        data.messageId = this.msg.id;
        data.body = JSON.parse(JSON.stringify(this.msg.body)); // копируем объект
        data.body.text = this.message.trim();
        if (data.body.history == null) data.body.history = [];
        data.body.history.unshift({ createdAt: this.msg.updatedAt, text: this.msg.body.text });
      }
      if (this.action == "answer") {
        // отвечаем на другое сообщение
        data.body.aMessage = { id: this.msg.id, createdAt: this.msg.createdAt, text: this.msg.body.text };
      }
      
      const result = await this.client.wrapEmit("im.save", data);
      if (result.status == "OK") {
        this.message = null;
        this.close();
      }
    },
    close() {
      this.$emit("cancel");
    },
  },
  filters: {
    showText(value) {
      const MAX_LENGTH = 30;
      if (value == null) return "";
      if (value.body.text.length < MAX_LENGTH) return value.body.text;
      return value.body.text.substr(0, MAX_LENGTH) + "...";
    }
  },
  watch: {
    msg() {
      if (this.msg == null) this.message = null;
      else this.message = this.msg.body.text;
    },
  },
};
</script>