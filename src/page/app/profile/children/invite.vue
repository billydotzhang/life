<template>
  <div>
    <div class="invite">
      <div class="inviteTop">
        <div>
          <div class="codeInvite">
          </div>
          <div class="inviteSlogan">
            <p>邀请好友一起来</p>
            <p>赚好友币享生活</p>
          </div>
          <div class="inviteBtn" @click="markCode">
            邀请好友
          </div>
        </div>
      </div>
      <div class="inviteNum">
        <div class="numberOfPeople">
          <p>好友注册人数</p>
          <span>{{inviteNum}}</span>
        </div>
      </div>
      <div class="inviteList" v-if=" inviteNum !== 0 ">
        <ul class="inviteUl">
          <li class="inviteLi">
            <div class="inviteDef">
              好友注册账号
            </div>
          </li>
          <li class="inviteLi" v-for="(item) in inviteList" :key="item.phone_num">
            <div class="inviteDef">
              {{item.phone_num}}
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="inviteCodeBg cover-content  cover-animate" v-show="showInviteCodeJpg">
      <canvas id="myCanvas" width="300" height="300" style="display: none;">
        Your browser does not support the HTML5 canvas tag.
      </canvas>
      <img class="pngCode" :src='pngCanvas' alt="邀请码" v-cloak>
      <div class="inCodeText">
        <p>1.发送截图至好友/群组/朋友圈</p>
        <p>2.成功推荐注册即可获得邀请奖励</p>
      </div>
      <div class="closeInvite" @click="hideCode"></div>
      <img id="inCodeShare" :src="inviteCodeJpg" alt="邀请好友二维码" style="display: none">
      <img id="inCodeBg" src="~@/assets/user/codeBg.png" alt="邀请好友二维码" style="display: none" />
      <img id="inCodeLog" src="~@/assets/user/codeLog.png" alt="邀请好友二维码" style="display: none" />
    </div>
    <div class="cover-background" v-show="showInviteCodeJpg"></div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
import headTop from "@/components/header/head";
import loading from "@/components/common/loading";
import { invited, getPhone } from "@/service/getData";
import { getStore, setStore } from "@/config/mUtils";
import crypto from "crypto";

export default {
  data() {
    return {
      showLoading: true,
      phone_num: 0,
      inviteNum: 0,
      inviteCodeJpg: null,
      showInviteCodeJpg: false,
      pngCanvas: null,
      inviteList: [],
      OutTimer: 0,
      listData: {
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

    if (!this.listData.tkn) {
      window.location.href = "hyblife://action/login";
      const _this = this;
      this.OutTimer = setTimeout(function() {
        _this.$router.push({ path: "/appProfile" });
        clearTimeout(this.OutTimer);
      });
    }

    this.getPhone();
    const _this = this;
    this.OutTimer = setTimeout(function() {
      _this.markCode();
      clearTimeout(_this.OutTimer);
    }, 500);
  },
  methods: {
    //开发环境与编译环境loading隐藏方式不同
    hideLoading() {
      this.showLoading = false;
    },
    showCode() {
      this.showInviteCodeJpg = true;
    },
    hideCode() {
      this.showInviteCodeJpg = false;
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
    InviteCode(phone) {
      const inviteUrl =
        window.location.origin +
        "/" +
        window.location.pathname.split("/")[1] +
        "/index.html%23/codeRegister/" +
        phone;
      this.inviteCodeJpg =
        "php/api/QRcode.php?size=4.3&magin=2&url=" + inviteUrl;
    },
    async getPhone() {
      this.appSafe();
      await invited(this.listData).then(res => {
        this.inviteList = res.list;
        this.inviteNum = res.count;
        this.InviteCode(res.mobile);
        this.hideLoading();
      });
    },
    markCode() {
      //canvas生成二维图片
      const canvas = document.getElementById("myCanvas");
      const context = canvas.getContext("2d");
      const imgBg = document.getElementById("inCodeBg");
      const imgCod = document.getElementById("inCodeShare");
      const imgLog = document.getElementById("inCodeLog");
      context.drawImage(imgBg, 0, 0, 300, 300);
      context.drawImage(imgCod, 50, 50, 200, 200);
      context.drawImage(imgLog, 130, 130, 40, 40);
      this.markPngCode(canvas);
      this.showCode();
    },
    //转换成PNG -- 不能跨域访问 -- 只能线上测试
    markPngCode(code) {
      let pngCanvas = new Image();
      pngCanvas.setAttribute("crossOrigin", "anonymous");
      this.pngCanvas = code.toDataURL("image/png");
    }
  },
  components: {
    loading
  }
};
</script>

<style lang="scss" scoped>
@import "~@/style/common.scss";

.invite {
  height: 100%;
}
.inviteTop {
  @include fj(center);
  text-align: center;
  background-color: $defCrFF;
}
.codeInvite {
  margin-top: 41px;
  background: url("~@/assets/user/icon-yhy.png") no-repeat;
  background-size: 100%;
  width: 307px;
  height: 307px;
}
.inviteSlogan {
  margin-top: 34px;
  p {
    font-family: "PingFang-SC";
    font-size: 42px;
    font-weight: 500;
  }
}
.inviteBtn {
  @include wh(300px, 90px);
  @include sc(34px, $defFtCrFF);
  line-height: 90px;
  background-color: $mainCr;
  border-radius: 20px;
  margin: 29px 0 38px;
  box-shadow: 5px 5px 2px 2px #ccc; /*no*/
}
.inviteNum {
  @include disFlexC(center, center);
  padding: 30px;
  .numberOfPeople {
    padding: 42px 0;
    background-color: $defCrFF;
    width: 100%;
    border: 0.03rem dashed #b4b4b4;
    p {
      text-align: center;
      font-size: 30px;
    }
    span {
      @include sc(38px, $mainCr);
      display: block;
      text-align: center;
      font-family: "PingFang-SC";
      font-weight: 500;
    }
  }
}
.inviteList {
  padding: 0 30px 30px 30px;
}
.inviteUl {
  background-color: $defCrFF;
  display: block;
  padding: 20px;
  li:first-child {
    padding: 10px 0;
    .inviteDef {
      @include sc(28px, $fontCr66);
    }
  }
  li:nth-child(odd) {
    background-color: #fff;
  }
  li:nth-child(even) {
    background-color: #f0f0f0;
  }
}
.inviteLi {
  @include display-flex;
  .inviteDef {
    @include sc(28px, $fontCr33);
    width: 100%;
    text-align: center;
    padding: 19px 0;
  }
}
.inviteCodeBg {
  position: fixed;
  top: 43%;
  left: 50%;
  width: 600px;
  margin-top: -300px;
  margin-left: -300px;
  z-index: 101;
  .pngCode {
    width: 600px;
    display: block;
    border-radius: 15px 15px 0 0;
  }
  .inCodeText {
    background-color: $defCrFF;
    padding: 50px;
    border-radius: 0 0 15px 15px;
    p {
      font-size: 28px;
    }
  }
  .closeInvite {
    @include wh(70px, 70px);
    position: absolute;
    background: url("~@/assets/user/close.png") no-repeat;
    @include background-size(100%);
    left: 50%;
    margin-left: -35px;
    bottom: -100px;
  }
}
</style>
