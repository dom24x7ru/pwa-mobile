<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-list>
      <v-list-item-group>
        <v-list-item>
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Выполнено</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-list-item>
      </v-list-item-group>
    </v-list>
    <v-card-actions v-if="item.body">
      <v-btn text color="teal accent-4" @click="reveal = true">Подробности</v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="show = !show">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>
    <v-expand-transition v-if="item.body">
      <div v-show="show">
        <v-divider></v-divider>
        <v-card-text v-html="item.body" />
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  name: "InstrComponent",
  props: ["item"],
  data() {
    return {
      show: false,
    };
  },
};
</script>