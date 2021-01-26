<template>
  <v-container fluid>
    <HomeStat :stat="stat" />
    <v-row dense>
      <v-col v-for="item in getFloors(sectionId)" :key="item.floor" cols="12">
        <v-card :to="{ name: 'floor', params: { sectionId, floorId: item.floor } }">
          <v-card-title>Этаж {{ item.floor }}</v-card-title>
          <v-card-subtitle>
            Квартиры: {{ item.min }} - {{ item.max }}<br />
            Заселено: <span v-if="stat != null">{{ stat.floors[item.floor].busy }} ({{ (stat.floors[item.floor].busy / stat.floors[item.floor].flats * 100).toFixed(2) }}%)</span><br />
            Жильцов: <span v-if="stat != null">{{ stat.floors[item.floor].persons }}</span>
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
    sectionId() {
      return this.$route.params.sectionId;
    },
    ...mapState(["ready"]),
    ...mapGetters(["getFloors", "getFlatsStat"]),
  },
  created() {
    this.setTitle(`Подъезд ${this.sectionId}`);
    if (this.ready.flats) this.stat = this.getFlatsStat().sections[this.sectionId];
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
      this.stat = this.getFlatsStat().sections[this.sectionId];
    },
  },
  components: {
    Toast, HomeStat
  },
};
</script>