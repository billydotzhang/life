<template>
  <div class="restContainer">
    <head-top head-title="我的" navRtIcon="shezhi" rightName="" rightLink="/profile/setPwd" v-show="false">
    </head-top>
    <div class="myCenter">
      <div style="overflow:scroll;" ref="wrapper" :style="{height:displayWindow + 'px'}">
        <div class="myTopBox">
          <div class="myCard" @click="goNext('/appProfile/appMyGold')" v-if="this.username !== '' && this.username !== '未登录'">
            <div class="cardLeft">
              <div class="topImg" v-if="!imgUrl" v-cloak>
                <iconSvg icon-style="iconfont" icon-class="tou"></iconSvg>
                <span>Lv.1</span>
              </div>
              <div class="topImg" :style="{backgroundImage: 'url(\''+ imgUrl +'\')'}" v-else>
                <span>Lv.1</span>
              </div>
            </div>
            <div class="cardRight">
              <div class="topName" v-if="realname">
                {{realname}}
              </div>
              <div class="topName" v-else-if="userphone">
                {{userphone}}
              </div>
              <div class="topName" v-else>
                {{user_name}}
              </div>
              <div class="topCoin" v-cloak>
                <span>好友币：</span>
                {{balance}}
              </div>
              <div class="cardId" v-if="!cardNumber">
                会员卡号：请至门店获取实体卡
              </div>
              <div class="cardId" v-else>
                会员卡号：{{cardNumber}}
              </div>
              <div class="topGoNext">
                <iconSvg icon-style="topIconRight" icon-class="shuangjiantouyou"></iconSvg>
              </div>
            </div>
          </div>
          <div class="myCard" v-else>
            <div class="cardLeft">
              <div class="topImg" v-if="!imgUrl" v-cloak>
                <iconSvg icon-style="iconfont" icon-class="tou"></iconSvg>
                <span>Lv.1</span>
              </div>
              <div class="topImg" :style="{backgroundImage: 'url(\''+ imgUrl +'\')'}" v-else>
                <span>Lv.1</span>
              </div>
            </div>
            <div class="cardRight">
              <a href="hyblife://action/login">
                <div class="topName">
                  请登录...
                </div>
                <div class="topGoNext">
                  <iconSvg icon-style="topIconRight" icon-class="shuangjiantouyou"></iconSvg>
                </div>
              </a>
            </div>
          </div>

        </div>

        <div class="myList">
          <ul class="myListUl">
            <li class="myListLi" @click="goNext('/appProfile/appPoints')">
              <iconSvg icon-style="myIcon" icon-class="haoyoubi"></iconSvg>
              <div class="title">
                <div class="listLeft">
                  <span>余额积分奖励</span>
                </div>
                <div class="listRight">
                  <span v-if="this.username !== '' && this.username !== '未登录'">今日已到账{{addBalance}}</span>
                  <span v-else>登录后查看</span>
                  <iconSvg icon-style="rightIcon" icon-class="youhua"></iconSvg>
                </div>
              </div>
            </li>
            <li class="myListLi" @click="goNext('/appProfile/appMyActivity')">
              <iconSvg icon-style=" myIcon " icon-class="huodong"></iconSvg>
              <div class="title ">
                <div class="listLeft ">
                  <span>我的活动</span>
                </div>
                <div class="listRight ">
                  <span>{{activity}}</span>
                  <iconSvg icon-style="rightIcon" icon-class="youhua"></iconSvg>
                </div>
              </div>
            </li>
            <li class="myListLi " @click="goNext('/appProfile/appInvite')">
              <iconSvg icon-style="myIcon" icon-class="woyaoyaoqingICON"></iconSvg>
              <div class="title ">
                <div class="listLeft ">
                  <span>好友邀请</span>
                </div>
                <div class="listRight ">
                  <span>{{invite}}</span>
                  <iconSvg icon-style="rightIcon" icon-class="youhua"></iconSvg>
                </div>
              </div>
            </li>
            <li class="myListLi " @click="goNext('/appProfile/appMyId')">
              <iconSvg icon-style="myIcon" icon-class="shimingrenzheng"></iconSvg>
              <div class="title ">
                <div class="listLeft ">
                  <span>实名认证</span>
                </div>
                <div class="listRight ">
                  <span>{{checkInfo}}</span>
                  <iconSvg icon-style="rightIcon" icon-class="youhua"></iconSvg>
                </div>
              </div>
            </li>
            <!-- <li class="myListLi " @click="goNext('/profile')">
							<iconSvg icon-style="myIcon " icon-class="yinhangqia "></iconSvg>
							<div class="title ">
								<div class="listLeft ">
									<span>银行卡</span>
								</div>
								<div class="listRight ">
									<span>{{payState}}</span>
									<iconSvg icon-style="rightIcon " icon-class="youhua "></iconSvg>
								</div>
							</div>
						</li> -->
            <!-- <li class="myListLi " @click="goNext('/profile')">
							<iconSvg icon-style="myIcon " icon-class="yijianfankui "></iconSvg>
							<div class="title ">
								<div class="listLeft ">
									<span>帮助与反馈</span>
								</div>
								<div class="listRight ">
									<span>{{payState}}</span>
									<iconSvg icon-style="rightIcon " icon-class="youhua "></iconSvg>
								</div>
							</div>
						</li> -->
          </ul>
        </div>
      </div>
    </div>

    <transition name="loading ">
      <loading v-show="showLoading "></loading>
    </transition>

    <!-- <navBottom></navBottom> -->
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import navBottom from "@/components/navigation/nav";
import iconSvg from "@/components/common/icon";
import loading from "@/components/common/loading";
import { mapState, mapMutations } from "vuex";
import { setStore, getStore } from "@/config/mUtils";
import { getUser, clearFailRec, getPhone } from "@/service/getData";
import crypto from "crypto";

export default {
  data() {
    return {
      username: "未登录", //用户名
      balance: 0.0, //余额
      addBalance: 0.0,
      cardNumber: null,
      invite: null,
      realname: null,
      userphone: null,
      imgUrl: null,
      checkInfo: null,
      showLoading: true,
      payState: null,
      activity: null,
      displayWindow: 0,
      user_name: null,
      error: null,
      listData: {
        tkn: "",
        sgns: null,
        str: null //app时间验证
      }
    };
  },
  mounted() {
    if (this.$route.meta.app && Boolean(this.$route.query.tkn)) {
      this.phoneRes = this.$route.query.tkn;
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
    } else {
      localStorage.clear();
    }

    this.listData.tkn = getStore("uid");
    window.location.href = "hyblife://action/show";

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

    // this.initData();
    this.hideLoading();
    if (this.$route.query.tkn) {
      this.appSafe();
      getUser(this.listData).then(res => {
        this.username = res.top.user_name;
        this.realname = res.top.realname;
        this.userphone = res.top.userphone;
        this.cardNumber = res.top.card_number;
        this.balance = res.gold;
        this.addBalance = res.amount;
        this.imgUrl = res.top.headimgurl;
        this.checkInfo = res.checkInfo;
        this.invite = res.invite;
        this.payState = res.pay;
        this.activity = res.active;
      });
      clearFailRec().then();
    }
  },
  components: {
    headTop,
    loading,
    navBottom,
    iconSvg
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    //开发环境与编译环境loading隐藏方式不同
    hideLoading() {
      this.showLoading = false;
    },
    // initData() {
    //   if (this.userInfo && this.userInfo.user_id) {
    //     this.username = this.userInfo.top.user_name;
    //     this.cardNumber = this.userInfo.top.card_number;
    //     this.balance = this.userInfo.gold;
    //     this.addBalance = this.userInfo.lx_hyb;
    //     this.imgUrl = this.userInfo.top.headimgurl;
    //     this.checkInfo = this.userInfo.checkInfo;
    //     this.invite = this.userInfo.invite;
    //     this.payState = this.userInfo.pay;
    //     this.activity = this.userInfo.active;
    //     this.hideLoading();
    //   } else {
    //     this.username = "";
    //   }
    // },
    goNext(path) {
      this.$router.push(path);
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

.myCenter {
  background-color: #fafafc;
  height: 100%;
  .myTopBox {
    padding: 50px;
    background-color: $debgCrFF;
  }
  .myCard {
    @include display-flex;
    position: relative;
    width: 100%;
    background: url("~@/assets/user/userTop.png") no-repeat;
    background-size: 100% 100%;
    border-radius: 25px;
    height: 280px;
    box-shadow: 5px 5px 30px 2px #ff9178; /*no*/
  }

  .cardLeft {
    padding: 24px 25px 0 24px;
  }
  .cardRight {
    width: 100%;
    margin-top: 43px;
    a {
      height: 100%;
      width: 100%;
      display: block;
    }
  }
  .cardId {
    @include sc(22px, $defCrFF);
    margin-top: 86px;
  }
  .topImg {
    @include wh(100px, 100px);
    display: block;
    border-radius: 50%;
    position: relative;
    border: 1px solid $bdrInCre6; /*no*/
    .iconfont {
      @include wh(100px, 100px);
      fill: $mainCr;
      overflow: hidden;
      vertical-align: top;
      margin-right: 10px;
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
    span {
      display: none;
      position: absolute;
      right: -0.3rem;
      bottom: 0;
      color: $defCrFF;
    }
  }
  .topName {
    @include sc(34px, $defCrFF);
    font-weight: 100;
  }
  .topSignIn {
    background-color: rgba(255, 255, 255, 0.3);
    padding: 0.2rem 0.3rem;
    margin: 0.3rem auto;
    width: 3.8rem;
    span {
      @include sc(30px, $defCrFF);
      display: block;
    }
  }
  .topCoin {
    font-size: 32px;
    color: $defCrFF;
    span {
      font-size: 22px;
      font-weight: 100;
      color: $defCrFF;
    }
  }
  .topGoNext {
    @include disFlexC(center, center);
    @include wh(80px, 50px);
    top: 50%;
    margin-top: -25px;
    position: absolute;
    right: 0;
    background-color: #fc6c1c;
    border-radius: 50px 0 0 50px;
  }
  .topIconRight {
    @include wh(60px, 30px);
    fill: #fff;
    margin-left: 20px;
  }
  .topBtnPlace {
    @include display-flex;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: -1rem;
  }
  .placeItem {
    @include disFlexC(center, center);
    width: 100%;
  }
  .topBtnBg {
    width: 4rem;
    height: 2rem;
    border-radius: 1.5rem;
    background-color: $debgCrf5;
    padding: 0.3rem;
  }
  .topBtn {
    display: block;
    width: 100%;
    box-shadow: 0 0.13rem 0 0 $mainCr, inset 0 0.2rem 0.02rem 0.02rem #fed977;
    background-color: #ffe179;
    border-radius: 1.5rem;
    height: 100%;
    text-align: center;
    line-height: 1.5rem;
    color: #fd5c22;
  }

  .myListUl {
    margin-bottom: 88px;
  }
  .myList {
    background-color: #fff;
    .myListLi {
      @include display-flex;
      .title {
        @include display-flex;
        width: 100%;
        padding: 28px 30px 28px 0;
        border-bottom: 1px solid $bdrInCre6; /*no*/
        margin-left: 43px;
      }
    }
    .listLeft {
      width: 70%;
      @include display-flex;
      @include align-items(center);
      span {
        @include sc(34px, $fontCr33);
      }
    }
    .myIcon {
      width: 44px;
      height: 44px;
      padding: 28px 0 28px 42px;
    }
    .rightIcon {
      width: 30px;
      height: 40px;
    }
    .listRight {
      text-align: right;
      width: 100%;
      @include display-flex;
      @include justify-content(flex-end);
      @include align-items(center);
      .num {
        color: $defCr29;
      }
      .title {
        text-align: right;
      }
      span {
        color: $fontCr99;
        font-size: 30px;
        margin-right: 25px;
      }
    }
  }
}

// .myListUl {
//   margin-bottom: 88px;
// }
// .myList {
//   background-color: #fff;
//   .myListLi {
//     @include display-flex;
//     .title {
//       @include display-flex;
//       width: 100%;
//       padding: 28px 30px 28px 0;
//       border-bottom: 1px solid $bdrInCre6; /*no*/
//       margin-left: 43px;
//     }
//   }
//   .listLeft {
//     width: 55%;
//     @include display-flex;
//     @include align-items(center);
//     span {
//       font-size: 34px;
//     }
//   }
//   .myIcon {
//     width: 44px;
//     height: 44px;
//     padding: 28px 0 28px 42px;
//   }
//   .rightIcon {
//     fill: #d8584a;
//     width: 30px;
//     height: 40px;
//   }
//   .listRight {
//     text-align: right;
//     width: 100%;
//     @include display-flex;
//     @include justify-content(flex-end);
//     @include align-items(center);
//     .title {
//       text-align: right;
//     }
//     span {
//       color: $fontCr99;
//       font-size: 30px;
//       margin-right: 25px;
//     }
//   }

//   .profile-info {
//     @include wh(100%, 3.1rem);
//     .profileinfopanel-upload {
//       display: block;
//       position: absolute;
//       opacity: 0;
//       top: 2.35rem;
//       left: 0;
//       @include wh(100%, 3.1rem);
//     }
//     .headportrait {
//       margin-top: 0.4rem;
//       padding: 0.5rem 0.4rem;
//       @include fj(space-between);
//       align-items: center;
//       border-top: 1px solid #ddd;
//       background: #fff;

//       h2 {
//         @include sc(0.6rem, #333);
//         font-weight: 500;
//         display: flex;
//         align-items: center;
//       }
//       .headportrait-div {
//         span {
//           display: inline-block;

//           svg {
//             @include wh(100%, 100%);
//           }
//         }
//         .headportrait-div-top {
//           @include wh(2rem, 2rem);
//           @include borderRadius(50%);
//           vertical-align: middle;
//         }
//         .headportrait-div-bottom {
//           @include wh(0.66667rem, 1.4rem);
//           position: relative;
//           top: 0.44rem;
//         }
//       }
//     }
//     .headportraitwo {
//       margin-top: 0;
//       padding: 0.3rem 0.4rem;
//       .headportrait-div {
//         @include fj(left);
//         p {
//           text-align: left;
//           line-height: 1.39rem;
//           @include sc(0.7rem, #999);
//           margin-right: 0.2rem;
//           font-weight: 100;
//           font-family: Arial;
//         }
//         .headportrait-div-bottom {
//           top: 0;
//         }
//       }
//     }
//     .headportraithree {
//       border-bottom: 1px solid #ddd;
//     }
//     .bind-phone {
//       padding: 0.4rem 0.4rem;
//       @include sc(0.5rem, #666);
//     }
//     .exitlogin {
//       width: 96%;
//       margin: 1.3rem auto 0;
//       line-height: 1.5rem;
//       @include borderRadius(5px);
//       text-align: center;
//       background: #d8584a;
//       @include sc(0.6rem, #fff);
//     }
//     .exitlogin:active {
//       opacity: 0.8;
//       background: #c1c1c1;
//     }
//   }

//   .info-router {
//     display: block;
//   }
// }
</style>
