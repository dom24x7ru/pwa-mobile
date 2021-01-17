<template>
  <v-container fluid>
    <v-list>
      <v-list-item v-for="channel of imChannels" :key="channel.id" :to="{ name: 'imMessages', params: { channelId: channel.id } }">
        <v-list-item-content>
          <v-list-item-title>{{ showTitle(channel) }}</v-list-item-title>
          <v-list-item-subtitle v-if="channel.lastMessage">
            <span v-if="channel.lastMessage.person != null" class="blue--text">{{ showName(channel.lastMessage.person) }}:</span>
            {{ channel.lastMessage.body.text }}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-list-item-action-text v-if="channel.lastMessage" class="text--disabled">{{ channel.lastMessage.createdAt | dtFormat }}</v-list-item-action-text>
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
    ...mapState(["user", "imChannels"]),
  },
  created() {
    this.setTitle("Чаты");
  },
  methods: {
    showName(profile) {
      const empty = value => value == null || value.trim().length == 0;

      if (profile == null) return "";
      const flat = profile.flat;
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      const result = `${surname} ${name} ${midname}`;
      return empty(result) ? `Сосед(ка) из кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}` : result;
    },
    showTitle(channel) {
      if (channel == null) return "";
      if (channel.title != null && channel.title.trim().length != 0) return channel.title;
      if (channel.private) {
        for (let person of channel.persons) {
          if (person.id != this.user.person.id) {
            return this.showName(person);
          }
        }
        return "Приватный чат";
      }
      return "Чат без названия";
    },
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