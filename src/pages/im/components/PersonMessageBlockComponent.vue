<template>
  <div class="text-body-2 text-left" @click="showMenu">
    <span v-if="!light" class="font-weight-bold blue--text"><br />{{ message.person | showName }}<br /></span>
    {{ message.body.text }}
    <span class="text--disabled text-caption">{{ message.createdAt | formatDate }}</span>
    <v-menu v-model="menu.show" :position-x="menu.x" :position-y="menu.y" absolute offset-y>
      <v-list>
        <v-list-item v-for="(item, index) in menu.items" :key="index" >
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
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
  data() {
    return {
      menu: {
        show: false,
        x: 0,
        y: 0,
        items: [
          { title: "Menu item", },
        ],
      },
    };
  },
  methods: {
    showMenu(e) {
      console.log("Отображения меню с действиями");
      e.preventDefault();
      this.menu.show = false;
      this.menu.x = e.clientX
      this.menu.y = e.clientY
      this.$nextTick(() => { this.menu.show = true; });
    },
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