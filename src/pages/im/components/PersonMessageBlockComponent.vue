<template>
  <div class="text-body-2 text-left" @click="showMenu">
    <span v-if="!light" class="font-weight-bold blue--text"><br />{{ message.person | showName }}<br /></span>
    {{ message.body.text }}
    <span class="text--disabled text-caption">{{ message.createdAt | formatDate }}</span>
    <v-menu v-model="menu.show" :position-x="menu.x" :position-y="menu.y" absolute offset-y>
      <v-list dense>
        <v-list-item v-for="(item, index) in menuItems()" :key="index" @click="action(item.code)">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";

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
          { code: "answer", title: "Ответить", icon: "mdi-subdirectory-arrow-left", for: "all", disabled: true },
          { code: "copy", title: "Копировать", icon: "mdi-content-copy", for: "all", disabled: true },
          { code: "fix", title: "Закрепить", icon: "mdi-pin-outline", for: "all", disabled: true },
          { code: "edit", title: "Изменить", icon: "mdi-pencil-outline", for: "mine", disabled: true },
          { code: "claim", title: "Пожаловаться", icon: "mdi-car-brake-alert", for: "other", disabled: true },
          { code: "history", title: "История", icon: "mdi-history", for: "all", disabled: true },
          { code: "shown", title: "Просмотрено", icon: "mdi-account-multiple-outline", for: "all", disabled: true },
          { code: "delete", title: "Удалить", icon: "mdi-trash-can-outline", for: "mine" },
        ],
      },
    };
  },
  computed: {
    mine() {
      if (this.message.person == null) return false;
      return (this.message.person.id == this.user.person.id);
    },
    ...mapState(["user", "client"]),
  },
  methods: {
    showMenu(e) {
      e.preventDefault();
      this.menu.show = false;
      this.menu.x = e.clientX
      this.menu.y = e.clientY
      this.$nextTick(() => { this.menu.show = true; });
    },
    menuItems() {
      return this.menu.items.filter(item => {
        if (item.disabled === true) return false;
        if (item.for == "all") return true;
        if (item.for == "mine" && this.mine) return true;
        if (item.for == "other" && !this.mine) return true;
        return false;
      });
    },
    action(code) {
      switch (code) {
        case "answer":
          break;
        case "copy":
          break;
        case "fix":
          break;
        case "edit":
          break;
        case "claim":
          break;
        case "history":
          break;
        case "shown":
          break;
        case "delete":
          this.delete();
          break;
      }
    },
    async delete() {
      await this.client.wrapEmit("im.del", { messageId: this.message.id });
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