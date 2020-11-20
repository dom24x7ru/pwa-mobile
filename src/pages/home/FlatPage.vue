<template>
  <v-container fluid>
    <v-card v-if="flat != null" color="#1F7087" dark>
      <v-card-title>Квартира №{{ flat.number }}</v-card-title>
      <v-card-subtitle>
        Жильцов: {{ flat.residents.length }}<br />
        <span v-if="flat.rooms != null">Комнат: {{ flat.rooms }}<br /></span>
        <span v-if="flat.square != null">Размер: {{ flat.square }} кв.м.</span>
      </v-card-subtitle>
    </v-card>
    <v-row v-if="flat != null && flat.residents.length != 0" dense>
      <v-col v-for="resident of flat.residents" :key="resident.id" cols="12">
        <v-card>
          <v-card-title>{{ resident | fio }}</v-card-title>
          <v-card-subtitle v-if="resident.mobile != null || resident.telegram != null">
            <v-icon v-if="resident.mobile != null" small>mdi-cellphone-android</v-icon> {{ resident.mobile | formatMobile }}<br />
            <v-icon v-if="resident.telegram != null" small>mdi-telegram</v-icon> <a :href="`https://t.me/${resident.telegram}`">{{ resident.telegram }}</a>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "FlatPage",
  data() {
    return {
      flat: null,
    };
  },
  computed: {
    flatNumber() {
      return this.$route.params.flatNumber;
    },
    ...mapState(["ready", "client"]),
    ...mapGetters(["getFlat"]),
  },
  async created() {
    this.setTitle(`кв. ${this.flatNumber}`);
    if (this.ready.flats) this.flat = this.getFlat(this.flatNumber);
    const residents = await this.client.wrapEmit("flat.info", { flatNumber: this.flatNumber });
    if (residents != null) this.flat.residents = residents;
  },
  methods: {
    ...mapMutations(["setTitle"]),
  },
  filters: {
    fio(profile) {
      const empty = value => value == null || value.trim().length == 0;
      if (profile == null) return "";
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      const result = `${surname} ${name} ${midname}`;
      return empty(result) ? "Сосед не желает показывать имя" : result;
    },
    formatMobile(value) {
      if (value == null) return "";
      return `+${value}`;
    },
  },
  watch: {
    "ready.flats"() {
      this.flat = this.getFlat(this.flatNumber);
    },
  },
};
</script>