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
      :disabled="!ready.flats" />
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
    <span class="text-subtitle-2">Уведомления</span>
    <v-checkbox v-model="notification.permission" label="Показывать нотификации" :disabled="notification.disabled" hide-details />
    <span class="text-caption text--disabled">К сожалению, нотификации пока не работают в IE, а также в Safari (например, на устройствах под iOS)</span>
    <br /><br />
    <v-btn x-large color="success" dark @click="save">Сохранить</v-btn>
    <br /><br /><br /><br />
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Toast from "@/components/ToastComponent";
import firebase from "firebase/app";
import "firebase/messaging";

export default {
  name: "SettingsPage",
  data() {
    return {
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
      notification: {
        permission: false,
        disabled: false,
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
    if ("Notification" in window) {
      this.notification.permission = Notification.permission == "granted";
      this.notification.disabled = Notification.permission != "default";
    }
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
    async save() {
      console.log("Сохранение профиля");
      if (this.flat.id == null) {
        console.error("Необходимо указать номер кватиры");
        return;
      }

      if (this.notification.permission) {
        try {
          firebase.initializeApp({
            apiKey: "AIzaSyCjmBpkkvQz0W81xMs9_1Dyw0IX3LPr5lo",
            authDomain: "dom24x7-f28f7.firebaseapp.com",
            databaseURL: "https://dom24x7-f28f7.firebaseio.com",
            projectId: "dom24x7-f28f7",
            storageBucket: "dom24x7-f28f7.appspot.com",
            messagingSenderId: "631025425076",
            appId: "1:631025425076:web:0125df1c64403c783ed5e1",
            measurementId: "G-0YR7766JHF"
          });

          let messaging = firebase.messaging();
          this.subscribe(messaging);
        } catch(error) {
          console.error(error.message);
        }
      }

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
    subscribe(messaging) {
      messaging.requestPermission()
        .then(() => {
          messaging.getToken()
            .then(currentToken => {
              console.log(currentToken);
              this.client.wrapEmit("notification.saveToken", { token: currentToken });
            })
            .catch(error => {
              console.warn(`При получении токена произошла ошибка. ${error}`);
            });
        })
        .catch(error => {
          console.warn(`Не удалось получить разрешение на показ уведомлений. ${error}`);
        });
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
    "notification.permission"() {
      if ("Notification" in window) {
        Notification.requestPermission().then(permission => {
          this.notification.permission = permission == "granted";
          this.notification.disabled = permission != "default";
        });
      }
    },
  },
  components: {
    Toast,
  },
};
</script>