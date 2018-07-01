<template>
  <div class="alet_container">
    <section class="tip_Bgc"></section>
    <section class="tip_text_container">
      <div class="tip_title" v-if="tipTitle">{{tipTitle}}</div>
      <div class="tip_icon" v-if="iconTrue">
        <span></span>
        <span></span>
      </div>
      <p class="tip_text" :class="textClass">
        <span v-if="alertText">{{alertText}}</span>
        <span v-html="alertHtml" v-else></span>
      </p>
      <div class="sa-botton" v-if="rightBtn">
        <button class="waiting" @click="waitingThings">再等等</button>
        <div style="display:inline-block;">
          <button class="quitlogin" @click="outLogins">{{rightBtn}}</button>
        </div>
      </div>
      <div class="confrim" :class="btnClass" @click="closeTips" v-if="btnText&&!rightBtn">{{btnText}}</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      positionY: 0,
      timer: null
    };
  },
  /*props: [
    "alertText",
    "btnText",
    "btnClass",
    "iconTrue",
    "textClass",
    "tipTitle",
    "waitingThing",
    "outLogin",
    "rightBtn",
    "alertHtml"
  ],*/
  props: {
    alertText: {},
    btnText: {
      // 可选字段，有默认值
      default: "确定"
    },
    btnClass: {},
    iconTrue: {},
    textClass: {},
    tipTitle: {},
    waitingThing: {},
    outLogin: {},
    rightBtn: {},
    alertHtml: {}
  },
  methods: {
    closeTips() {
      this.$emit("closeTip");
    },
    outLogins() {
      this.$emit("outLogin");
    },
    waitingThings() {
      this.$emit("waitingThing");
    }
  }
};
</script>

<style lang="scss" scoped type="text/scss">
@import "../../style/mixin";
@keyframes tipMove {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
.alet_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.tip_Bgc {
  background-color: #000;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 0.2;
}
.sa-botton {
  width: 100%;
  text-align: center;
  margin-bottom: 20px;
  button {
    display: inline-block;
    padding: 5px 20px;
    @include sc(34px, $defFtCrFF);
    border-radius: 10px;
  }
  .waiting {
    background: #c1c1c1;
    margin-right: 30px;
  }
  .quitlogin {
    background: $mainCr;
  }
}
.tip_text_container {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -295px;
  margin-left: -295px;
  width: 590px;
  animation: tipMove 0.4s;
  background-color: rgba(255, 255, 255, 1);
  border: 1px; /*no*/
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  padding-top: 61px;
  .tip_icon {
    @include wh(138px, 138px);
    border: 6.9px solid $mainCr;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    span:nth-of-type(1) {
      @include wh(5.52px, 69px);
      background-color: $mainCr;
    }
    span:nth-of-type(2) {
      @include wh(9.2px, 9.2px);
      border: 1px;
      border-radius: 50%;
      margin-top: 9.2px;
      background-color: $mainCr;
    }
  }
  .tip_title {
    @include sc(40px, #333);
  }
  .tip_text {
    @include sc(30px, #626262);
    padding: 45px 61px 58px 61px;
    span {
      p {
        @include sc(30px, #626262);
      }
    }
  }
  .confrim {
    @include sc(34px, $mainCr);
    background-color: #fff;
    width: 100%;
    text-align: center;
    padding: 34px 0;
    border-top: 1px solid #e6e6e6; /*no*/
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
  }
}
</style>
