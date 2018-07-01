<template>
  <div>
    <div class="recharge">
      <div class="recharge_d1">
        <h1>邀请码
          <span></span>
        </h1>
        <div class="numberInput">
          <input type="text" v-model="listData.invite" placeholder="请输入邀请人的好友币账户" v-if="!invited || invited == '0'">
          <input type="text" v-model="invited" placeholder="请输入邀请人的好友币账户" readonly v-else>
        </div>
        <h2 v-if="!invited">
          邀请码只能输入一次，且不可变更
        </h2>
        <h2 v-else>
          您已经输入过邀请码
        </h2>
      </div>

      <div class="recharge_d3" v-if="!invited">
        <button @click="goNext()">确认</button>
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
import { addInvite, invited, getPhone } from "@/service/getData";
import { getStore, setStore } from "@/config/mUtils";
import crypto from "crypto";

export default {
  data() {
    return {
      showAlert: false,
      alertText: null,
      invited: null,
      listData: {
        invite: null,
        tkn: "",
        sgns: null,
        str: null //app时间验证
      },
      showLoading: false
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

    this.invited = getStore("user_invited");
    this.listData.tkn = getStore("uid");
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
    goNext() {
      if (!this.listData.invite) {
        this.showAlert = true;
        this.alertText = "请输入邀请码";
        this.btnText = "确定";
      } else {
        this.appSafe();
        addInvite(this.listData).then(res => {
          if (res.result) {
            const _this = this;
            this.showAlert = true;
            this.alertText = res.msg;
            this.btnText = "确定";
            this.OutTimer = setTimeout(function() {
              _this.$router.push({
                path: "/appProfile/appMyGold",
                query: {
                  goWay: true
                }
              });
              clearTimeout(this.OutTimer);
            }, 500);
          } else {
            this.showAlert = true;
            this.alertText = res.msg;
            this.btnText = "确定";
          }
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.numberInput {
  input {
    padding-left: 0;
  }
}
</style>
