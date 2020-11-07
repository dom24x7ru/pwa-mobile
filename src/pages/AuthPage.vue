<template>
  <v-container fluid>
    <v-form>
      <v-container v-if="!showSmsCodeForm">
        <v-row>
          <v-col>
            <v-text-field v-model="mobile" prefix="+7" :rules="phoneRules" :counter="10" label="Ваш номер телефона" required />
            <v-text-field v-if="showInviteCode" v-model="invite" :counter="6" label="Введите код приглашения" required />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn x-large color="primary" dark @click="sendMobile">Отправить</v-btn>
          </v-col>
          <v-col>
            <v-btn x-large color="success" dark @click="showInviteCode = !showInviteCode">Я новый пользователь</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row>
          <v-col>
            <v-text-field v-model="smsCode" :rules="smsCodeRules" :counter="4" label="СМС код" required />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn x-large color="primary" dark @click="sendSmsCode">Отправить</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-form>
    <Toast v-if="toast.show" :show="toast.show" :text="toast.text" :color="toast.color" @close="toastClose" />
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Toast from "@/components/ToastComponent";

export default {
  name: "AuthPage",
  data() {
    return {
      mobile: null,
      invite: null,
      phoneRules: [
        (v) => !!v || "Необходимо указать номер телефона",
        (v) =>
          /^\d{10}$/.test(v) ||
          "Номер телефона должен быть валидным и состоять из 10 цифр",
      ],
      showInviteCode: false,
      showSmsCodeForm: false,
      smsCode: null,
      smsCodeRules: [
        (v) => !!v || "Необходимо указать смс код",
        (v) => /^\d{4}$/.test(v) || "СМС код состоит из 4 цифр",
      ],
      toast: {
        show: false,
        text: null,
        color: "error",
      },
    };
  },
  computed: {
    ...mapState(["client"]),
  },
  methods: {
    async sendMobile() {
      console.log("send mobile: ", this.mobile);
      const result = await this.client.wrapEmit("user.auth", {
        mobile: `7${this.mobile}`,
        invite: this.invite,
      });
      this.showSmsCodeForm = result.status == "OK";
      if (result.status == "ERROR") {
        this.toast.show = true;
        this.toast.text = result.message;
      }
    },
    async sendSmsCode() {
      const params = { mobile: `7${this.mobile}`, code: this.smsCode };
      console.log("send mobile with sms code: ", params);
      const result = await this.client.wrapEmit("user.auth", params);
      if (result.status == "ERROR") {
        this.toast.show = true;
        this.toast.text = result.message;
      }
    },
    toastClose() {
      this.toast.show = false;
    },
  },
  components: {
    Toast,
  },
};
</script>