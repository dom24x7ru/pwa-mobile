<template>
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </template>
    <v-list>
      <v-list-item to="/about">
        <v-list-item-title>{{ $t("about.title") }}</v-list-item-title>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item to="/profile">
        <v-list-item-title>{{ $t("profile.title") }}</v-list-item-title>
      </v-list-item>
      <v-list-item to="/invite">
        <v-list-item-title>{{ $t("invite.title") }}</v-list-item-title>
      </v-list-item>
      <v-list-item to="/settings">
        <v-list-item-title>{{ $t("settings.title") }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "MenuLayer",
};
</script>