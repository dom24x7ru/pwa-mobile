<template>
  <v-container fluid>
    <ServiceMessage :message="message" />
  </v-container>
</template>

<script>
import ServiceMessage from "./SeviceMessageBlockComponent";

export default {
  name: "MessageBlockComponent",
  props: ["message"],
  components: {
    ServiceMessage,
  },
}
</script>