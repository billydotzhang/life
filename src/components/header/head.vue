<template>
  <header class="navBox">
    <section class="navLt" v-if="goBack" @click="$router.go(-1)">
      <iconSvg icon-style="backIcon" icon-class='2fanhui'></iconSvg>
      返回
    </section>
    <section class="navLt" v-if="goBackn" @click="$router.go(goBackn)">
      <iconSvg icon-style="backIcon" icon-class='2fanhui'></iconSvg>
      返回
    </section>
    <section class="navLt" v-if="noLoginBank" @click="$router.push({path:'/activity'})">
      <iconSvg icon-style="backIcon" icon-class='2fanhui'></iconSvg>
      返回
    </section>
    <section class="navLt" v-if="leftLink" @click="$router.push({path:leftLink,query:{tkn:leftQuery,home:homeQuery,way:leftWay}})">
      <iconSvg icon-style="backIcon" icon-class='2fanhui'></iconSvg>
      返回
    </section>

    <div class="navMid" v-if="headTitle">
      <span>{{headTitle}}</span>
    </div>
    <section class="navRt" v-if="rightName||navRtIcon" @click="$router.push({path:rightLink})">
      <span v-if="navRtIcon">
        <iconSvg icon-style="setIcon" :icon-class='navRtIcon'></iconSvg>
      </span>
      <span class="rightTitle" v-if="rightName">
        {{rightName}}
      </span>
    </section>
  </header>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { keepLogin, getPhone, check_logins } from "@/service/getData";
import iconSvg from "@/components/common/icon";
import { setStore, getStore } from "@/config/mUtils";

export default {
  data() {
    return {
      OutTimer: 0,
      listData: {
        tkn: ""
      },
      res: null,
      phoneRes: null
    };
  },
  mounted() {
    if (!this.$route.meta.app) {
      //获取用户信息
      this.getUserInfo();
    }

    if (this.$route.meta.requireAuth && !this.$route.meta.app) {
      //未登录判断页面
      keepLogin().then(res => {
        if (!res.result) {
          localStorage.clear();
          const _this = this;
          this.OutTimer = setTimeout(function() {
            _this.$router.push({ path: "/login" });
            clearTimeout(_this.OutTimer);
          }, 500);
        }
      });
    }
  },
  components: {
    iconSvg
  },
  props: [
    "signinUp",
    "headTitle",
    "goBack",
    "goBackn",
    "goLogin",
    "withdraw",
    "recharged",
    "mine",
    "noLoginBank",
    "rightLink",
    "rightName",
    "navRtIcon",
    "backClass",
    "leftLink",
    "leftQuery",
    "homeQuery",
    "leftWay"
  ],
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    ...mapActions(["getUserInfo"])
  }
};
</script>

<style lang="scss" scoped type="text/scss">
@import "~@/style/mixin";

.setIcon {
  @include wh(42px, 42px);
  fill: $fontCr66;
}
.ff {
  fill: $defCrFF;
}
.backIcon {
  @include wh(35px, 42px);
  fill: $fontCr66;
  margin-right: 17px;
}
.navBox {
  background-color: $defCrFF;
  font-size: $defFSze;
  position: fixed;
  top: 0;
  width: 100%;
  line-height: $navLht;
  height: $navLht;
  .navLt {
    @include disFlexC(center, center);
    @include sc(28px, $fontCr66);
    height: 88px;
    position: absolute;
    left: 30px;
    top: 0;
  }
  .navMid {
    width: 100%;
    text-align: center;
    @include disFlexC(center, center);
    span {
      width: 50%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .navRt {
    @include disFlexC(center, center);
    position: absolute;
    right: 32px;
    top: 0;
    height: 88px;
    span {
      display: block;
      height: 42px;
      line-height: 42px;
    }
    .rightTitle {
      @include sc(28px, $fontCr66);
    }
  }
}
.myNavBox {
  background-color: $mainCr;
  border-bottom: none;
  .navMid {
    span {
      color: $defFtCrFF;
    }
  }
  .navLt {
    color: $defFtCrFF;
    .backIcon {
      fill: $defFtCrFF;
    }
  }
}
</style>
