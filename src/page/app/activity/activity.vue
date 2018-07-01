<template>
  <div>
    <div class="activity">
      <div class="actList" ref="wrapper" :style="{height:displayWindow +'px'}" v-if="!actItem.length == 0">
        <ul>
          <li class="actItems" @click="goDetail(items.active_id)" v-for="items in actItem" :key="items.active_id">
            <div class="actImg">
              <img v-lazy="items.active_thum">
              <span>{{items.active_zi}}</span>
              <label v-if="items.active_hot == '1'">
                <b>HOT</b>
              </label>
            </div>
            <div class="actTxt">
              <h1>{{items.active_introduce}}</h1>
              <div class="actTxt_time">
                <span>{{items.active_order}}</span>
                <label>
                  <iconSvg icon-style="iconfont" icon-class='eyes'></iconSvg>{{viewNumber(items.active_click)}}</label>
              </div>
            </div>
          </li>
        </ul>
        <!-- <p v-show="loading" class="page-infinite-loading">
					<mt-spinner type="fading-circle"></mt-spinner>
					加载中...
				</p> -->
      </div>
      <div class="actList" ref="wrapper" :style="{height:displayWindow +'px'}" v-else>
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

    <!-- <navBottom></navBottom> -->
  </div>
</template>

<script>
import headTop from "@/components/header/head";
import navBottom from "@/components/navigation/nav";
import iconSvg from "@/components/common/icon";
import { activityList } from "@/service/getData";
import { getStore, setStore } from "@/config/mUtils";

export default {
  data() {
    return {
      headTitle: "首页",
      actItem: [],
      displayWindow: 0,
      loading: false,
      allLoaded: false
    };
  },
  components: {
    headTop,
    navBottom,
    iconSvg
  },
  mounted() {
    if (this.$route.meta.app && Boolean(this.$route.query.home)) {
      this.listData.tkn = this.$route.query.tkn;
      setStore("uid", this.$route.query.tkn);
      if (!this.listData.tkn) {
        window.location.href = "hyblife://action/login";
        localStorage.clear();
      }
    }

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

    activityList(this.listData).then(res => {
      if (res.result) {
        this.actItem = res.data;
      }
    });
  },
  methods: {
    viewNumber(num) {
      if (num < 1000) {
        return num;
      } else if (num >= 1000) {
        return Math.round(num / 1000) + "K";
      }
    },
    goDetail(i) {
      this.$router.push({
        path: "/appActivity/appActDetail",
        query: { id: i }
      });
    }
    // loadMore() {
    //   this.loading = true;
    //   setTimeout(() => {
    //     let last = this.actItem[this.actItem.length - 1];
    //     for (let i = 1; i <= 10; i++) {
    //       this.actItem.push(last + i);
    //     }
    //     this.loading = false;
    //   }, 2500);
    // }
  },
  watch: {
    displayWindow: function(val) {
      this.displayWindow = val;
    }
  }
};
</script>

<style lang="scss" type="text/scss" scoped>
@import "~@/style/mixin";

.activity {
  background-color: $debgCrFF;
  .actList {
    @include overflow;
    padding: 0 30px;
  }
  .actItems {
    margin-top: 30px;
    @include clearFloat;
    border-bottom: dashed 1px $defCrCC;
  }
  .actImg {
    height: 240px;
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 11px 13px 0 rgba(226, 226, 227, 0.88);
    img {
      width: 100%;
      height: 240px;
    }
    span {
      position: absolute;
      top: 0;
      left: 0;
      width: 120px;
      height: 48px;
      line-height: 48px;
      text-align: center;
      @include sc(24px, $defCrFF);
      background-color: rgba(0, 0, 0, 0.6);
      border-bottom-right-radius: 20px;
    }
    label {
      position: absolute;
      top: 0;
      right: 0;
      z-index: 2;
      &:before {
        content: "";
        width: 0;
        height: 0;
        border-top: 83px solid $mainCr;
        border-left: 86px solid transparent;
        position: absolute;
        top: 0;
        right: 0;
        z-index: -1;
      }
      b {
        position: absolute;
        right: 0;
        top: 0;
        display: inline-block;
        text-align: center;
        font-weight: 500;
        line-height: 41.5px;
        @include sc(22px, $defCrFF);
        width: 83px;
        height: 83px;
        @include xuanzhuan(45);
      }
    }
  }
  .actTxt {
    h1 {
      @include sc(32px, $fontCr33);
      font-weight: 500;
      margin: 31px 0 19px;
    }
  }
  .actTxt_time {
    margin-bottom: 32px;
    @include clearFloat;
    span {
      float: left;
    }
    label {
      float: right;
      min-width: 100px;
    }
    span,
    label {
      @include sc(26px, $fontCr99);
    }
    .iconfont {
      width: 28px;
      height: 35px;
      fill: $fontCr8f;
      overflow: hidden;
      vertical-align: top;
      margin-right: 10px;
    }
  }
}
</style>
