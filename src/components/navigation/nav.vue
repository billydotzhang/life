<template>
  <keep-alive>
    <nav class="navBottom">
      <router-link class="navItem" to="/activity" tag="li" exact>
        <i class="home"></i>
        <span>首页</span>
      </router-link>
      <section class="navItem" @click="construction">
        <i class="discount"></i>
        <span>超值</span>
      </section>
      <router-link class="navItem" to="/profile" exact>
        <i class="mine"></i>
        <span>我的</span>
      </router-link>
      <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText" tipTitle="" :btnText="btnText" iconTrue="true"></alert-tip>
    </nav>
  </keep-alive>
</template>

<script>
import alertTip from "@/components/common/alertTip";

export default {
  data() {
    return {
      showAlert: false,
      alertText: null
    };
  },
  methods: {
    closeTip() {
      this.showAlert = false;
    },
    construction() {
      this.showAlert = true;
      this.alertText = "暂未开放";
      this.btnText = "我知道了";
    }
  },
  components: {
    alertTip
  }
};
</script>

<style lang="scss" scoped>
@import "../../style/common";
.navBottom {
  @include display-flex;
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: $debgCrFF;
  padding: 13px 0;
  border-top: 1px solid $bdrInCre6;
  .navItem {
    width: 100%;
    text-align: center;
    span {
      font-size: 18px; /*px*/
      color: #8f8f8f;
    }
    i {
      width: 44px;
      height: 44px;
      display: block;
      margin: auto;
    }
  }
  .router-link-active {
    .activity {
      background-image: url("~@/assets/icon/activityed.png");
      background-size: 100% 100%;
    }
    .home {
      background-image: url("~@/assets/icon/homed.png");
      background-size: 100% 100%;
    }
    .mine {
      background-image: url("~@/assets/icon/mined.png");
      background-size: 100% 100%;
    }
    .discount {
      background-image: url("~@/assets/icon/discounted.png");
      background-size: 100% 100%;
    }
  }
  .activity {
    background-image: url("~@/assets/icon/activity.png");
    background-size: 100% 100%;
  }
  .home {
    background-image: url("~@/assets/icon/home.png");
    background-size: 100% 100%;
  }
  .mine {
    background-image: url("~@/assets/icon/mine.png");
    background-size: 100% 100%;
  }
  .discount {
    background-image: url("~@/assets/icon/discount.png");
    background-size: 100% 100%;
  }
}
</style>
