<template>
  <v-footer color="primary" :dark="true" :fixed="true">
      <v-row>
        <v-col cols="12">
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
      const result = await this.client.wrapEmit("im.save", { channelId: this.channel.id, body: { text: this.message.trim() } });
      if (result.status == "OK") this.message = null;
    },
  }
};
</script>