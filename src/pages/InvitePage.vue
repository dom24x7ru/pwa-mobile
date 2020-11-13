<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="success" @click="invite">Сгенерировать код приглашения</v-btn>
      </v-col>
    </v-row>
    <v-row v-if="code" justify="center">
      <v-col cols="10">
        <div class="pa-4 text-center text-h3">
          {{ code | codeFormat }}
        </div>
      </v-col>
    </v-row>
    <v-list dense>
      <v-subheader>ИСТОРИЯ</v-subheader>
      <v-list-item v-for="item of invites" :key="item.id">
        <v-list-item-content>
          <v-list-item-title>{{ item.code | codeFormat }}</v-list-item-title>
          <v-list-item-subtitle>{{ item.createdAt | formatDate }}</v-list-item-subtitle>
          <v-list-item-subtitle v-if="item.flat != null">{{ item.flat | formatFlat }}</v-list-item-subtitle>
          <v-list-item-subtitle v-else class="red--text">приглашением еще не воспользовались</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  name: "InvitePage",
  data() {
    return {
      code: null,
    };
  },
  computed: {
    ...mapState(["client", "invites", "ready"]),
  },
  created() {
    this.setTitle("Пригласить соседа");
  },
  methods: {
    async invite() {
      console.log("send invite");
      const result = await this.client.wrapEmit("user.invite");
      console.log(result);
      this.code = result.code;
      this.setInviteTop({ id: result.id, createdAt: new Date().getTime(), code: result.code, used: false });
    },
    ...mapMutations(["setTitle", "setInviteTop"]),
  },
  filters: {
    codeFormat(code) {
      if (code == null) return "";
      return code.substr(0, 3) + "-" + code.substr(3);
    },
    formatDate(value) {
      if (value == null) return "";
      return moment(value).format("DD.MM.YYYY HH:mm:ss");
    },
    formatFlat(flat) {
      if (flat == null) return "";
      return `кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}`;
    },
  },
};
</script>