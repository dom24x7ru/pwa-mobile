<template>
  <v-container fluid>
    <v-text-field v-model="surname" label="Фамилия" required />
    <v-text-field v-model="name" label="Имя" required />
    <v-text-field v-model="midname" label="Отчество" required />
    <v-text-field
      v-model="flat.number"
      label="Введите номер квартиры"
      :hint="flat.hint"
      :error-messages="flat.errors" 
      persistent-hint
      required
      :disabled="flatFieldDisabled()" />
    <v-text-field prefix="@" v-model="telegram" label="Аккаунт в телеграм" />
    <span class="text-subtitle-1">Настройки приватности</span><br />
    <span class="text-subtitle-2">Отображение имени</span>
    <v-radio-group v-model="access.name">
      <v-radio label="Не показывать имя" value="nothing" />
      <v-radio label="Показывать только имя" value="name" />
      <v-radio label="Показывать полностью" value="all" />
    </v-radio-group>
    <span class="text-subtitle-2">Отображение контактов</span>
    <v-checkbox v-model="access.mobile" label="Показывать телефон" hide-details />
    <v-checkbox v-model="access.telegram" label="Показывать аккаунт телеграм (если указан)" hide-details />
    <br />
    Я хочу <a @click="logout">выйти</a> из приложения
    <br /><br />
    <v-btn x-large color="success" dark @click="save">Сохранить</v-btn>
    <br /><br /><br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toast.show = !toast.show" />
    <v-dialog v-model="dialog" persistent>
      <v-card>
        <v-card-title>Вы действительно живете в квартире №{{flat.number}}?</v-card-title>
        <v-card-text>После привязки квартиры ее можно будет изменить только через администратора. Поэтому внимательно проверьте номер квартиры, которую вы указали</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="save">Сохранить</v-btn>
          <v-btn color="green darken-1" text @click="dialog = false">Отменить</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";

export default {
  name: "SettingsPage",
  data() {
    return {
      dialog: false,
      surname: null,
      name: null,
      midname: null,
      telegram: null,
      access: {
        name: "nothing",
        mobile: false,
        telegram: false,
      },
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
    ...mapState(["client", "user", "flats", "ready"]),
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
       this.telegram = this.user.person.telegram;
       
       const access = this.user.person.access;
       this.access = {
         name: access.name.level == "nothing" ? "nothing" : access.name.format,
         mobile: access.mobile.level == "all",
         telegram: access.telegram.level == "all",
       };

      }
      if (this.ready.flats) {
        if (this.user.resident != null) {
          const flat = this.user.resident.flat;
          this.flat = { id: flat.id, number: flat.number, hint: this.getHint(flat) };
        }
      }
    },
    async logout() {
      console.log("send logout");
      await this.client.wrapEmit("user.logout");
    },
    async save() {
      if (this.flat.id == null) {
        this.toast.text = "Необходимо указать номер кватиры";
        this.toast.color = "error";
        this.toast.show = true;
        return;
      }

      if (this.user.resident == null && !this.dialog) {
        // попадаем сюда только если мы указали номер квартиры и это делаем впервые
        this.dialog = true;
        return;
      }

      console.log("Сохранение профиля");
      this.dialog = false;
      
      const params = {
        surname: this.surname,
        name: this.name,
        midname: this.midname,
        telegram: this.telegram,
        flat: this.flat.id,
        access: {
          name: {
            level: this.access.name == "nothing" ? "nothing" : "all",
            format: this.access.name == "all" ? "all" : "name",
          },
          mobile: { level: this.access.mobile ? "all" : "friends" },
          telegram: { level: this.access.telegram ? "all" : "friends" },
        },
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
    flatFieldDisabled() {
      if (!this.ready.flats) return true; // если список квартир не загружен, то блокировать кнопку
      if (this.user == null) return true; // если пользователь не загружен, то блокировать кнопку
      if (this.user.resident != null) return true; // уже есть связка с квартирой и нужно запрещать менять
      return false;
    },
    ...mapMutations(["setTitle", "setPerson", "setResident"]),
  },
  watch: {
    user() {
      this.init();
    },
    "ready.flats"() {
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
        this.flat.id = null;
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