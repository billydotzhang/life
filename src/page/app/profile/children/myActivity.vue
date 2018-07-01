<template>
  <div>
    <div class="myActivity">
      <div class="myActBox" ref="wrapper" :style="{height:displayWindow + 'px'}" v-if="myActivityList">
        <ul class="actList">
          <li class="actItem" @click="goDetail(item.active_id)" v-for="item in myActivityList" :key="item.active_id">
            <section class="act_box">
              <div class="itemTop">
                <span>活动订单号：{{item.ua_order}}</span>
                <span class="num">{{item.active_status}}</span>
              </div>
              <div class="itemContent">
                <div class="contLeft"><img v-lazy="host + item.active_thum" alt="活动图片"></div>
                <div class="contRight">
                  <p>{{item.active_title}}</p>
                  <span>时间：{{item.active_time}}</span>
                  <span>地址：{{item.active_address}}</span>
                  <span>预约人数：
                    <em>{{item.active_num}}</em>（位）</span>
                </div>
              </div>
            </section>
          </li>
        </ul>
      </div>
      <div class="myActBox" ref="wrapper" :style="{height:displayWindow + 'px'}" v-else>
        <div class="noItem">
          <div class="noImg">
            <img src="~@/assets/no-item.png" alt="">
            <div class="noText">
              嘤嘤嘤..空空如也
            </div>
          </div>
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
import { myActivity, getPhone } from "@/service/getData";
import { getStore, setStore } from "@/config/mUtils";
import crypto from "crypto";

export default {
  data() {
    return {
      displayWindow: 0,
      showLoading: true,
      myActivityList: [],
      showAlert: false,
      alertText: null,
      host: null,
      listData: {
        tkn: "",
        sgns: null,
        str: null //app时间验证
      },
      OutTimer: 0
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

    this.host = window.location.origin + "/";
    this.appSafe();

    myActivity(this.listData).then(res => {
      this.hideLoading();
      if (res.result) {
        this.myActivityList = res.data;
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
    goDetail(i) {
      this.$router.push({
        path: "/appProfile/appMyActivity/appMyActDetail",
        query: { id: i }
      });
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
  },
  components: {
    loading,
    alertTip
  }
};
</script>

<style lang="scss" scoped type="text/scss">
@import "~@/style/mixin";

.myActivity {
  .myActBox {
    @include overflow;
  }
  .actItem {
    background-color: $debgCrFF;
    margin: 20px 30px;
    border-radius: 20px;
    .act_box {
      display: block;
      padding: 25px 20px;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .itemTop {
    @include display-flex;
    @include justify-content(space-between);
    border-bottom: 1px solid $bdrInCre6;
    padding-bottom: 26px;
    @include sc(22px, $fontCr66);
    span {
      color: $fontCr66;
    }
    .num {
      color: $mainCr;
    }
  }
  .itemContent {
    display: table;
    padding-top: 20px;
    font-size: $defFSze06;
    vertical-align: middle;
    p {
      margin: 10px 0 31px;
      @include sc(30px, $fontCr33);
    }
    span {
      display: block;
      @include sc(26px, $fontCr99);
      margin-bottom: 10px;
      em {
        color: $mainCr;
        font-style: normal;
      }
    }
    .contRight {
      width: 410px;
      padding-left: 27px;
      display: table-cell;
      vertical-align: middle;
    }
    .contLeft {
      width: 240px;
      margin-right: 25px;
      display: table-cell;
      vertical-align: middle;
      img {
        width: 100%;
        object-fit: cover;
      }
    }
  }
}
</style>
