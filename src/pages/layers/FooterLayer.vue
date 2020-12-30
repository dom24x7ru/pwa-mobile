<template>
  <v-bottom-navigation :value="bottomNav" color="primary" :fixed="true">
    <v-btn value="main" to="/">
      <span>Новости</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>
    <v-btn value="house" to="/sections">
      <span>Соседи</span>
      <v-icon>mdi-account-supervisor-outline</v-icon>
    </v-btn>
    <v-btn value="im" to="/im">
      <span>Мессенджер</span>
      <v-badge content="" value="" color="primary" overlap>
        <v-icon>mdi-chat-outline</v-icon>
      </v-badge>
    </v-btn>
    <v-btn value="services" to="/services">
      <span>Сервисы</span>
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