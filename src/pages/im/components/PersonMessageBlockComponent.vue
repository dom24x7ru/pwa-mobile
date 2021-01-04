<template>
  <div class="text-body-2 text-left">
    <span v-if="!light" class="font-weight-bold blue--text"><br />{{ message.person | showName }}<br /></span>
    {{ message.body.text }}
    <span class="text--disabled text-caption">{{ message.createdAt | formatDate }}</span>
  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "PersonMessageBlockComponent",
  props: {
    message: Object,
    light: Boolean,
  },
  filters: {
    showName(profile) {
      const empty = value => value == null || value.trim().length == 0;

      const flat = profile.flat; 
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      const result = `${surname} ${name} ${midname}`;
      return empty(result) ? `Сосед(ка) из кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}` : result;
    },
    formatDate(value) {
      if (value == null) return "";
      return moment(value).format("HH:mm");
    },
  },
}
</script>