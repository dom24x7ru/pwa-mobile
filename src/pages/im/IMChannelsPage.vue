<template>
  <v-container fluid>
    <v-list>
      <v-list-item v-for="channel of imChannels" :key="channel.id" :to="{ name: 'imMessages', params: { channelId: channel.id } }">
        <v-list-item-content>
          <v-list-item-title>{{ channel.title }}</v-list-item-title>
          <v-list-item-subtitle v-if="channel.lastMessage">{{ channel.lastMessage.body.text }}</v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-if="channel.lastMessage">{{ channel.lastMessage.createdAt | dtFormat }}</v-list-item-action-text>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "IMChannelsPage",
  computed: {
    ...mapState(["imChannels"]),
  },
  created() {
    this.setTitle("Чаты");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
  filters: {
    dtFormat(value) {
      if (value == null) return "";
      return moment(value).fromNow();
    }
  },
};
</script>