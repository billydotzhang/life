import {
  RECORD_USERINFO,
  GET_USERINFO,
  OUT_LOGIN,
  PAYMENT_INFO,
  BANK_INFO
} from './mutation-types'

import {
  setStore,
  getStore
} from "../config/mUtils";

export default {
  // 记录用户信息
  [RECORD_USERINFO](state, info) {
    state.userInfo = info;
    state.login = true;
    setStore('user_id', info.user_id);
    setStore('user_mobile', info.mobile);
    setStore('user_invited', info.invite);
    setStore('user_realName', info.realName);
  },
  //获取用户信息存入vuex
  [GET_USERINFO](state, info) {
    if (!info.message) {
      state.userInfo = { ...info
      };
    } else {
      state.userInfo = null;
    }
  },
  //退出登录
  [OUT_LOGIN](state) {
    state.userInfo = {};
    state.login = false;
  },


}
