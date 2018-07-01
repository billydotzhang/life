<template>
  <div>
    <div class="actDetail">
      <div class="detContent" ref="wrapper" :style="{height:displayWindow +'px'}">
        <div class="detImg" v-show="actDetailItem.active_thum">
          <img v-lazy="actDetailItem.active_thum" alt="头图">
        </div>
        <div class="detTitle">
          {{actDetailItem.active_title}}
        </div>
        <div class="detSubtitle">
          {{actDetailItem.active_msg}}
        </div>
        <div class="msgItem">
          <div class="itemIcon">
            <iconSvg icon-style="iconfont" icon-class='location'></iconSvg>
          </div>
          <div class="msgInfo msgInfo2">
            {{actDetailItem.active_address}}
          </div>
        </div>
        <div class="msgItem">
          <div class="itemIcon itemIcon2">
            <iconSvg icon-style="iconfont" icon-class='shijian'></iconSvg>
          </div>
          <div class="msgInfo">
            {{actDetailItem.active_time}}
          </div>
        </div>

        <div class="layer05rm"></div>

        <div class="actInfoTab">
          <div class="tabItem">
            活动详情
          </div>
        </div>
        <div class="actInformation" v-html="actDetailItem.active_content">
        </div>
      </div>
    </div>
    <div class="actDetailBtn" :class="{'actEnd': actDetailItem.order_status == 1}" @click="actButton(actDetailItem.order_status)">
      <span>{{actDetailItem.active_button}}</span>
    </div>

    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText" iconTrue="true"></alert-tip>
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import { activityDetail } from "@/service/getData";
import iconSvg from "@/components/common/icon";
import alertTip from "@/components/common/alertTip";
import { getStore } from "@/config/mUtils";

export default {
  data() {
    return {
      headTitle: "",
      actDetailItem: {},
      displayWindow: 0,
      showAlert: false,
      alertText: null,
      listData: {
        active_id: null,
        tkn: ""
      },
      OutTimer: 0
    };
  },
  components: {
    headTop,
    iconSvg,
    alertTip
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

    this.listData.active_id = this.$route.query.id;
    this.listData.tkn = getStore("uid") || this.$route.query.tkn;
    activityDetail(this.listData).then(res => {
      if (res.result) {
        this.actDetailItem = res.data;
        this.headTitle = res.data.active_title;
      }
    });
  },
  methods: {
    closeTip() {
      this.showAlert = false;
    },
    actButton(i) {
      if (this.listData.tkn && i == 1) {
        this.$router.push({
          path: "/appActivity/appReservation",
          query: { id: this.$route.query.id }
        });
      } else if (!this.listData.tkn) {
        this.showAlert = true;
        this.alertText = "请先登录";
        return;
      } else {
        return;
      }
    }
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

.actEnd {
  span {
    background-color: $mainCr !important;
  }
}
.actDetailBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: 88px;
  height: 88px;
  span {
    display: block;
    text-align: center;
    background-color: $debgCrb5;
    @include sc(34px, $defFtCrFF);
  }
}
.actDetail {
  .detContent {
    @include overflow;
    background-color: $debgCrFF;
  }
  .reseContent {
    @include overflow;
    background-color: $debgCrf5;
    padding-bottom: 92px;
  }
  .detTitle {
    margin: 39px 30px 32px 30px;
    text-align: left;
    @include sc(34px, $fontCr33);
  }
  .detSubtitle {
    margin: 0 30px;
    padding-bottom: 32px;
    border-bottom: dashed 1px $defCrCC;
    text-align: left;
    @include sc(22px, $mainCr);
  }
  .msgItem {
    @include display-flex;
    padding: 15px 30px;
    .icon {
      color: $mainCr;
      font-size: $defFSze;
    }
  }
  .msgInfo {
    width: 100%;
    padding: 21px 0;
    margin-left: 16px;
    @include sc(26px, $fontCr33);
  }
  .msgInfo2 {
    border-bottom: 1px solid $bdrInCre6;
  }
  .itemIcon {
    @include disFlexC(center, center);
    .iconfont {
      width: 50px;
      height: 40px;
      fill: $mainCr;
      vertical-align: middle;
      padding-right: 11px;
      border-right: 1px solid $bdrInCre6;
    }
  }
  .itemIcon2 {
    .iconfont {
      height: 35px;
    }
  }
  .layer05rm {
    background-color: $debgCrf5;
  }
  .actInfoTab {
    @include display-flex;
    .tabItem {
      width: 100%;
      text-align: center;
      @include sc(30px, $fontCr33);
      padding: 26px 0;
      margin-bottom: 37px;
      border-bottom: solid 1px $bdrInCre6;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        @include cl;
        bottom: -1px;
        width: 120px;
        height: 4px;
        background-color: $mainCr;
      }
    }
  }
  .actInformation {
    padding: 0 30px;
    margin-bottom: 98px;
    iframe {
      width: 345px !important;
      height: 268.45px !important;
    }
  }

  .reseBox {
    position: relative;
    margin: 0.6rem;
    padding: 0.6rem 0.6rem 1.5rem;
    background-color: $defCrFF;
    border-radius: $bdRadius;
    .detSubtitle {
      border-top: 1px solid #e6e6e6;
    }
  }
}
</style>
<style>
img {
  width: 100%;
}
</style>
