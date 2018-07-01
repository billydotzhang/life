<template>
  <div>
    <div class="actDetail">
      <div class="reseContent" ref="wrapper" :style="{height:displayWindow +'px'}">
        <div class="detImg" v-show="actDetailItem.active_thum">
          <img v-lazy="actDetailItem.active_thum" alt="头图">
        </div>
        <div class="reseBox">
          <div class="detTitle">
            {{actDetailItem.active_title}}
          </div>
          <div class="msgItem">
            <div class="itemIcon">
              <iconSvg icon-style="iconfont" icon-class='location'></iconSvg>
            </div>
            <div class="msgInfo">
              {{actDetailItem.active_address}}
            </div>
          </div>
          <div class="msgItem">
            <div class="itemIcon">
              <iconSvg icon-style="iconfont" icon-class='shijian'></iconSvg>
            </div>
            <div class="msgInfo">
              {{actDetailItem.active_time}}
            </div>
          </div>

          <div class="detSubtitle">
            {{actDetailItem.active_msg}}
          </div>

          <div class="detSubtitle" v-show="actDetailItem.is_order">
            {{actDetailItem.order_num}}
          </div>

          <div class="link linkLeft" v-show="!actDetailItem.is_order">
            <i class="point top"></i>
            <i class="point down"></i>
            <i class="line"></i>
          </div>
          <div class="link linkRight" v-show="!actDetailItem.is_order">

            <i class="point top"></i>
            <i class="point down"></i>
            <i class="line"></i>
          </div>
        </div>

        <div class="reseNumber" v-show="!actDetailItem.is_order">
          <span class="humanText">预约人数</span>
          <ul>
            <li v-for="(human,index) in actDetailItem.active_person" :key="human.number" :class="[listData.people_num == index + 1?'itemActive':'']" @click="payNum($event,index)" class="humanItem itemBtn">
              {{index + 1}}
            </li>
          </ul>
        </div>

      </div>

      <div class="actDetailBtn" :class="{'actEnd': iconAction(actDetailItem)}" @click="actButton(actDetailItem)">

        <span>{{actionBtn}}</span>
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
import { reservations, handleOrder } from "@/service/getData";
import { getStore } from "@/config/mUtils";

export default {
  data() {
    return {
      headTitle: "",
      showAlert: false,
      showLoading: true,
      actDetailItem: {},
      displayWindow: 0,
      isActive: 0,
      listData: {
        active_id: null,
        people_num: 1,
        tkn: ""
      },
      OutTimer: 0,
      actionBtn: "立即预约"
    };
  },
  components: {
    headTop,
    loading,
    alertTip,
    iconSvg
  },
  mounted() {
    this.listData.tkn = getStore("uid");
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
    this.listData.tkn = getStore("uid");
    reservations(this.listData).then(res => {
      this.hideLoading();
      const _this = this;
      if (res.result == "1") {
        this.actDetailItem = res.data;
        this.headTitle = res.data.active_title;
        if (res.data.active_person) {
          this.actDetailItem.active_person = Number(res.data.active_person);
        } else {
          this.actDetailItem.active_person = 1;
        }
      }
    });
  },
  methods: {
    closeTip() {
      this.showAlert = false;
    },
    hideLoading() {
      this.showLoading = false;
    },
    payNum(e, i) {
      this.listData.people_num = i + 1;
      if (this.isActive !== null) {
        this.listData.user_money = Number(e.target.innerText);
      }
    },
    actButton(i) {
      if (!i.is_order) {
        if (!i.is_full) {
          handleOrder(this.listData).then(res => {
            if (res.result == 1) {
              reservations(this.listData).then(res => {
                if (res.result == 1) {
                  this.actDetailItem = res.data;
                } else if (res.result == 100) {
                  const _this = this;
                  this.OutTimer = setTimeout(function() {
                    _this.$router.push({ path: "/login" });
                    clearTimeout(_this.OutTimer);
                  }, 500);
                }
              });
              this.showAlert = true;
              this.alertText = res.msg;
            } else {
              this.showAlert = true;
              this.alertText = res.msg;
            }
          });
        }
      } else {
        return;
      }
    },
    iconAction(i) {
      if (!i.is_order) {
        if (i.is_full) {
          this.actionBtn = "已满";
          return false;
        }
        return true;
      } else {
        this.actionBtn = "已预约";
        return false;
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

.actDetail {
  .reseContent {
    @include overflow;
    background-color: $debgCrf5;
    padding-bottom: 92px;
  }
  .detTitle {
    font-size: $defFSze09;
    padding: 23px 27.6px;
    text-align: center;
  }
  .detSubtitle {
    font-size: $defFSze06;
    padding: 23px 27.6px;
    color: $mainCr;
    text-align: center;
  }
  .msgItem {
    border-top: 1px solid $bdrInCre6;
  }
  .msgItem {
    @include display-flex;
    padding: 23px 27.6px;
    .icon {
      color: $mainCr;
      font-size: $defFSze;
    }
  }
  .msgInfo {
    padding-left: 18.4px;
    border-left: 1px solid $bdrInCre6;
  }
  .itemIcon {
    @include disFlexC(center, center);
  }
  .layer05rm {
    background-color: $debgCrf5;
  }
  .actInfoTab {
    @include display-flex;
    margin-top: 27.6px;
    .tabItem {
      width: 100%;
      text-align: center;
    }
  }
  .actInformation {
    padding: 0 27.6px;
    margin-bottom: 115px;
  }
  .actDetailBtn {
    position: fixed;
    width: 100%;
    bottom: 0;
    span {
      display: block;
      text-align: center;
      background-color: $debgCrb5;
      line-height: 92px;
      @include sc(36.8px, $defFtCrFF);
    }
  }
  .actEnd {
    span {
      background-color: $mainCr;
    }
  }
  .reseBox {
    position: relative;
    margin: 27.6px;
    padding: 27.6px 27.6px 69px;
    background-color: $defCrFF;
    border-radius: $bdRadius;
    .detSubtitle {
      border-top: 1px solid #e6e6e6;
    }
  }
}

.iconfont {
  width: 50px;
  height: 40px;
  fill: $mainCr;
  vertical-align: middle;
  padding-right: 11px;
  border-right: 1px solid $bdrInCre6;
}

.link {
  position: absolute;
  bottom: 0.1rem;
  .line {
    top: -23px;
    position: absolute;
    display: block;
    width: 18.4px;
    height: 82.8px;
    background-color: #faaf17;
    border-radius: 27.6px;
  }
  .top {
    top: 36.8px;
    background-color: #000;
  }
  .down {
    bottom: 0;
    background-color: #000;
  }
}

.linkLeft {
  left: 46px;
}

.linkRight {
  right: 64.4px;
}

.point {
  position: absolute;
  left: -8.74px;
  display: block;
  width: 36.8px;
  height: 36.8px;
  border-radius: 50%;
  background-color: $mainCr;
}

.reseNumber {
  @include display-flex;
  @include align-items(center);
  @include justify-content(space-between);
  background-color: $debgCrFF;
  margin: 27.6px;
  padding: 69px 27.6px 27.6px;
  border-radius: $bdRadius;
  .humanText {
    margin-right: 18.4px;
  }
  .itemActive {
    border: 1px solid $mainCr !important;
    background-color: $mainCr;
    color: $defCrFF;
  }
  ul {
    @include display-flex;
    width: 60%;
    .humanItem {
      border: 1px solid $bdrInCre6;
      border-radius: $bdRadius;
      float: left;
      text-align: center;
      line-height: 69px;
      margin-right: 23px;
    }
    .itemBtn {
      width: 69px;
      height: 69px;
    }
  }
}
</style>
