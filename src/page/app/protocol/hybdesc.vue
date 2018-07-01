<template>
  <div class="hybdesc">
    <p class="hybTitle">什么是好友币</p>
    <div class="hybContent">
      好友币是依据国家商务部发布的《单用途商业预付卡管理办法（试行）》备案后由上海昊银国际贸易有限公司发行的一种电子代价凭证。 目前，好友币说明及好友币系统特性已经获得国家颁发的作品著作权证书。
    </div>
    <div class="hybImg">
      <img src="/static/images/j1.png" alt="商务部网站备案通过证明">
      <p>
        商务部网站备案通过证明
      </p>
    </div>
    <div class="hybImg">
      <img src="/static/images/j2.png" alt="上海市单用途预付卡协会备案企业证书">
      <p>
        上海市单用途预付卡协会备案企业证书
      </p>
    </div>
    <div class="hybContent">
      好友币可以应用于好友邦生活app、昊银国际商城等消费渠道，同时应用于好友邦生活会员权益服务中心及相关特约商户（特约商户类型包括且不限于零售便利店、线下终端智能自助机、餐厅、影院、运动健身、美容店等）
    </div>
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
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "~@/style/mixin";
@import "~@/style/login";
.hybdesc {
  background-color: #fff;
  .hybTitle {
    font-family: PingFang-SC-Bold;
    font-size: 30px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 38px;
    letter-spacing: 0px;
    color: #fb5609;
    text-align: center;
    padding: 58px 0;
  }
  .hybImg {
    text-align: center;
    padding: 43px 0;
    p {
      padding: 10px 0;
    }
  }
  .hybContent {
    padding: 0 30px;
  }
}
</style>
