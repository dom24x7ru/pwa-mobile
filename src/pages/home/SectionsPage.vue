<template>
  <v-container fluid>
    <v-card color="#1F7087" dark>
      <v-card-title>Статистика</v-card-title>
      <v-card-subtitle v-if="stat != null">
        Квартир: {{ stat.flats }}<br />
        Заселено: {{ stat.busy }} ({{ (stat.busy / stat.flats * 100).toFixed(2) }}% от общего числа квартир)<br />
        Жильцов: {{ stat.persons }}
      </v-card-subtitle>
    </v-card>
    <v-row dense>
      <v-col v-for="item in getSections()" :key="item.section" cols="12">
        <v-card :to="{ name: 'section', params: { sectionId: item.section } }">
          <v-card-title>Подъезд {{ item.section }}</v-card-title>
          <v-card-subtitle>
            Этажей: {{ item.floors }}<br />
            Квартиры: {{ item.min }} - {{ item.max }}
          </v-card-subtitle>
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="vote">
              <v-icon>mdi-ballot-outline</v-icon>
            </v-btn>
            <v-btn icon @click="chat">
              <v-icon>mdi-chat-outline</v-icon>
            </v-btn>
          </v-card-actions> -->
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
    Toast,
  },
};
</script>