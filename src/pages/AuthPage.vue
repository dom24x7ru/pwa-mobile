<template>
  <v-container fluid>
    <v-form>
      <v-container v-if="!showSmsCodeForm">
        <v-row>
          <v-col>
            <v-text-field v-model="mobile" prefix="+7" :rules="phoneRules" :counter="10" :label="$t('security.mobile.first')" required />
            <v-text-field v-if="isReg" v-model="mobile2" prefix="+7" :rules="[checkPhone]" :counter="10" :label="$t('security.mobile.second')" required />
            <v-text-field v-if="isReg" v-model="invite" :counter="6" :label="$t('security.reg.invite')" required />
          </v-col>
        </v-row>
        <v-row class="text-center">
          <v-col cols="12">
            <v-btn x-large color="primary" dark @click="sendMobile">{{ sendBtnCaption }}</v-btn>
          </v-col>
          <v-col cols="12" class="text--disabled">
            &mdash; или &mdash;
          </v-col>
          <v-col cols="12">
            <a @click="isReg = !isReg">{{ inviteBtnCaption }}</a>
          </v-col>
        </v-row>
      </v-container>
      <v-container v-else>
        <v-row>
          <v-col>
            <v-text-field v-model="smsCode" :rules="smsCodeRules" :counter="4" :label="$t('security.auth')" required />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-btn x-large color="primary" dark @click="sendSmsCode">{{ $t("security.auth.send") }}</v-btn>
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
      mobile2: null,
      invite: null,
      phoneRules: [
        (v) => !!v || this.$t("security.mobile.rules.empty"),
        (v) => /^\d{10}$/.test(v) || this.$t("security.mobile.rules.format"),
      ],
      isReg: false,
      showSmsCodeForm: false,
      smsCode: null,
      smsCodeRules: [
        (v) => !!v || this.$t("security.auth.rules.sms.empty"),
        (v) => /^\d{4}$/.test(v) || this.$t("security.auth.rules.sms.format"),
      ],
      toast: {
        show: false,
        text: null,
        color: "error",
      },
      sendBtnCaption: this.$tc("security.auth.signin", 1),
      inviteBtnCaption: this.$t("security.reg.send"),
    };
  },
  computed: {
    ...mapState(["client"]),
  },
  methods: {
    checkPhone(value) {
      if (this.mobile == value) return true;
      return this.$t("security.mobile.rules.repeat");
    },
    async sendMobile() {
      if (!/^\d{10}$/.test(this.mobile)) {
        console.warn("mobile not valid");
        return;
      }
      if (this.isReg) {
        if (this.mobile != this.mobile2) {
          console.warn("mobile != mobile2");
          return;
        }
        if (!/^\d{6}$/.test(this.invite)) {
          console.warn("invite code not valid");
          return;
        }
      }
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
  watch: {
    invite() {
      if (this.invite == null) return;
      this.invite = this.invite.replace("-", "");
    },
    isReg() {
      this.sendBtnCaption = this.isReg ? this.$t("security.reg.send") : this.$tc("security.auth.signin", 1);
      this.inviteBtnCaption = this.isReg ? this.$tc("security.auth.signin", 2) : this.$t("security.reg.send");
    }
  },
  components: {
    Toast,
  },
};
</script>