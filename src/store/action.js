import {
  getUser
} from "../service/getData";

import {
  GET_USERINFO
} from './mutation-types'
import {
  getStore,
  setStore
} from "@/config/mUtils";

export default {
  async getUserInfo({
    commit,
    state
  }) {
    const id = {};
    id.user_id = getStore('user_id');
    id.mobile = getStore('user_mobile');
    const res = await getUser(id);
    commit(GET_USERINFO, res)
  }
}
