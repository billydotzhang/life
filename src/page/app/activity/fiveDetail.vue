<template>
    <div>
        <div class="fiveDetail" ref="wrapper" :style="{height:displayWindow +'px'}">
            <div class="fiveDetail_d1">
                <img src="~@/assets/activity/activity.png" >
            </div>
            <div class="fiveDetail_d2">
                <span>新用户好友币使用流程</span>
            </div>
            <ul class="fiveDetail_d3">
                <li v-for="(item,index) in list" :key="index">
                    <div class="fiveDetail_d3_d1">
                        <span>{{ index+1 }}</span>
                    </div>
                    <div class="fiveDetail_d3_d2">
                        {{ item }}
                    </div>
                </li>
            </ul>
            <div class="fiveDetail_d4">
                <a href="hyblife://action/register">立即注册</a>
            </div>
        </div>
    </div>
</template>

<script>


    export default {
        data() {
            return {
                headTitle: "首页",
                displayWindow: 0,
                allLoaded: false,
                list:[
                    "注册好友邦生活会员并设置交易密码","根据国家预付卡业务使用规定完成实名认证","首次充值100枚好友币并完成付款(获得5枚好友币奖励)","好友邦生活门店购物时出示付款码","输入交易密码完成付款","未使用的好友币余额每天都能获得额外的余额积分奖励"
                ]
            };
        },
        mounted() {

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

        },
        methods: {
            goReg() {

            }
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

    .fiveDetail {
        background-color: #f16543;
        overflow-y: auto;
    }
    .fiveDetail_d1 {
        @include overflow;
        padding: 0;
        img{
            width: 100%;
        }
    }
    .fiveDetail_d2{
        text-align: center;
        span{
            display: inline-block;
            width: 513px;
            height: 84px;
            line-height: 84px;
            font-size: 38px;
            border-radius: 42px;
            color: #ffffff;
            background-color: #302727;
        }
    }
    .fiveDetail_d3{
        padding: 0 60px;
        li{
            display: table;
            width: 100%;
            margin: 40px 0;
            vertical-align: middle;
        }
    }
    .fiveDetail_d3_d1,.fiveDetail_d3_d2{
        display: table-cell;
        vertical-align: middle;
    }
    .fiveDetail_d3_d1{
        width: 140px;
        position: relative;
        margin-bottom: -6px;
        span{
            display: inline-block;
            width: 120px;
            height: 120px;
            line-height: 120px;
            text-align: center;
            font-size: 64px;
            border-radius: 100%;
            background: linear-gradient(#fdf289,#fdc536);;
            position: relative;
            z-index: 2;
            margin-top: -2px;
            color: #fe7c42;
            &:after{
                content: "";
                position: absolute;
                width: 100%;
                height: 100%;
                border: solid 4px rgb(255,228,136);
                bottom: 0;
                box-sizing: border-box;
                left: 0;
                border-radius: 100%;
                z-index: 1;
            }
        }
    }
    .fiveDetail_d3_d2{
        text-align: left;
        font-size: 28px;
        color: #ffffff;
        line-height: 40px;
        padding-right: 45px;
        position: relative;
        &:after{
            content: "";
            width: 100%;
            height: 100%;
            bottom:0;
            right: 0;
            position: absolute;
            box-sizing: border-box;
            border-top-right-radius:10px;
            border-bottom-right-radius:10px;
            border: solid 6px rgb(255,228,136);
            border-left: none;
        }
        &:before{
            content: "";
            width: 570px;
            height: 80%;
            right: 0;
            bottom:0;
            position: absolute;
            box-sizing: border-box;
            border-bottom-right-radius:10px;
            border-right: solid 6px rgb(255,228,136);
            border-bottom: solid 6px rgb(255,228,136);
        }
    }
    .fiveDetail_d4{
        padding: 40px 60px;
        a{
            display: block;
            height: 88px;
            line-height: 88px;
            font-size: 36px;
            text-align: center;
            box-sizing: border-box;
            background: linear-gradient(#fdf289,#fdc536);;
            color: rgb(177,78,0);
            border: solid 2px rgb(255,228,136);
            border-radius: 44px;
            &:hover{
                opacity: 0.8;
            }
        }
    }
</style>
