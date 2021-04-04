<template>
  <v-bottom-navigation :value="bottomNav" background-color="primary" dark shift :fixed="true">
    <v-btn value="main" to="/">
      <span>{{ $t("main.title") }}</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-btn value="house" to="/sections">
      <span>{{ $t("house.title") }}</span>
      <v-icon>mdi-account-supervisor-outline</v-icon>
    </v-btn>
    <v-btn value="im" to="/im">
      <span>{{ $t("im.title") }}</span>
      <v-icon>mdi-chat-outline</v-icon>
    </v-btn>
    <v-btn value="services" to="/services">
      <span>{{ $t("services.title") }}</span>
      <v-icon>mdi-cube-outline</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "FooterLayer",
  data() {
    return {
      bottomNav: undefined,
    };
  },
};
</script>