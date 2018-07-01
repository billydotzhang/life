<template>
  <div>
    <div class="myActDetail">
      <div class="actDetDiv" ref="wrapper" :style="{height:displayWindow + 'px'}">
        <h1 class="actDetDiv_h1">{{myActDetail.active_abstract}}</h1>
        <div class="actDetDiv_d1">
          <h2>{{myActDetail.active_title}}</h2>
          <p>
            <label>
              <span>时 间 ：</span>
            </label>
            <span>{{myActDetail.active_time}}</span>
          </p>
          <p>
            <label>地 址 ：</label>{{myActDetail.active_address}}</p>
          <p>
            <label>预约人数：</label>
            <span> {{myActDetail.active_num}}</span> (位)</p>
        </div>
        <div class="actDetDiv_d2">
          <h3>活动订单号：
            <label>{{myActDetail.ua_order}}</label>
          </h3>
          <iconSvg icon-style="codeStatus yijieshu" icon-class="yijieshu" v-if="myActDetail.ua_status == 2"></iconSvg>
          <iconSvg icon-style="codeStatus yiwancheng" icon-class="yiwancheng" v-if="myActDetail.ua_status == 1"></iconSvg>
        </div>
        <div class="actDetDiv_d3"><img v-lazy="actCodeJpg" alt="邀请好友二维码"></div>
        <div class="actDetDiv_d4">活动联系人:
          <label>{{myActDetail.active_linkman}} {{myActDetail.active_phone}}
          </label>
        </div>
      </div>
    </div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import loading from "@/components/common/loading";
import alertTip from "@/components/common/alertTip";
import iconSvg from "@/components/common/icon";
import { myActDetail } from "@/service/getData";
import crypto from "crypto";

export default {
  data() {
    return {
      displayWindow: 0,
      showLoading: true,
      myActDetail: {},
      showAlert: false,
      alertText: null,
      actCodeJpg: null,
      listData: {
        active_id: null,
        sgns: null,
        str: null //app时间验证
      }
    };
  },
  mounted() {
    this.listData.active_id = this.$route.query.id;
    this.appSafe();
    myActDetail(this.listData).then(res => {
      if (res.result) {
        this.myActDetail = res.data;
        this.InviteCode(res.data.ua_order);
        this.hideLoading();
      } else {
        this.showAlert = true;
        this.alertText = res.msg;
      }
    });

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
    InviteCode(code) {
      this.actCodeJpg = "php/api/QRcode.php?size=4.3&magin=2&url=" + code;
    },
    showCode(i) {
      const show = Number(i);
      return i.replace(/[\s]/g, "").replace(/(\d{4})(?=\d)/g, "$1 ");
    }
  },
  components: {
    loading,
    alertTip,
    iconSvg
  },
  watch: {
    displayWindow: function(val) {
      this.displayWindow = val;
    }
  }
};
</script>

<style lang="scss" scoped type="text/scss">
@import "~@/style/mixin";

.myActDetail {
  .actDetDiv {
    margin: 30px;
    background-color: $debgCrFF;
    border-radius: 20px;
  }
  .actDetDiv_h1 {
    @include sc(26px, $fontCr66);
    padding: 28px 40px;
    border-bottom: solid 1px $bdrInCre6;
    font-weight: 500;
  }
  .actDetDiv_d1 {
    padding: 0 40px 70px 40px;
    border-bottom: dashed 1px $bdrInCre6;
    position: relative;
    &:before {
      content: "";
      width: 40px;
      height: 40px;
      position: absolute;
      left: -20px;
      bottom: -20px;
      background-color: $debgCrf5;
      border-radius: 100%;
    }
    &:after {
      content: "";
      width: 40px;
      height: 40px;
      position: absolute;
      right: -20px;
      bottom: -20px;
      background-color: $debgCrf5;
      border-radius: 100%;
    }
    h2 {
      @include sc(44px, $fontCr33);
      padding: 48px 0;
      font-weight: 500;
    }
    p {
      margin-bottom: 10px;
      @include sc(26px, $fontCr66);
      line-height: 35px;
      position: relative;
      padding-left: 130px;
    }
    label {
      width: 130px;
      position: absolute;
      left: 0;
      top: 0;
      text-align: right;
    }
    span {
      color: $mainCr;
    }
  }
  .actDetDiv_d2 {
    padding: 0 40px;
    position: relative;
    h3 {
      padding: 35px 21px;
      background-color: $debgCrFA;
      @include sc(28px, $fontCr99);
      margin: 40px 0 30px;
      font-weight: 500;
    }
    label {
      @include sc(36px, $fontCr66);
      font-weight: bold;
    }
    .yijieshu {
      fill: $fontCr99;
    }
    .yiwancheng {
      fill: #ff0000;
    }
  }
  .actDetDiv_d3 {
    text-align: center;
    padding-bottom: 47px;
    img {
      display: inline-block;
      width: 320px;
      height: 320px;
      border: solid 1px $bdrInCre6;
    }
  }
  .actDetDiv_d4 {
    @include sc(26px, $fontCr99);
    padding: 0 40px 63px 40px;
    label {
      color: $fontCr33;
    }
  }
  .codeStatus {
    position: absolute;
    display: block;
    width: 150px;
    height: 150px;
    top: 39px;
    right: 10px;
  }
}
</style>
