<template>
  <div>
    <DayBlock v-if="isNextDay()" :date="message.createdAt" />
    <PersonMessage v-if="message.person != null" :message="message" :light="light() && !isNextDay()" @click-menu-item="action" />
    <ServiceMessage v-else :message="message" />
  </div>
</template>

<script>
import moment from "moment";
import PersonMessage from "./PersonMessageBlockComponent";
import ServiceMessage from "./SeviceMessageBlockComponent";
import DayBlock from "./DayBlockComponent";

export default {
  name: "MessageBlockComponent",
  props: {
    message: Object,
    prevMessage: Object,
  },
  methods: {
    isNextDay() {
      if (this.prevMessage == null) return true;
      const prevMsgDay = moment(moment(this.prevMessage.createdAt).format("DD.MM.YYYY"), "DD.MM.YYYY");
      const msgDay = moment(moment(this.message.createdAt).format("DD.MM.YYYY"), "DD.MM.YYYY");
      const diff = prevMsgDay.diff(msgDay, "days");
      return diff != 0;
    },
    light() {
      return this.prevMessage != null && this.prevMessage.person != null && this.message.person.id == this.prevMessage.person.id;
    },
    action(code, message) {
      this.$emit("click-menu-item", code, message);
    }
  },
  components: {
    PersonMessage, ServiceMessage, DayBlock,
  },
}
</script>