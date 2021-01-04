<template>
  <div class="text-caption text-center">
    <br />
    <span class="text--disabled">{{ message.createdAt | formatDate }}<br /></span>
    {{ message.body.text }}
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "ServiceMessageBlockComponent",
  props: ["message"],
  filters: {
    formatDate(value) {
      if (value == null) return "";
      return moment(value).format("HH:mm");
    },
  },
}
</script>