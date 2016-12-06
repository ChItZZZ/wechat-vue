<template>
  <div class="vip-container" v-if='isCurFuncTab'>
    <div class="vip-main vip-one" style="border-top: 1px solid black">
      <div class="vip-title">目前你是{{myInfo.type}}会员</div>
      <table>
        <tr>
          <!--<td>你最爱</td>
          <td>红烧牛肉面</td>-->
          <td>余额:{{myInfo.balance}}元</td>
        </tr>
        <!--<tr>
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
        </tr>-->
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
        <div class="vip-cont1 vip-cont">不用排队，微信快速下单，优先参与优惠活动赢取丰厚礼品</div>
        <div class="vip-cont2 vip-cont">累计充值500元，每天进店消费免费送一份饮料</div>
        <div class="vip-cont3 vip-cont">累计充值1000元，每天进店消费免费送一份开胃小菜</div>
        <div class="vip-cont4 vip-cont">累计充值1500元，可享受纯银及纯金会员待遇</div>
      </div>
    </div>
    <div class="vip-main vip-three">
      <div class="vip-title">魔都的面 充值(优惠)</div>
      <div class="vip-payment">
        <div class="vip-pay1 vip-pay" :class="{active:moneyIndex==0}" @click="selectMoney(0)">0.01元</div>
        <div class="vip-pay2 vip-pay" :class="{active:moneyIndex==1}" @click="selectMoney(1)">20元</div>
        <div class="vip-pay3 vip-pay" :class="{active:moneyIndex==2}" @click="selectMoney(2)">50元</div>
        <div class="vip-pay4 vip-pay" :class="{active:moneyIndex==3}" @click="selectMoney(3)">100元</div>
      </div>
    </div>
    <div class="vip-way" @click="recharge('wx_pub')">
      <p>微信支付</p>
      <img src="../public/img/wechatpay.png" >
      <!--<input type="radio" value="" name="一" @click="recharge('alipay_wap')">支付宝支付</input>
      <img src="../public/img/alipay.png">-->
    </div>
     <div class="refresh" @click="getPersonalInfo">
            刷新
     </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  var pingpp = require('pingpp-js');

  export default {
     computed: {
      ...mapGetters({
        curNavBar:'navBarCount',
        curFuncTab:'curFuncTab',
        personalInfo:'personalInfo',
        openId:'openId',
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
        url : 'http://api.qiancs.cn/',
        moneyIndex:0,
        money:0.01,
        moneyArr:[0.01,20,50,100]
      }
    },
    methods:{
      selectMoney:function(index){
        this.moneyIndex = index;
        this.money = this.moneyArr[index];
      },
      recharge:function(payWay){
        if(window.confirm('确定充值'+this.money+'元?')){
          var api = this.url + 'recharge';
          var param = {};
          param.amount = this.money * 100;
          param.price = this.money;
          param.channel = payWay;
          param.openId = this.openId;
          this.$http.post(api,param).then((response) => {
            console.log('post recharge' + JSON.stringify(response.data));
            pingpp.createPayment(response.data, function (result, err) {
              if (result == "success") {
                alert('充值成功');               
              } else if (result == "fail") {
                alert('充值失败');
              } else if (result == "cancel") {
                alert('充值取消');
              }
            });
            this.$store.dispatch('setRecharged',true);
            this.$store.dispatch('setCouponGet',false);
          }, (response) => {
            console.log('post recharge error');
          });
        }
      },
      getPersonalInfo: function (){
        var api = this.url + 'inquire';
        var param = {};
        param.openId = this.openId;
        this.$http.post(api,param).then((response) => {
          console.log('get personal info from server ');
          this.$store.dispatch('setPersonalInfo',response.data);
          this.$store.dispatch('setRecharged',false);
          this.$store.dispatch('setCouponGet',false);
        }, (response) => {
          console.log('get personal info error');
        });
        alert('已刷新');
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
    margin-top: 18px;
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

  .vip-way input{
    margin-right: 3px;
  }
  .vip-way img{
    width: 30px;
    height: 30px;
    border-radius: 6px;
    margin-right: 6px;
  }
  .refresh{
    border-radius: 8px;
    position: fixed;
    right: 20px;
    bottom: 50px;
    z-index: 10003;
    background-color: rgba(165,0,0,1);
    padding: 3px 5px;
    font-size: 10px;
    font-weight: bold;
    color: white;
    line-height: 1;
    text-align: center;
  }
  /*.vip-three{*/
  /*position: absolute;*/
  /*bottom: 100px;*/
  /*right: 0;*/
  /*left: 70px;;*/
  /*}*/
</style>
