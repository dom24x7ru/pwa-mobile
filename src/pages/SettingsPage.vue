<template>
  <v-container fluid>
    <v-text-field v-model="surname" label="Фамилия" required />
    <v-text-field v-model="name" label="Имя" required />
    <v-text-field v-model="midname" label="Отчество" required />
    <v-combobox v-model="flat" label="Выберите свою квартиру" :items="flatsComboboxItems" :error="combobox.errors.length != 0" :error-messages="combobox.errors"></v-combobox>
    <br /><br />
    <v-btn x-large color="success" dark @click="save">Сохранить</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "SettingsPage",
  data() {
    return {
      surname: null,
      name: null,
      midname: null,
      flat: null,
      combobox: {
        errors: []
      },
    };
  },
  computed: {
    flatsComboboxItems() {
      if (this.flats == null) return [];
      return this.flats.map(flat => {
        return this.genFlatComboboxItem(flat);
      });
    },
    ...mapState(["client", "user", "flats"]),
  },
  created() {
    this.setTitle("Настройки");
    this.init();
  },
  methods: {
    init() {
      if (this.user == null) return;
      if (this.user.person != null) {
       this.surname = this.user.person.surname;
       this.name = this.user.person.name;
       this.midname = this.user.person.midname;
      }
      if (this.user.resident != null) {
        this.flat = this.genFlatComboboxItem(this.user.resident.flat);
      }
    },
    genFlatComboboxItem(flat) {
      return {
        text: `кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}`,
        value: flat.id,
      };
    },
    async save() {
      console.log("Сохранение профиля");
      if (this.flat == null) {
        this.combobox.errors.push("Необходимо выбрать квартиру проживания");
        console.error(this.combobox.errors);
        return;
      }
      const params = {
        surname: this.surname,
        name: this.name,
        midname: this.midname,
        flat: this.flat.value,
      };
      const result = await this.client.wrapEmit("user.saveProfile", params);
      if (result.status == "OK") {
        console.log("Успешно сохранили");
      } else {
        console.error("Не удалось сохранить");
      }
    },
    ...mapMutations(["setTitle"]),
  },
  watch: {
    user() {
      this.init();
    },
    flat() {
      if (this.flat != null) {
        this.combobox.errors = [];
      }
    },
  },
};
</script>