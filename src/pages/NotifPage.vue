<template>
  <v-container fluid>
    notif
  </v-container>
</template>

<script>
export default {
  name: "NotifPage",
  created() {
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        console.log(permission);
      });
    } else {
      console.warn("not notification");
    }
  },
}
</script>