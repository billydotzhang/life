webpackJsonp([3],{"5sLQ":function(t,s,i){"use strict";var a={data:function(){return{showAlert:!1,alertText:null}},methods:{closeTip:function(){this.showAlert=!1},construction:function(){this.showAlert=!0,this.alertText="暂未开放",this.btnText="我知道了"}},components:{alertTip:i("Uoa1").a}},e={render:function(){var t=this.$createElement,s=this._self._c||t;return s("keep-alive",[s("nav",{staticClass:"navBottom"},[s("router-link",{staticClass:"navItem",attrs:{to:"/activity",tag:"li",exact:""}},[s("i",{staticClass:"home"}),this._v(" "),s("span",[this._v("首页")])]),this._v(" "),s("section",{staticClass:"navItem",on:{click:this.construction}},[s("i",{staticClass:"discount"}),this._v(" "),s("span",[this._v("超值")])]),this._v(" "),s("router-link",{staticClass:"navItem",attrs:{to:"/profile",exact:""}},[s("i",{staticClass:"mine"}),this._v(" "),s("span",[this._v("我的")])]),this._v(" "),this.showAlert?s("alert-tip",{attrs:{showHide:this.showAlert,alertText:this.alertText,tipTitle:"",btnText:this.btnText,iconTrue:"true"},on:{closeTip:this.closeTip}}):this._e()],1)])},staticRenderFns:[]},n=i("VU/8")(a,e,!1,function(t){i("QtNP")},"data-v-428d7782",null);s.a=n.exports},HzB8:function(t,s,i){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=i("Dd8w"),e=i.n(a),n=i("ra3+"),o=i("5sLQ"),c=i("s9Vi"),l=i("44dg"),r=i("NYxO"),v=i("yclV"),u=i("i84Q"),d=i("VI/i"),h=i.n(d),p={data:function(){return{username:"未登录",balance:0,addBalance:0,cardNumber:null,invite:null,realname:null,userphone:null,imgUrl:null,checkInfo:null,showLoading:!0,payState:null,activity:null,displayWindow:0,user_name:null,error:null,listData:{tkn:"",sgns:null,str:null}}},mounted:function(){var t=this;this.$route.meta.app&&Boolean(this.$route.query.tkn)?(this.phoneRes=this.$route.query.tkn,Object(v.b)("uid",this.$route.query.tkn),this.appSafe(),Object(u.i)(this.listData).then(function(t){t.result&&(Object(v.b)("user_mobile",t.phone),Object(v.b)("user_id",t.id),Object(v.b)("user_invited",t.invited),Object(v.b)("user_realName",t.realname),Object(v.b)("user_gold",t.gold))})):localStorage.clear(),this.listData.tkn=Object(v.a)("uid"),window.location.href="hyblife://action/show",this.displayWindow=document.documentElement.clientHeight-this.$refs.wrapper.getBoundingClientRect().top,window.onresize=function(){t.displayWindow=document.documentElement.clientHeight-t.$refs.wrapper.getBoundingClientRect().top},this.hideLoading(),this.$route.query.tkn&&(this.appSafe(),Object(u.j)(this.listData).then(function(s){t.username=s.top.user_name,t.realname=s.top.realname,t.userphone=s.top.userphone,t.cardNumber=s.top.card_number,t.balance=s.gold,t.addBalance=s.amount,t.imgUrl=s.top.headimgurl,t.checkInfo=s.checkInfo,t.invite=s.invite,t.payState=s.pay,t.activity=s.active}),Object(u.f)().then())},components:{headTop:n.a,loading:l.a,navBottom:o.a,iconSvg:c.a},computed:e()({},Object(r.c)(["userInfo"])),methods:{hideLoading:function(){this.showLoading=!1},goNext:function(t){this.$router.push(t)},appSafe:function(){this.listData.str=(new Date).getTime(),this.listData.sgns=this.doSing("str="+this.listData.str+"&client=iojd781585&keys=iolibc")},doSing:function(t){var s=h.a.createHash("md5");s.update(t);return s.digest("hex")}},watch:{displayWindow:function(t){this.displayWindow=t}}},m={render:function(){var t=this,s=t.$createElement,i=t._self._c||s;return i("div",{staticClass:"restContainer"},[i("head-top",{directives:[{name:"show",rawName:"v-show",value:!1,expression:"false"}],attrs:{"head-title":"我的",navRtIcon:"shezhi",rightName:"",rightLink:"/profile/setPwd"}}),t._v(" "),i("div",{staticClass:"myCenter"},[i("div",{ref:"wrapper",staticStyle:{overflow:"scroll"},style:{height:t.displayWindow+"px"}},[i("div",{staticClass:"myTopBox"},[""!==this.username&&"未登录"!==this.username?i("div",{staticClass:"myCard",on:{click:function(s){t.goNext("/appProfile/appMyGold")}}},[i("div",{staticClass:"cardLeft"},[t.imgUrl?i("div",{staticClass:"topImg",style:{backgroundImage:"url('"+t.imgUrl+"')"}},[i("span",[t._v("Lv.1")])]):i("div",{staticClass:"topImg"},[i("iconSvg",{attrs:{"icon-style":"iconfont","icon-class":"tou"}}),t._v(" "),i("span",[t._v("Lv.1")])],1)]),t._v(" "),i("div",{staticClass:"cardRight"},[t.realname?i("div",{staticClass:"topName"},[t._v("\n                "+t._s(t.realname)+"\n              ")]):t.userphone?i("div",{staticClass:"topName"},[t._v("\n                "+t._s(t.userphone)+"\n              ")]):i("div",{staticClass:"topName"},[t._v("\n                "+t._s(t.user_name)+"\n              ")]),t._v(" "),i("div",{staticClass:"topCoin"},[i("span",[t._v("好友币：")]),t._v("\n                "+t._s(t.balance)+"\n              ")]),t._v(" "),t.cardNumber?i("div",{staticClass:"cardId"},[t._v("\n                会员卡号："+t._s(t.cardNumber)+"\n              ")]):i("div",{staticClass:"cardId"},[t._v("\n                会员卡号：请至门店获取实体卡\n              ")]),t._v(" "),i("div",{staticClass:"topGoNext"},[i("iconSvg",{attrs:{"icon-style":"topIconRight","icon-class":"shuangjiantouyou"}})],1)])]):i("div",{staticClass:"myCard"},[i("div",{staticClass:"cardLeft"},[t.imgUrl?i("div",{staticClass:"topImg",style:{backgroundImage:"url('"+t.imgUrl+"')"}},[i("span",[t._v("Lv.1")])]):i("div",{staticClass:"topImg"},[i("iconSvg",{attrs:{"icon-style":"iconfont","icon-class":"tou"}}),t._v(" "),i("span",[t._v("Lv.1")])],1)]),t._v(" "),i("div",{staticClass:"cardRight"},[i("a",{attrs:{href:"hyblife://action/login"}},[i("div",{staticClass:"topName"},[t._v("\n                  请登录...\n                ")]),t._v(" "),i("div",{staticClass:"topGoNext"},[i("iconSvg",{attrs:{"icon-style":"topIconRight","icon-class":"shuangjiantouyou"}})],1)])])])]),t._v(" "),i("div",{staticClass:"myList"},[i("ul",{staticClass:"myListUl"},[i("li",{staticClass:"myListLi",on:{click:function(s){t.goNext("/appProfile/appPoints")}}},[i("iconSvg",{attrs:{"icon-style":"myIcon","icon-class":"haoyoubi"}}),t._v(" "),i("div",{staticClass:"title"},[t._m(0),t._v(" "),i("div",{staticClass:"listRight"},[""!==this.username&&"未登录"!==this.username?i("span",[t._v("今日已到账"+t._s(t.addBalance))]):i("span",[t._v("登录后查看")]),t._v(" "),i("iconSvg",{attrs:{"icon-style":"rightIcon","icon-class":"youhua"}})],1)])],1),t._v(" "),i("li",{staticClass:"myListLi",on:{click:function(s){t.goNext("/appProfile/appMyActivity")}}},[i("iconSvg",{attrs:{"icon-style":" myIcon ","icon-class":"huodong"}}),t._v(" "),i("div",{staticClass:"title "},[t._m(1),t._v(" "),i("div",{staticClass:"listRight "},[i("span",[t._v(t._s(t.activity))]),t._v(" "),i("iconSvg",{attrs:{"icon-style":"rightIcon","icon-class":"youhua"}})],1)])],1),t._v(" "),i("li",{staticClass:"myListLi ",on:{click:function(s){t.goNext("/appProfile/appInvite")}}},[i("iconSvg",{attrs:{"icon-style":"myIcon","icon-class":"woyaoyaoqingICON"}}),t._v(" "),i("div",{staticClass:"title "},[t._m(2),t._v(" "),i("div",{staticClass:"listRight "},[i("span",[t._v(t._s(t.invite))]),t._v(" "),i("iconSvg",{attrs:{"icon-style":"rightIcon","icon-class":"youhua"}})],1)])],1),t._v(" "),i("li",{staticClass:"myListLi ",on:{click:function(s){t.goNext("/appProfile/appMyId")}}},[i("iconSvg",{attrs:{"icon-style":"myIcon","icon-class":"shimingrenzheng"}}),t._v(" "),i("div",{staticClass:"title "},[t._m(3),t._v(" "),i("div",{staticClass:"listRight "},[i("span",[t._v(t._s(t.checkInfo))]),t._v(" "),i("iconSvg",{attrs:{"icon-style":"rightIcon","icon-class":"youhua"}})],1)])],1)])])])]),t._v(" "),i("transition",{attrs:{name:"loading "}},[i("loading",{directives:[{name:"show",rawName:"v-show",value:t.showLoading,expression:"showLoading "}]})],1)],1)},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"listLeft"},[s("span",[this._v("余额积分奖励")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"listLeft "},[s("span",[this._v("我的活动")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"listLeft "},[s("span",[this._v("好友邀请")])])},function(){var t=this.$createElement,s=this._self._c||t;return s("div",{staticClass:"listLeft "},[s("span",[this._v("实名认证")])])}]},_=i("VU/8")(p,m,!1,function(t){i("sFWH")},"data-v-7f8cdcd8",null);s.default=_.exports},QtNP:function(t,s){},sFWH:function(t,s){}});
//# sourceMappingURL=3.64e4da8ee711bfe745f8.js.map