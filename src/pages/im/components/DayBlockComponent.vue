<template>
  <v-row class="text-center">
    <v-col cols="12">
      <br />
      <v-chip class="text-caption" color="blue lighten-4">{{ date | formatDate }}</v-chip>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";

export default {
  name: "DayBlockComponent",
  props: {
    date: Number,
  },
  filters: {
    formatDate(value) {
      if (value == null) return "";
      const nowDay = moment(moment().format("DD.MM.YYYY"), "DD.MM.YYYY");
      const currentDay = moment(moment(value).format("DD.MM.YYYY"), "DD.MM.YYYY");
      const diff = nowDay.diff(currentDay, "days");
      if (diff == 0) return "сегодня";
      if (diff == 1) return "вчера";
      return moment(value).format("DD MMMM YYYY");
    },
  }
};
</script>