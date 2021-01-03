<template>
  <div>
    <PersonMessage v-if="message.person != null" :message="message" :light="light()" />
    <ServiceMessage v-else :message="message" />
  </div>
</template>

<script>
import PersonMessage from "./PersonMessageBlockComponent";
import ServiceMessage from "./SeviceMessageBlockComponent";

export default {
  name: "MessageBlockComponent",
  props: {
    message: Object,
    prevMessage: Object,
  },
  methods: {
    light() {
      return this.prevMessage != null && this.prevMessage.person != null && this.message.person.id == this.prevMessage.person.id;
    }
  },
  components: {
    PersonMessage, ServiceMessage,
  },
}
</script>