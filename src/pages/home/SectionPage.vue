<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="item in getFloors(sectionId)" :key="item.floor" cols="12">
        <v-card>
          <v-card-title>Этаж {{ item.floor }}</v-card-title>
          <v-card-subtitle>
            Квартиры: {{ item.min }} - {{ item.max }}
          </v-card-subtitle>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn icon @click="vote">
              <v-icon>mdi-ballot-outline</v-icon>
            </v-btn>
            <v-btn icon @click="chat">
              <v-icon>mdi-chat-outline</v-icon>
            </v-btn>
            <v-btn icon :to="{ name: 'floor', params: { sectionId, floorId: item.floor } }">
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" color="warning" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";

export default {
  name: "SectionsPage",
  data() {
    return {
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
    ...mapGetters(["getFloors"]),
  },
  created() {
    this.setTitle(`Подъезд ${this.sectionId}`);
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
  components: {
    Toast,
  },
};
</script>