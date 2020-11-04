<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" class="text-center">
        <v-btn color="success" @click="invite">Сгенерировать код приглашения</v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-col cols="10">
        <div class="pa-4 text-center text-h3">
          {{ code | codeFormat }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "InvitePage",
  data() {
    return {
      code: null,
    };
  },
  computed: {
    ...mapState(["client"]),
  },
  created() {
    this.setTitle("Пригласить соседа");
  },
  methods: {
    async invite() {
      console.log("send invite");
      const result = await this.client.wrapEmit("user.invite");
      console.log(result);
      this.code = result.invite;
    },
    ...mapMutations(["setTitle"]),
  },
  filters: {
    codeFormat(code) {
      if (code == null) return "";
      return code.substr(0, 3) + "-" + code.substr(3);
    },
  },
};
</script>