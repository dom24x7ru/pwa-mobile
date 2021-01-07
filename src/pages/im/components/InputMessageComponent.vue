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
    channel: Object, // к какому каналу относится поле ввода
    edit: Object,    // сообщение, которое необходимо отредактировать
    answer: Object,  // сообщение, на которое отвечаем
    copy: Object,    // сообщение, текст которого нужно скопировать
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
  },
  watch: {
    copy() {
      this.message = this.copy.body.text;
    },
  },
};
</script>