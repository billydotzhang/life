// import Vue from 'vue'
import routes from './router/router'
// import VueRouter from 'vue-router'
import store from './store/'
import {
  routerMode
} from './config/env'
// import FastClick from 'fastclick'
import 'lib-flexible'
import './svg/iconfont'

// import VueLazyload from 'vue-lazyload'
import {
  InfiniteScroll
} from 'mint-ui';

import {
  CellSwipe
} from 'mint-ui';

import 'mint-ui/lib/style.css'

// Vue.use(VueRouter)
// Vue.use(VueLazyload)
Vue.use(InfiniteScroll)
Vue.component(CellSwipe.name, CellSwipe);

// import mine from './assets/js/mine'
// Vue.prototype.$mine = mine

if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body);
  }, false);
}





const router = new VueRouter({
  routes,
  mode: routerMode,
  // strict: process.env.NODE_ENV !== 'production',
  // scrollBehavior (to, from, savedPosition) {
  //     if (savedPosition) {
  //         return savedPosition
  //     } else {
  //         if (from.meta.keepAlive) {
  //             from.meta.savedPosition = document.body.scrollTop;
  //         }
  //         return { x: 0, y: to.meta.savedPosition || 0 }
  //     }
  // }
})

new Vue({
  router,
  store,
}).$mount('#app')
