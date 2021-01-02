<template>
  <div class="text-caption text-center">
    <span class="text--disabled">{{ message.createdAt | formatDate }}<br /></span>
    {{ message.body.text }}
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "MessageBlockComponent",
  props: ["message"],
  filters: {
    formatDate(value) {
      if (value == null) return "";
      return moment(value).fromNow();
    },
  },
}
</script>