<template>
  <v-container fluid>
    <v-card class="v-card--material">
      <div class="d-flex">
        <v-avatar
          color="primary"
          size="128"
          class="mx-auto v-card--material__avatar"
        >
          <span class="white--text headline">ЕТХ</span>
        </v-avatar>
      </div>
      <v-card-title>{{ fio }}</v-card-title>
      <v-card-subtitle>{{ address }}</v-card-subtitle>
    </v-card>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProfilePage",
  computed: {
    fio() {
      const profile = this.user.profile;
      const name = profile.name != null ? profile.name : "";
      const surname = profile.surname != null ? profile.surname : "";
      const midname = profile.midname != null ? profile.midname : "";
      return `${surname} ${name} ${midname}`;
    },
    avatar() {
      // пока не поддерживаем картинки, поэтому отображаем первые буквы имени
      const profile = this.user.profile;
      let result = "";
      result += profile.name != null ? profile.name.substr(0, 1) : "";
      result += profile.surname != null ? profile.surname.substr(0, 1) : "";
      result += profile.midname != null ? profile.midname.substr(0, 1) : "";
      return result;
    },
    address() {
      const house = this.user.house;
      return `подъезд ${house.section}, этаж ${house.floor}, кв. ${house.flat}`;
    },
    ...mapState(["user"]),
  },
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