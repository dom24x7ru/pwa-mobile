<template>
  <v-container fluid>
    <v-text-field v-model="surname" label="Фамилия" required />
    <v-text-field v-model="name" label="Имя" required />
    <v-text-field v-model="midname" label="Отчество" required />
    <v-text-field
      v-model="flat.number"
      label="Выберите свою квартиру"
      :hint="flat.hint"
      :error-messages="flat.errors" 
      persistent-hint
      required
      :disabled="!channels.ready" />
    <br /><br />
    <v-btn x-large color="success" dark @click="save">Сохранить</v-btn>
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";

export default {
  name: "SettingsPage",
  data() {
    return {
      surname: null,
      name: null,
      midname: null,
      flat: {
        id: null,
        number: null,
        hint: null,
        errors: [],
      },
      toast: {
        show: false,
        text: null,
        color: null
      },
    };
  },
  computed: {
    ...mapState(["client", "user", "flats", "channels"]),
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
      if (this.channels.ready) {
        if (this.user.resident != null) {
          const flat = this.user.resident.flat;
          this.flat = { id: flat.id, number: flat.number, hint: this.getHint(flat) };
        }
      }
    },
    async save() {
      console.log("Сохранение профиля");
      if (this.flat.id == null) {
        console.error("Необходимо указать номер кватиры");
        return;
      }
      const params = {
        surname: this.surname,
        name: this.name,
        midname: this.midname,
        flat: this.flat.id,
      };
      const result = await this.client.wrapEmit("user.saveProfile", params);
      console.log(result);
      if (result.status == "OK") {
        this.toast.text = "Успешно сохранили";
        this.toast.color = "success";
        this.toast.show = true;
        console.log(this.toast.text);
        
        this.setPerson(result.person);
        this.setResident(result.resident);
      } else {
        this.toast.text = "Сохранить не удалось. Попробуйте позже";
        this.toast.color = "error";
        this.toast.show = true;
        console.error(this.toast.text);
      }
    },
    getFlat(number) {
      for (let flat of this.flats) {
        if (flat.number == number) return flat;
      }
      return null;
    },
    getHint(flat) {
      return `кв. №${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}`;
    },
    toastClose() {
      this.toast.show = false;
    },
    ...mapMutations(["setTitle", "setPerson", "setResident"]),
  },
  watch: {
    user() {
      this.init();
    },
    "channels.ready"() {
      if (this.user.resident != null) {
        const flat = this.user.resident.flat;
        this.flat = { id: flat.id, number: flat.number, hint: this.getHint(flat) };
      }
    },
    "flat.number"() {
      if (this.flat.number == null || this.flat.number.length == 0) {
        this.flat.id = null;
        this.flat.hint = null;
        this.flat.errors = ["Необходимо указать номер квартиры"];
        return;
      }
      const flat = this.getFlat(parseInt(this.flat.number));
      if (flat != null) {
        this.flat.id = flat.id;
        this.flat.hint = this.getHint(flat);
        this.flat.errors = [];
      } else {
        this.flat.id == null;
        this.flat.hint = null;
        this.flat.errors = ["Указанный номер квартиры не найден в доме"];
      }
    },
  },
  components: {
    Toast,
  },
};
</script>