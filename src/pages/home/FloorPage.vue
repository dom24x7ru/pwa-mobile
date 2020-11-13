<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="flat in getFlats({ section: sectionId, floor: floorId })" :key="flat.number" cols="12">
        <v-card>
          <v-card-title class="blue-grey--text" :class="emptyFlatStyle(flat)">Квартира №{{ flat.number }}</v-card-title>
          <v-card-subtitle class="blue-grey--text" :class="emptyFlatStyle(flat)">
            <span v-if="flat.rooms != null">Комнат: {{ flat.rooms }}<br /></span>
            <span v-if="flat.square != null">Размер: {{ flat.square }} кв.м.</span>
          </v-card-subtitle>
          <!-- <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn v-if="!emptyFlat(flat)" icon @click="chat">
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
import { mapGetters, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";

export default {
  name: "FloorPage",
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
    floorId() {
      return this.$route.params.floorId;
    },
    ...mapGetters(["getFlats"]),
  },
  created() {
    this.setTitle(`Подъезд ${this.sectionId} этаж ${this.floorId}`);
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
    emptyFlat(flat) {
      return flat.residents.length == 0;
    },
    emptyFlatStyle(flat) {
      if (this.emptyFlat(flat)) return { "text--lighten-3": true };
      else return { "text--darken-4": true };
    },
    ...mapMutations(["setTitle"]),
  },
  components: {
    Toast,
  },
}
</script>