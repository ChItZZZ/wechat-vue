<template>
<div class="item-info" v-if='isCurFuncTab'>
  <div class="order-container">
    <div class="order-main order-one" style="border-top: 1px solid black">
        <div class="" style="display: flex;font-size: 12px">
          <div class="item-title item-id">编号</div>
          <div class="item-title item-name">订单内容</div>
          <div class="item-title">数量</div>
          <div class="item-title">金额</div>
          <div class="item-title">状态</div>
        </div>
        <div class="item-cont" style="display: flex" v-for="(order,index) in historyOrder">
          <div class="item-content item-id">{{order.id}}</div>
          <div class="item-content item-name">{{orderDescription[index]}}</div>
          <div class="item-content">{{orderCount[index]}}</div>
          <div class="item-content">{{order.price}}</div>
          <div class="item-content" :class="{'item-unused':order.state==1 || order.state==0,'item-used':order.state==2}"
              @click='payForUnfinish(index)'>
            {{orderStateStr[index]}}</div>
          <!--<div class="item-content" :class="{'item-used':order.state == 1,'item-unused':order.state == 0}">{{order.state}}</div>-->
        </div>
        <!--<div class="item-cont" style="display: flex">
          <div class="item-content">8/30</div>
          <div class="item-content item-id">0001</div>
          <div class="item-content item-name">招牌三鲜牛肉面</div>
          <div class="item-content">2</div>
          <div class="item-content">5元</div>
          <div class="item-content">89</div>
          <div class="item-content item-unused">未出</div>
        </div>-->
       
        <div class="order-refresh" @click="ordersRefresh">
            刷新
        </div>
        
        </tbody>
      </table>
    </div>
    <div class='pay-way'>
      <input type="radio" value="" name="一" checked="true" id='wx'>微信支付</input>
      <input type="radio" value="" name="一">余额支付</input>
    </div>

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
        historyOrder:'historyOrder',
        openId:'openId',
        personalInfo: 'personalInfo'
      }),
      
      isCurFuncTab:function(){
        if(this.curFuncTab == '我的订单' && this.curNavBar == 2)
          return true;
        return false;
      },
      orderDescription:function(){
        var des = [];
        var order = this.historyOrder
        for(var i in order){
          var str = '';
          for(var j in order[i].items){
            str += order[i].items[j].name + '*' + order[i].items[j].counter;
          }
          des.push(str);
        }
        return des;
      },
      orderCount:function(){
        var counts = [];
        var order = this.historyOrder
        for(var i in order){
          var count = 0;
          for(var j in order[i].items){
            count += parseInt(order[i].items[j].counter);
          }
          counts.push(count);
        }
        return counts;
      },
      orderStateStr:function(){
        var strs = [];
        var order = this.historyOrder;
        for(var i in order){
          var str = '';
          switch(order[i].state){
            case 0:
              str = '未支付';
              break;
            case 1:
              str = '未出';
              break;
            case 2:
              str = '已出';
              break;
          }
          strs.push(str);
        }
        return strs;
      },

    },
    data(){
      return{
        url : 'http://api.shmddm.com/'
      }
    },
    methods:{
      payForUnfinish:function(index){
        if(this.historyOrder[index].state == 0){
          if(document.getElementById('wx').checked){
            this.payWx(index);
          }
          else{
            this.payBalance(index);
          }
        }
      },
      payBalance:function(index){
        var order = this.historyOrder[index];
        // if(!window.confirm('确定支付'+order.price+'元?'))
        //   return;
        // if (this.personalInfo.hasCard == 1 && this.personalInfo.balance >= order.price){

        // }
        // else {
        //   alert('余额不足请充值');
        // }
        alert('余额支付未付订单功能未上线,请选择微信支付');
      },
      payWx:function(index){
        var order = this.historyOrder[index];
        if(!window.confirm('确定支付'+order.price+'元?'))
          return;
        var api = this.url + 'getChargeForUnfinished'
        var param = {
          channel: 'wx_pub',
          amount: order.price * 100,
          order_id : order.id,
          openId: this.openId,
        }
        this.$http.post(api,param).then((response) => {
          pingpp.createPayment(response.data, function (result, err) {
            if (result == "success") {
              alert('支付成功，请刷新订单');
            } else if (result == "fail") {
              alert('支付失败，请刷新订单');
            } else if (result == "cancel") {
              alert('支付取消');
            }
          });
        }, (response) => {
          console.log('get charge error');
        });
      },
      ordersRefresh:function(){
        var api = this.url + 'order';
        var param = {};
        param.openId = this.openId;
        this.$http.post(api,param).then((response) => {
          console.log('get history order from server');
          this.$store.dispatch('setHistoryOrder',response.data.historyOrder);
        }, (response) => {
          console.log('get history order error');
        });
        alert('已刷新');
      }
    },
  }

</script>

<style scoped>
  .pay-way{
    margin-top: 50px; 
  }
  .item-info {
    text-align: center;
    margin-left: 70px;
    padding: 150px 5px 40px 5px;
    flex-grow: 5;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background-color: rgba(255, 255, 255, .6);
    min-height: 100vh;
  }

  .item-img {
    flex: 2;
  }
  .order-container {
    text-align: center;
    flex-grow: 5;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    min-height: 100vh;
    width:100%;
  }

  .order-title {
    border-bottom: 1px solid white;
    background-color: darkred;
    color: white;
    font-size: 12px;
    height: 33px;
    line-height: 33px;
  }
  .order-main{
    /*min-height: 130px;*/
  }

  .order-one{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .order-cont{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    align-self: -webkit-stretch;
    border-right: 0px solid black;
  }
  .order-unpaid{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    align-self: -webkit-stretch;
    /*background-image: url('../public/img/unpaid.png');*/
  }
  .order-paid{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    align-self: -webkit-stretch;
    border-right: 0px solid black;
  }
  .order-content{
    display: flex;
    display: -webkit-flex;
  }
  table{
    width: 100%;
    font-size: 10px;
    margin-top: 10px;
  }
  .item-cont{
    border-bottom: 1px solid rgba(0,0,0,.4);
    padding: 16px 0px;
  }
  .item-title{
    flex:1;

  }
  .item-content{
    flex: 1;
    padding: 2px;
    font-size: 11px;

  }
  .item-name{
    flex:3;
  }
  .item-used{
    padding: 2px;
    background-color: lightgray;
    color: black;
    border-radius: 8px;
    height: 1.8em;
  }
  .item-unused{
    padding: 2px;
    background-color: darkred;
    color: white;
    border-radius: 8px;
    height: 1.8em;
  }
  .order-refresh{
    border-radius: 4px;
    position: fixed;
    right: 20px;
    bottom: 50px;
    z-index: 10003;
    background-color: rgba(165,0,0,1);
    padding: 3px 5px;
    font-size: 13px;
    font-weight: bold;
    color: white;
    line-height: 1;
    text-align: center;
    padding: 10px 20px;
  }
</style>
