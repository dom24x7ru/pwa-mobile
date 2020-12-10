<template>
  <v-container fluid>
    <v-btn v-if="permission != 'granted'" color="primary" @click="reqNotifPermission">Разрешить уведомления</v-btn>
    <div v-else>Пользователь уже дал свое согласие</div>
  </v-container>
</template>

<script>
export default {
  name: "NotifPage",
  data() {
    return {
      permission: null,
    };
  },
  created() {
    if ("Notification" in window) {
      this.permission = Notification.permission;
    }
  },
  methods: {
    reqNotifPermission() {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          this.permission = permission;
        });
      }
    },
  },
  watch: {
    permission() {
      console.log(`Текущий статус разрешения на уведомления: ${this.permission}`);
    },
  }
}
</script>