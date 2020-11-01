<template>
  <v-container fluid>
    <v-card class="v-card--material">
      <div class="d-flex">
        <v-avatar color="primary" size="128" class="mx-auto v-card--material__avatar">
          <span class="white--text headline">ЕТХ</span>
        </v-avatar>
      </div>
      <v-card-title>{{ fio }}</v-card-title>
      <v-card-subtitle>{{ address }}</v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ProfilePage",
  computed: {
    fio() {
      if (this.user == null) return "";
      const profile = this.user.person;
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      return `${surname} ${name} ${midname}`;
    },
    avatar() {
      // пока не поддерживаем картинки, поэтому отображаем первые буквы имени
      if (this.user == null) return "";
      const profile = this.user.person;
      let result = "";
      result += profile.name != null ? profile.name.substr(0, 1) : "";
      result += profile.surname != null ? profile.surname.substr(0, 1) : "";
      result += profile.midname != null ? profile.midname.substr(0, 1) : "";
      return result;
    },
    address() {
      if (this.user == null) return "";
      const flat = this.user.resident.flat;
      return `подъезд ${flat.section}, этаж ${flat.floor}, кв. ${flat.number}`;
    },
    ...mapState(["user"]),
  },
  created() {
    this.setTitle("Профиль");
  },
  methods: {
    ...mapMutations(["setTitle"]),
  }
};
</script>

<style scoped>
.v-card--material {
  margin-top: 64px;
}
.v-card--material__avatar {
  position: relative;
  top: -64px;
  margin-bottom: -32px;
}
</style>