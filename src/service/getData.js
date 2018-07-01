import fetch from '../config/fetch'

import {
  baseURL
} from "../config/Ipconfig";

export const keepLoginURL = baseURL.ip2 + 'user.php?act=check_login'
export const check_loginsURL = baseURL.ip2 + 'user.php?act=islogin'
export const accountLoginURL = baseURL.ip2 + 'user.php?act=login'
export const phoneLoginURL = baseURL.ip2 + 'user.php?act=code_login'
export const postRegisterURL = baseURL.ip2 + 'user.php?act=register'
export const getCodeURL = baseURL.ip2 + 'user.php?act=check_code'
export const getCodesURL = baseURL.ip2 + 'user.php?act=check_codes '
export const getUserURL = baseURL.ip2 + 'user.php?act=default'
export const userSignURL = baseURL.ip2 + 'user.php?act=user_sign'
export const loginOutURL = baseURL.ip2 + 'user.php?act=logout'
export const postPayPwdURL = baseURL.ip2 + 'user.php?act=change_pay'
export const forgetPwdURL = baseURL.ip2 + 'user.php?act=forgetpwd'
export const realNameURL = baseURL.ip2 + 'user.php?act=realName'
export const cheakNameURL = baseURL.ip2 + 'user.php?act=checkReal'
export const getGoldURL = baseURL.ip2 + 'user.php?act=gold'
export const ftPayPwdURL = baseURL.ip2 + 'user.php?act=first_pay_pwd'
export const getPhoneURL = baseURL.ip2 + 'user.php?act=get_mobile'
export const rechargeURL = baseURL.ip2 + 'user.php?act=recharge'
export const invitedURL = baseURL.ip2 + 'user.php?act=invite'
export const goldPageURL = baseURL.ip2 + 'user.php?act=gold'
export const wechatURL = baseURL.ip2 + 'user.php?act=wx_login'
export const wxBindPhoneURL = baseURL.ip2 + 'user.php?act=test_login'
export const H5PayURL = baseURL.ip2 + 'user.php?act=recharges'
export const wxPubPayURL = baseURL.ip2 + 'wxpay/example/jsapi.php'
export const aliWxPayURL = baseURL.ip2 + 'user.php?act=middle_change'
export const aliWxPayGoURL = baseURL.ip2 + 'user.php?act=recharge_change'
export const rechargeNoteURL = baseURL.ip2 + 'user.php?act=recharge_note'
export const recNoteDetailURL = baseURL.ip2 + 'user.php?act=recharge_note_detail'
export const clearFailRecURL = baseURL.ip2 + 'user.php?act=recharge_fail'
export const loginUserURL = baseURL.ip2 + 'user.php?act=login_name'
export const payRealNameURL = baseURL.ip2 + 'user.php?act=realnames'
export const withDrawURL = baseURL.ip2 + 'user.php?act=withdraw'
export const withdrawAccURL = baseURL.ip2 + 'user.php?act=withdraw_acc'
export const withDrawNoteURL = baseURL.ip2 + 'user.php?act=withdraw_note'
export const withdrawDetailURL = baseURL.ip2 + 'user.php?act=withdraw_detail'
export const withdraw_cnameURL = baseURL.ip2 + 'user.php?act=withdraw_cname'
export const withdraw_hlURL = baseURL.ip2 + 'user.php?act=withdraw_hl'
export const myActivityURL = baseURL.ip2 + 'user.php?act=activity_list'
export const myActDetailURL = baseURL.ip2 + 'user.php?act=activity_detail'
export const integralURL = baseURL.ip2 + 'user.php?act=lx_hyb'
export const addInviteURL = baseURL.ip2 + 'user.php?act=add_invite'
export const rewardURL = baseURL.ip2 + 'user.php?act=reward'
export const bankCardListURL = baseURL.ip2 + 'user.php?act=bankcard_lists'
export const bindBankURL = baseURL.ip2 + 'user.php?act=bind_bank'
export const tipsURL = baseURL.ip2 + 'user.php?act=integral'
export const ifFirstURL = baseURL.ip2 + 'user.php?act=isfirst'


export const activityListURL = baseURL.ip1 + 'api.php/Activity/activityList'
export const activityDetailURL = baseURL.ip1 + 'api.php/Activity/activityDetail'
export const reservationsURL = baseURL.ip1 + 'api.php/Activity/reservations'
export const handleOrderURL = baseURL.ip1 + 'api.php/Activity/handleOrder'


/**
 * 保持登录状态
 */

export function keepLogin(query) {
  return fetch({
    url: keepLoginURL,
    method: 'POST',
    params: query
  })
}

/**
 * APP保持登录状态
 */

export function check_logins(query) {
  return fetch({
    url: check_loginsURL,
    method: 'POST',
    params: query
  })
}



/**
 * 账号密码登录
 */

export function accountLogin(query) {
  return fetch({
    url: accountLoginURL,
    method: 'POST',
    params: query
  })
}

/**
 * 账号密码登录
 */

export function phoneLogin(query) {
  return fetch({
    url: phoneLoginURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取注册验证码
 */

export function postRegister(query) {
  return fetch({
    url: postRegisterURL,
    method: 'POST',
    params: query
  })
}


/**
 * 获取注册验证码
 */

export function getCode(query) {
  return fetch({
    url: getCodeURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取注册验证码
 */

export function getCodes(query) {
  return fetch({
    url: getCodesURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取用户信息
 */

export function getUser(query) {
  return fetch({
    url: getUserURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取注册验证码
 */

export function userSign(query) {
  return fetch({
    url: userSignURL,
    method: 'POST',
    params: query
  })
}

/**
 *  注销
 */

export function loginOut(query) {
  return fetch({
    url: loginOutURL,
    method: 'POST',
    params: query
  })
}

/**
 *  修改密码
 */

export function postPayPwd(query) {
  return fetch({
    url: postPayPwdURL,
    method: 'POST',
    params: query
  })
}

/**
 *  忘记密码
 */

export function forgetPwd(query) {
  return fetch({
    url: forgetPwdURL,
    method: 'POST',
    params: query
  })
}

/**
 * 提交实名
 */

export function realName(query) {
  return fetch({
    url: realNameURL,
    method: 'POST',
    params: query
  })
}

/**
 * 确认实名
 */

export function cheakName(query) {
  return fetch({
    url: cheakNameURL,
    method: 'POST',
    params: query
  })
}

/**
 * 我的好友币
 */

export function getGold(query) {
  return fetch({
    url: getGoldURL,
    method: 'POST',
    params: query
  })
}

/**
 * 首次设置支付密码设置
 */

export function ftPayPwd(query) {
  return fetch({
    url: ftPayPwdURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取手机号
 */

export function getPhone(query) {
  return fetch({
    url: getPhoneURL,
    method: 'POST',
    params: query
  })
}

/**
 * 充值连登
 */

export function recharge(query) {
  return fetch({
    url: rechargeURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取邀请
 */

export function invited(query) {
  return fetch({
    url: invitedURL,
    method: 'POST',
    params: query
  })
}

/**
 * 获取第一页
 */

export function goldPage(query) {
  return fetch({
    url: goldPageURL,
    method: 'POST',
    params: query
  })
}


/**
 * 微信登录
 */

export function wechat(query) {
  return fetch({
    url: wechatURL,
    method: 'POST',
    params: query
  })
}

/**
 * 微信登录绑定手机号
 */

export function wxBindPhone(query) {
  return fetch({
    url: wxBindPhoneURL,
    method: 'POST',
    params: query
  })
}

/**
 * H5支付
 */

export function H5Pay(query) {
  return fetch({
    url: H5PayURL,
    method: 'POST',
    params: query
  })
}


/**
 * 微信公众号
 */

export function wxPubPay(query) {
  return fetch({
    url: wxPubPayURL,
    method: 'POST',
    params: query
  })
}

/**
 * 微信支付宝支付中转
 */

export function aliWxPay(query) {
  return fetch({
    url: aliWxPayURL,
    method: 'POST',
    params: query
  })
}

/**
 * 微信支付宝支付
 */

export function aliWxPayGo(query) {
  return fetch({
    url: aliWxPayGoURL,
    method: 'POST',
    params: query
  })
}

/**
 * 充值记录
 */

export function rechargeNote(query) {
  return fetch({
    url: rechargeNoteURL,
    method: 'POST',
    params: query
  })
}


/**
 * 充值详情
 */

export function recNoteDetail(query) {
  return fetch({
    url: recNoteDetailURL,
    method: 'POST',
    params: query
  })
}

/**
 * 清理充值记录
 */

export function clearFailRec(query) {
  return fetch({
    url: clearFailRecURL,
    method: 'POST',
    params: query
  })
}

/**
 * 用户名
 */

export function loginUser(query) {
  return fetch({
    url: loginUserURL,
    method: 'POST',
    params: query
  })
}

/**
 * 充值实名
 */

export function payRealName(query) {
  return fetch({
    url: payRealNameURL,
    method: 'POST',
    params: query
  })
}

/**
 * 好友币提现
 */

export function withDraw(query) {
  return fetch({
    url: withDrawURL,
    method: 'POST',
    params: query
  })
}

/**
 * 好友币提现历史账户
 */

export function withdrawAcc(query) {
  return fetch({
    url: withdrawAccURL,
    method: 'POST',
    params: query
  })
}

/**
 * 好友币提现记录
 */

export function withDrawNote(query) {
  return fetch({
    url: withDrawNoteURL,
    method: 'POST',
    params: query
  })
}

/**
 * 好友币提现记录详情
 */

export function withdrawDetail(query) {
  return fetch({
    url: withdrawDetailURL,
    method: 'POST',
    params: query
  })
}

/**
 * 好友币费率接口
 */

export function withdraw_hl(query) {
  return fetch({
    url: withdraw_hlURL,
    method: 'POST',
    params: query
  })
}

/**
 * 银行信息不匹配
 */

export function withdraw_cname(query) {
  return fetch({
    url: withdraw_cnameURL,
    method: 'POST',
    params: query
  })
}


/**
 * 精彩活动列表
 */

export function activityList(query) {
  return fetch({
    url: activityListURL,
    method: 'POST',
    params: query
  })
}

/**
 * 精彩活动详情
 */

export function activityDetail(query) {
  return fetch({
    url: activityDetailURL,
    method: 'POST',
    params: query
  })
}

/**
 * 精彩活动详情
 */

export function reservations(query) {
  return fetch({
    url: reservationsURL,
    method: 'POST',
    params: query
  })
}

/**
 * 报名活动
 */

export function handleOrder(query) {
  return fetch({
    url: handleOrderURL,
    method: 'POST',
    params: query
  })
}

/**
 * 个人中心活动详情
 */

export function myActivity(query) {
  return fetch({
    url: myActivityURL,
    method: 'POST',
    params: query
  })
}

/**
 * 个人中心活动详情
 */

export function myActDetail(query) {
  return fetch({
    url: myActDetailURL,
    method: 'POST',
    params: query
  })
}

/**
 * 积分奖励
 */

export function myPoints(query) {
  return fetch({
    url: rewardURL,
    method: 'POST',
    params: query
  })
}

/**
 * 积分奖励
 */

export function addInvite(query) {
  return fetch({
    url: addInviteURL,
    method: 'POST',
    params: query
  })
}

/**
 * 银行卡列表
 */

export function bankCardList(query) {
  return fetch({
    url: bankCardListURL,
    method: 'POST',
    params: query
  })
}

/**
 * 绑定银行卡
 */

export function bindBank(query) {
  return fetch({
    url: bindBankURL,
    method: 'POST',
    params: query
  })
}

/**
 * 是否新用户
 */

export function ifFirst(query) {
  return fetch({
    url: ifFirstURL,
    method: 'POST',
    params: query
  })
}

/*积分奖励提示*/
export function tips(query) {
  return fetch({
    url: tipsURL,
    method: 'POST',
    params: query
  })
}
