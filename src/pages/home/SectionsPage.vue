<template>
  <v-container fluid>
    <HomeStat :stat="stat" />
    <v-row dense>
      <v-col v-for="item in getSections()" :key="item.section" cols="12">
        <v-card :to="{ name: 'section', params: { sectionId: item.section } }">
          <v-card-title>Подъезд {{ item.section }}</v-card-title>
          <v-card-subtitle>
            Этажей: {{ item.floors }}<br />
            Квартиры: {{ item.min }} - {{ item.max }}<br />
            Заселено: <span v-if="stat != null">{{ stat.sections[item.section].busy }} ({{ (stat.sections[item.section].busy / stat.sections[item.section].flats * 100).toFixed(2) }}%)</span><br />
            Жильцов: <span v-if="stat != null">{{ stat.sections[item.section].persons }}</span>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" color="warning" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";
import HomeStat from "./components/HomeStatComponent";

export default {
  name: "SectionsPage",
  data() {
    return {
      stat: null,
      toast: {
        show: false,
        text: "Метод в разработке",
      }
    };
  },
  computed: {
    ...mapState(["ready"]),
    ...mapGetters(["getSections", "getFlatsStat"]),
  },
  created() {
    this.setTitle("Подъезды");
    if (this.ready.flats) this.stat = this.getFlatsStat();
  },
  methods: {
    chat() {
      console.log("chat");
      this.toast.show = true;
    },
    vote() {
      console.log("vote");
      this.toast.show = true;
    },
    toastClose() {
      this.toast.show = false;
    },
    ...mapMutations(["setTitle"]),
  },
  watch: {
    "ready.flats"() {
      this.stat = this.getFlatsStat();
    },
  },
  components: {
    Toast, HomeStat,
  },
};
</script>