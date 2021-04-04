<template>
  <v-container fluid>
    <v-row class="text-center">
      <v-col cols="12">
        <v-img :src="require('@/assets/logo.png')" class="my-3" contain height="128" />
      </v-col>
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">{{ $t("about.app") }}</h1>
        <p class="subheading font-weight-regular">
          {{ $t("about.version.info", { number: version.number, build: version.build }) }}
          <span v-if="appCurrentVersion != null && version.number < appCurrentVersion.number" class="red--text"><br />({{ $t("about.version.old") }})</span>
        </p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import config from "../../config";
import { mapState, mapMutations } from "vuex";

export default {
  name: "AboutPage",
  data() {
    return {
      version: config.version,
    };
  },
  computed: {
    ...mapState(["appCurrentVersion"]),
  },
  created() {
    this.setTitle(this.$t("about.title"));
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
};
</script>