<template>
  <div>
    <div>
      <div class="loginFrom loginInFrom" v-if="!realed" v-cloak>
        <div>
          <section class="fromInput">
            <input type="text" v-model="listData.phone_num" placeholder="请输入您的手机号" readonly />
          </section>

          <section class="fromInput">
            <input type="text" v-model="listData.username" placeholder="请输入您的真实姓名" />
          </section>

          <section class="fromInput">
            <input type="text" v-model="listData.idcard" placeholder="请输入您的身份证件号码" />
          </section>
        </div>

        <div class="erroTxt">
          <span>{{alertText}}</span>
        </div>

        <div class="loginBtn" @click="doTrueName">
          确认
        </div>

      </div>
      <div class="realNamed" v-else>

        <div class="realNameTle">
          您当前的认证姓名为：
          <div class="realName">
            {{listData.username}}
          </div>
        </div>
        <div class="realNameTle">
          您当前的实名证件号为：
          <div class="realName">
            {{listData.idcard}}
          </div>
        </div>
      </div>

    </div>

    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>

    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText" tipTitle="" btnText="确定" iconTrue="true"></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import loading from "@/components/common/loading";
import { cheakName, realName, getPhone } from "@/service/getData";
import { getStore, setStore } from "@/config/mUtils";
import crypto from "crypto";

export default {
  data() {
    return {
      showAlert: false,
      alertText: null,
      computedTime: 0,
      listData: {
        username: null,
        idcard: null,
        phone_num: null,
        tkn: "",
        sgns: null,
        str: null //app时间验证
      },
      realed: false,
      showLoading: false,
      OutTimer: 0,
      noIcon: true
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
    this.listData.phone_num = getStore("user_mobile");

    if (!this.$route.query.tkn) {
      window.location.href = "hyblife://action/login";
      const _this = this;
      this.OutTimer = setTimeout(function() {
        _this.$router.push({ path: "/appProfile" });
        clearTimeout(this.OutTimer);
      });
    }

    cheakName(this.listData).then(res => {
      if (res.result) {
        this.realed = true;
        this.listData.idcard = res.msg.id;
        this.listData.username = res.msg.name;
      }
    });
  },
  components: {
    headTop,
    alertTip,
    loading
  },
  methods: {
    //开发环境与编译环境loading隐藏方式不同
    hideLoading() {
      this.showLoading = false;
    },
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
    doTrueName() {
      if (!this.listData.username) {
        // this.showAlert = true;
        this.alertText = "真实姓名有误";
        return;
      } else if (!this.rightIdCard) {
        // this.showAlert = true;
        this.alertText = "证件号码有误";
        return;
      } else if (!this.rightPhoneNumber) {
        // this.showAlert = true;
        this.alertText = "电话号码有误";
        return;
      }
      this.showLoading = true;
      this.appSafe();

      realName(this.listData).then(res => {
        this.hideLoading();
        if (!res.result) {
          this.showAlert = true;
          this.alertText = res.msg;
        } else {
          this.showAlert = true;
          this.alertText = res.msg;
          this.noIcon = false;
          const _this = this;

          if (!this.$route.query.home && !this.$route.query.tkn) {
            this.OutTimer = setTimeout(function() {
              _this.$router.push({
                path: "/appProfile",
                query: {
                  home: true,
                  tkn: getStore("uid")
                }
              });
              clearTimeout(_this.OutTimer);
            }, 1000);
          } else if (this.$route.query.way == 5) {
            this.OutTimer = setTimeout(function() {
              _this.$router.push({
                path: "/appProfile/appMyGold/appTranPay",
                query: {
                  way: _this.$route.query.way,
                  home: _this.$route.query.home,
                  tkn: _this.$route.query.tkn
                }
              });
              clearTimeout(_this.OutTimer);
            }, 1000);
          } else {
            this.OutTimer = setTimeout(function() {
              _this.$router.push({
                path: "/appProfile/appMyGold/appRecharge",
                query: {
                  home: _this.$route.query.home,
                  tkn: _this.$route.query.tkn
                }
              });
              clearTimeout(_this.OutTimer);
            }, 1000);
          }
        }
      });
    }
  },
  computed: {
    //判断手机号码
    rightPhoneNumber: function() {
      return /^1\d{10}$/gi.test(this.listData.phone_num);
    },
    //判断身份证
    rightIdCard: function() {
      return /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/gi.test(
        this.listData.idcard
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin";
@import "~@/style/login";

.realNamed {
  padding: 50px;
  .realNameTle {
    @include sc(30px, #666);
    text-align: center;
    margin-bottom: 69px;
  }
  .realName {
    @include sc(30px, #333);
    background-color: $defCrFF;
    padding: 15px 0;
    margin-top: 39px;
  }
}
</style>
