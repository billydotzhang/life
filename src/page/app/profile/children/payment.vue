<template>
  <div>
    <div class="card_section">
      <div class="layer2rm" v-show="false"></div>

      <div class="payment_box" ref="wrapper" :style="{height:displayWindow + 'px'}">
        <mt-cell-swipe v-for="n in 15" :key="n" :right="rightButtons" title="swipe123" to="/appProfile">
        </mt-cell-swipe>
      </div>
    </div>

    <transition name=" loading ">
      <loading v-show="showLoading "></loading>
    </transition>

    <alert-tip v-if="showAlert " :showHide="showAlert " @closeTip="closeTip " :alertText="alertText " tipTitle=" " btnText="确定 " iconTrue="true "></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import alertTip from "@/components/common/alertTip";
import loading from "@/components/common/loading";
import iconSvg from "@/components/common/icon";
import { bankCardList } from "@/service/getData";
import { getStore } from "@/config/mUtils";
import crypto from "crypto";

export default {
  data() {
    return {
      showAlert: false,
      alertText: null,
      showLoading: true,
      displayWindow: 0,
      listData: {
        tkn: "",
        sgns: null,
        str: null //app时间验证
      }
    };
  },
  mounted() {
    this.displayWindow =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
    window.onresize = () => {
      return (() => {
        this.displayWindow =
          document.documentElement.clientHeight -
          this.$refs.wrapper.getBoundingClientRect().top;
      })();
    };

    this.hideLoading();

    this.listData.tkn = this.$route.query.tkn || getStore("uid");
    this.appSafe();
  },
  created() {
    this.rightButtons = [
      {
        content: "取消",
        style: { background: "lightgray", color: "#fff" }
      },
      {
        content: "删除",
        style: { background: "red", color: "#fff" },
        handler: () => this.$messagebox("delete")
      }
    ];
  },
  components: {
    headTop,
    alertTip,
    loading,
    iconSvg
  },
  methods: {
    //开发环境与编译环境loading隐藏方式不同
    hideLoading() {
      this.showLoading = false;
    },
    closeTip() {
      this.showAlert = false;
    },

    cardNumber(i) {
      const number = i.substr(i.length - 4);
      return number;
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
    leftButtonHandler(evt) {
      console.log(123);
    }
  },
  watch: {
    displayWindow: function(val) {
      this.displayWindow = val;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin";
.payment_box {
  @include overflow;
  background-color: #fff;
}
.icon_payment {
  width: 70px !important;
  height: 70px !important;
}
</style>
<style>
.mint-cell {
  min-height: 120px;
}
.mint-cell-swipe-button {
  padding: 0 30px;
  font-size: 30px; /*px*/
  line-height: 120px;
}
</style>
