<template>
  <div class="vip-container" v-if='isCurFuncTab'>
    <div class="vip-main vip-one" style="border-top: 1px solid black">
      <div class="vip-title">目前你是{{myInfo.type}}会员</div>
      <table>
        <tr>
          <td>你最爱</td>
          <td>红烧牛肉面</td>
          <td>余额:{{myInfo.balance}}</td>
        </tr>
        <tr>
          <td>本月来店</td>
          <td>12次</td>
          <td>累计:38次</td>
        </tr>
        <tr>
          <td>本次消费</td>
          <td>123元</td>
          <td>累计:123元</td>
        </tr>
        <tr>
          <td>本月充值</td>
          <td>123元</td>
          <td>累计:1233元</td>
        </tr>
      </table>
    </div>
    <div class="vip-main vip-two">
      <div class="vip-title">会员说明</div>
      <div class="vip-all">
        <div class="vip-level vip-level1">星光会员</div>
        <div class="vip-level vip-level2">纯银会员</div>
        <div class="vip-level vip-level3">纯金会员</div>
        <div class="vip-level vip-level4">钻石会员</div>
      </div>
      <div class="vip-content " style="height: 100px">
        <div class="vip-cont1 vip-cont">阿森纳地哦啊是你的</div>
        <div class="vip-cont2 vip-cont">IQ网合肥南送</div>
        <div class="vip-cont3 vip-cont">懊恼放弃我让你我</div>
        <div class="vip-cont4 vip-cont">弄得是非农是哪位偶然呢我</div>
      </div>
    </div>
    <div class="vip-main vip-three">
      <div class="vip-title">魔都的面 充值(优惠)</div>
      <div class="vip-payment">
        <div class="vip-pay1 vip-pay active">10元</div>
        <div class="vip-pay2 vip-pay">20元</div>
        <div class="vip-pay3 vip-pay">50元</div>
        <div class="vip-pay4 vip-pay">100元</div>
      </div>
    </div>
    <div class="vip-way">
      <input type="radio" value="" name="一" @click='recharge('wx_pub')'>微信支付
      <input type="radio" value="" name="一" @click='recharge('alipay_wap')'>支付宝支付
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
     computed: {
      ...mapGetters({
        curNavBar:'navBarCount',
        curFuncTab:'curFuncTab',
        personalInfo:'personalInfo',
      }),
      myInfo: function(){
        var info = {};
        if(this.personalInfo.hasCard == 0){
          info.balance = 0;
          info.type = '普通用户';
        }
        else
          info = this.personalInfo;
        return info;
      },
      isCurFuncTab:function(){
        if(this.curFuncTab == '我是会员' && this.curNavBar == 2)
          return true;
        return false;
      },
    },
    data(){
      return{
        url : 'http://api.qiancs.cn/'
      }
    },
    methods:{
      recharge:function(payWay){
        // var xhr = new XMLHttpRequest();
        // var api = this.url + 'getChargeNew'
        // xhr.open("POST", api, true);
        // xhr.setRequestHeader("Content-type", "application/json");
        // xhr.send(JSON.stringify({
        //   channel: payWay,
        //   amount: this.totalMoney * 100,
        //   orderInfo: this.orderInfo,
        //   desk_id: deskId,
        //   store_id: 1,
        //   price: this.totalMoney,
        //   realPrice: this.realPrice,
        //   couponDes: this.couponDes,
        // }));
        // xhr.onreadystatechange = function () {
        //   if (xhr.readyState == 4 && xhr.status == 200) {
        //     pingpp.createPayment(xhr.responseText, function (result, err) {
        //       if (result == "success") {
        //         alert('successed');
        //     //    this.$store.dispatch('setOrderInfo',[]);
        //       } else if (result == "fail") {
        //         alert('failed');
        //       } else if (result == "cancel") {
        //         alert('canceled');
        //       }
        //     });
        //   }
        // }
      },

    },

  }

</script>

<style scoped>
  .vip-container {
    text-align: center;
    margin-left: 70px;
    padding-top: 130px;
    flex-grow: 5;
    padding-bottom: 40px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background-color: rgba(255, 255, 255, .6);
    min-height: 100vh;
  }

  .vip-title {
    border-bottom: 1px solid white;
    background-color: darkred;
    color: white;
    font-size: 12px;
    height: 33px;
    line-height: 33px;
  }

  .vip-main {
    min-height: 110px;
  }

  .vip-main:nth-last-child(2) {
    min-height: 0;
  }

  .vip-level {
    flex: 1;
    background-color: darkred;
    color: white;
    font-size: 10px;
    border-right: 1px solid black;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    padding: 3px;
  }
  .vip-way{
    margin-top: 10px;
  }

  .vip-level:last-child {
    border: 0;
    display: flex;

  }

  .vip-two {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .vip-all {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    align-content: stretch;
    align-self: stretch;
  }

  .vip-cont {
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
  }

  .vip-content {
    display: flex;
    display: -webkit-flex;
  }

  .vip-cont {
    align-self: stretch;
    align-self: -webkit-stretch;
    border-right: 1px solid black;
  }

  .vip-cont:last-child {
    border: 0;
  }

  table {
    width: 100%;
    font-size: 11px;
    margin-top: 10px;
  }

  .vip-pay {
    font-size: 11px;
    flex: 1;
    height: 30px;
    background-color: darkred;
    color: white;
    padding: 10px;
  }

  .vip-pay.active {
    background-color: rgba(100, 5, 0, 1);
  }

  .vip-payment {
    display: flex;
  }

  /*.vip-three{*/
  /*position: absolute;*/
  /*bottom: 100px;*/
  /*right: 0;*/
  /*left: 70px;;*/
  /*}*/
</style>
