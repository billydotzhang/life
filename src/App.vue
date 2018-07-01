<template>
  <div class="container">
    <transition :name="transitionName">
      <router-view class="child-view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      transitionName: "slide-right"
    };
  },
  watch: {
    $route(to, from) {
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss">
@import "~@/style/common";
#app {
  width: 100%;
  height: 100%;
}

.container {
  width: 100%;
  height: 100%;
}

/* 上面是为了保证滑动的时候不出现抖动情况 */
.child-view {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
  background-color: #f2f2f2;
}

/* 当child-view的内容过多时会撑开child-view使得内部能够滚动 */
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(100%, 0);
  transform: translate(100%, 0);
  transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  -webkit-transform: translate(-100%, 0);
  transform: translate(-100%, 0);
  transition-delay: 0.5s;
  -webkit-transition-delay: 0.5s;
}

.slide-enter-active {
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
}

.slide-leave-active {
  -webkit-transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
</style>
