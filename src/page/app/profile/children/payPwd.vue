<template>
  <div>
    <div class="loginBox">
      <div class="loginFrom">
        <div>
          <section class="fromInput">
            <input type="text" v-model="listData.phone_num" placeholder="请输入手机号" style="color: #ccc;" readonly />
          </section>
          <section class="fromInput">
            <input type="password" v-model="listData.pay_pwd" placeholder="请输入新的6位支付密码" />
          </section>

          <section class="fromInput inputAddBtn">
            <input type="text" v-model="listData.code" placeholder="请输入验证码">
            <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
            <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
          </section>
        </div>

        <div class="layer2rm"></div>
        <div class="loginBtn" @click="doPayPwd">
          确认
        </div>

      </div>

    </div>

    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import { postPayPwd, getCode, getPhone } from "@/service/getData";
import { getStore, setStore } from "@/config/mUtils";
import crypto from "crypto";

export default {
  data() {
    return {
      showAlert: false,
      alertText: null,
      computedTime: 0,
      listData: {
        phone_num: null,
        pay_pwd: null,
        code: null,
        tkn: "",
        sgns: null,
        str: null //app时间验证
      }
    };
  },
  mounted() {
    this.listData.tkn = this.$route.query.tkn;

    setStore("uid", this.$route.query.tkn);
    this.appSafe();
    getPhone(this.listData).then(res => {
      if (res.result) {
        setStore("user_mobile", res.phone);
        setStore("user_id", res.id);
        setStore("user_invited", res.invited);
        setStore("user_realName", res.realname);
        setStore("user_gold", res.gold);
      }
    });

    this.listData.tkn = getStore("uid");
    this.listData.phone_num = getStore("user_mobile");
  },
  components: {
    alertTip
  },
  methods: {
    closeTip() {
      this.showAlert = false;
    },
    appSafe() {
      this.listData.str = new Date().getTime();
      this.listData.sgns = this.doSing(
        "str=" + this.listData.str + "&client=iojd781585&keys=iolibc"
      );
    },
    doSing(i) {
      const md5 = crypto.createHash("md5");
      md5.update(i);
      const md5Transfer = md5.digest("hex");
      // this.listData.sign = md5Transfer;
      return md5Transfer;
    },
    doPayPwd() {
      if (!this.rightPhoneNumber) {
        this.showAlert = true;
        this.alertText = "手机号码不正确";
        return;
      } else if (!/^\d{6}$/gi.test(this.listData.pay_pwd)) {
        this.showAlert = true;
        this.alertText = "支付密码格式不正确";
        return;
      } else if (!/^\d{6}$/gi.test(this.listData.code)) {
        this.showAlert = true;
        this.alertText = "验证码错误";
        return;
      }
      this.appSafe();
      postPayPwd(this.listData).then(res => {
        if (!res.result) {
          this.showAlert = true;
          this.alertText = res.msg;
        } else {
          this.showAlert = true;
          this.alertText = res.msg;
          const _this = this;
          this.OutTimer = setTimeout(function() {
            window.location.href = "hyblife://action/go1";
            clearTimeout(this.OutTimer);
          }, 1000);
        }
      });
    },
    getVerifyCode() {
      if (this.rightPhoneNumber) {
        this.computedTime = 60;
        this.timer = setInterval(() => {
          this.computedTime--;
          if (this.computedTime == 0) {
            clearInterval(this.timer);
          }
        }, 1000);

        // 获取验证码
        this.appSafe();
        getCode(this.listData).then(res => {
          if (res.result) {
            this.showAlert = true;
            this.alertText = res.msg;
            return;
          } else {
            this.showAlert = true;
            this.alertText = res.msg;
            return;
          }
        });
      } else {
        this.showAlert = true;
        this.alertText = "手机号码不正确";
        return;
      }
    }
  },
  computed: {
    //判断手机号码
    rightPhoneNumber: function() {
      return /^1\d{10}$/gi.test(this.listData.phone_num);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin";
@import "~@/style/login";
.fromInput {
  input {
    padding-left: 41px;
  }
}
</style>
