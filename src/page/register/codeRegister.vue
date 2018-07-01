<template>
  <div>
    <head-top head-title="注册" go-login="true">
      <span></span>
    </head-top>

    <div class="loginBox">
      <div class="layer2rm"></div>
      <div class="loginFrom loginInFrom">
        <div>

          <div class="fromInput ">
            <input type="text" v-model="listData.phone_num" placeholder="请输入手机号">
          </div>

          <div class="fromInput ">
            <input type="password" v-model="listData.user_pwd" placeholder="请设置8-16位数字+字母组合密码">
          </div>

          <div class="fromInput">
            <input type="password" v-model="realPwd" placeholder="请再次确认密码">
          </div>

          <section class="fromInput inputAddBtn">
            <input type="text" v-model="listData.code" placeholder="请输入验证码">
            <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
            <button @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
          </section>

          <!--<div class="fromInput">-->
          <!--<input type="text" v-model:lazy="listData.invite_code" placeholder="请填写邀请码(选填)">-->
          <!--</div>-->

          <div class="erroTxt">
            <span></span>
          </div>

          <input type="button" @click="doRegister" class="loginBtn" value="确认注册">

        </div>
      </div>
      <div class="loginBottom">
        已有账号？
        <router-link to="/login">
          <span>请登录</span>
        </router-link>
      </div>
    </div>

    <div class="regProtocol">
      使用即表示同意
      <router-link to="/appProtocol">《好友币协议》</router-link>
    </div>

    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import { postRegister, getCodes, accountLogin } from "@/service/getData";
import crypto from "crypto";

export default {
  data() {
    return {
      showAlert: false,
      userInfo: null,
      computedTime: 0,
      realPwd: null,
      computedOut: 0,
      OutTimer: null,
      listData: {
        phone_num: null,
        user_pwd: null,
        code: null,
        invite_code: null,
        secret_code: null
      }
    };
  },
  mounted() {
    this.getInviteCode();
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    closeTip() {
      this.showAlert = false;
    },
    getInviteCode() {
      this.listData.invite_code = this.$route.params.pNum;

      //MD5邀请错误
      const md5 = crypto.createHash("md5");

      md5.update(this.listData.invite_code + "hyb");

      const md5Invite = md5.digest("hex");

      this.listData.secret_code = md5Invite;
    },
    //获取注册验证码
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
        getCodes(this.listData).then(res => {
          if (!res.result) {
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
    },
    //注册提交
    doRegister() {
      const _this = this;

      if (!this.rightPhoneNumber) {
        this.showAlert = true;
        this.alertText = "手机号码不正确";
        return;
      } else if (!this.listData.user_pwd) {
        this.showAlert = true;
        this.alertText = "密码格式不正确";
        return;
      } else if (!(this.realPwd == this.listData.user_pwd)) {
        this.showAlert = true;
        this.alertText = "确认密码不匹配";
        return;
      } else if (!/^\d{6}$/gi.test(this.listData.code)) {
        this.showAlert = true;
        this.alertText = "验证码错误";
        return;
      }

      this.userInfo = postRegister(this.listData).then(res => {
        if (res.result == false) {
          this.showAlert = true;
          this.alertText = res.msg;
        } else {
          this.showAlert = true;
          this.alertText = res.msg;

          const regAccLogin = {};

          regAccLogin.phone_num = res.phone_num;
          regAccLogin.user_pwd = res.pwd;

          accountLogin(regAccLogin);

          this.OutTimer = setTimeout(function() {
            _this.$router.push({ path: "/ftPayPwd" });
            clearTimeout(this.OutTimer);
          }, 1000);
        }
      });
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

<style lang="scss" scoped type="text/scss">
@import "~@/style/mixin";
@import "~@/style/login";
</style>
