<template>
  <v-app>
    <HeaderLayer v-if="user != null" />
    <v-main>
      <router-view></router-view>
    </v-main>
    <FooterLayer v-if="user != null" />
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import HeaderLayer from "@/pages/layers/HeaderLayer";
import FooterLayer from "@/pages/layers/FooterLayer";

export default {
  name: "App",
  computed: {
    ...mapState(["user"]),
  },
  components: {
    HeaderLayer,
    FooterLayer,
  },
};
</script>