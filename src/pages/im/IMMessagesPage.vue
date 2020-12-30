<template>
  <v-container fluid>
    <Message v-for="message of messages" :key="message.id" :message="message" />
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";
import Message from "./components/MessageBlockComponent";

export default {
  name: "IMMessagesPage",
  data() {
    return {
      messages: [{ id: 1, body: { text: "Тестовое сообщение" } }]
    };
  },
  created() {
    this.setTitle("Чат");
  },
  destroyed() {
    // отписаться от канала чата
    console.log("destroyed");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
  components: {
    Message,
  },
};
</script>