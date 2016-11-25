<template>
  <div id="cart-mask" v-if="isCartShow">
    <div id="cart-modal">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeCart"></a>

      <div class="part">
        <p class="cart-title" style="">取餐方式</p>
        <div class="cart-cont" style="display: flex">
          <div class="cart-self" style="">收银台自取</div>
          <input type="text" style="width: 15%;color: black"><span style="margin-top: 4px">&nbsp;号座位</span>
          <div class="cart-send" style="flex: 2;">送餐</div>
        </div>
      </div>

      <div class="part">
        <p class="cart-title">购物清单</p>
        <ul class="cart-cont" style="clear: both;">
          <li class="" style="display: flex;flex-wrap: nowrap;font-size: 11px">
            <div class="cart-item" style="flex: 2;">一二三四五六</div>
            <div style="flex: 1;">18元</div>
            <div class="cart-act" style="flex: 1">
              <span class="item-act item-minus" id="test" >-</span>
              <span class="item-num">11</span>
              <span class="item-act item-plus" >+</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="dropdown" style="position: absolute;bottom: 100px;right: 15px;left: 15px">
        <span class="cart-title">我的优惠券</span>
        <a href="#"class="dropdown-toggle" data-toggle="dropdown" style="">
          满30减5
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu" style="font-size: 10px;left: 50px;right: 0px">
          <li><a href="#">买一送一</a></li>
          <li class="divider"></li>
          <li><a href="#">送饮料</a></li>
          <li class="divider"></li>
          <li><a href="#">另一个分离的链接</a></li>
        </ul>
      </div>

      <div class="cart-sum"style="position: absolute;bottom: 60px;font-size: 20px">总计:{{totalMoney}}</div>

      <div class="pay-sub">
        <button @click="pay('alipay_wap')">支付宝</button>
        <button @click="pay('wx_pub')">微信</button>
        <button @click="pay('balance')">余额支付</button>
      </div>

    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  var pingpp = require('pingpp-js');
  export default {
    computed: mapGetters({
      isCartShow: 'isCartShow',
      orderInfo: 'orderInfo',
      totalMoney: 'totalMoney',
      personalInfo: 'personalInfo'
    }),
    data()
    {
      return {
        url: 'http://api.qiancs.cn/'
      }
    }
    ,
    methods: {
      closeCart: function () {
        this.$store.dispatch("showCart", false)
      }
      ,
      showCart: function () {
        this.$store.dispatch("showModal", false);
        this.$store.dispatch('showCart', true);
      }
      ,
      pay: function (payWay) {
        if (this.orderInfo.length == 0)
          return;
        if (!window.confirm('确定支付?'))
          return;

        if (payWay == 'balance') {
          this.payBalance();
        }
        else {
          var xhr = new XMLHttpRequest();
          var api = this.url + 'getChargeNew'
          xhr.open("POST", api, true);
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.send(JSON.stringify({
            channel: payWay,
            amount: this.totalMoney * 100,
            orderInfo: this.orderInfo,
            desk_id: 1,
            store_id: 1,
            price: this.totalMoney
          }));
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              pingpp.createPayment(xhr.responseText, function (result, err) {
                if (result == "success") {
                  alert('successed');
                } else if (result == "fail") {
                  alert('failed');
                } else if (result == "cancel") {
                  alert('canceled');
                }
              });
            }
          }
        }
      }
      ,
      payBalance: function () {
        if (this.personalInfo.hasCard == 1 && this.personalInfo.balance >= this.totalMoney) {
          var api = this.url + 'deduct';
          var param = {};
          param.amount = this.totalMoney;
          this.$http.post(api, param).then((response) => {
            console.log('post balance deduct ' + JSON.stringify(response.data));
          if (response.data.successful == 1) {
            this.$store.dispatch('modifyBalance', -1 * this.totalMoney);
            alert('支付成功!');
          }
          else
            alert('支付失败');
        },(response) =>
          {
            console.log('post balance deduct error');
          });
        }
        else {
          alert('余额不足请充值');
        }
      }
      ,

    }
  }
</script>

<style>
  #cart-mask {
    color: white;
    background-color: rgba(0, 0, 0, .4);
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
  }

  #cart-modal {
    padding: 8px;
    position: relative;
    z-index: 1000;
    margin: auto;
    height: 60%;
    width: 70%;
    top: 20%;
    background-color: darkred;
    border: 2px solid darkred;
  }

  .modal-close {
    position: absolute !important;
    right: 2px;
    color: white;
    background-color: black;
    display: block;
    height: 29px;
    width: 29px;
    border-radius: 50%;
    line-height: 29px !important;
  }

  .food-act button {
    color: darkred;
    background-color: rgba(255, 233, 249, .9);
    border-radius: 6px;
    width: 80px;
    font-size: 13px;
    border: 0;
  }

  .cart-info {
    display: inline-block;
  }

  .cart-name {
    width: 35%;
  }

  .cart-num, .cart-price {
    width: 20%;
  }

  .cart-ul {
    border-bottom: 1px solid black;
  }

  .cart-li {
    list-style: none;
  }

  .cart-sum {
    color: white;
  }

  .pay-sub {
    left: 20px;
    right: 20px;
    display: block;
    margin: auto;
    background-color: darkred;
    border-radius: 5px;
    position: absolute;
    bottom: 20px;
    border: 2px solid darkgray;
  }

  .pay-sub:hover {
    background-color: rgba(177, 0, 0, .2);
  }

  .pay-sub button {
    background-color: darkred;
    color: black;
    border:0;
  }

  .pay-sub button {
    font-size: 13px;
    color: white;

  }
  .cart-self,.cart-send{
    flex: 3;background-color: rgba(237,190,190,.8);margin: 0 10px;border-radius: 10px;line-height: 26px;height: 26px;
    color: darkred;

  }
  .cart-title{
    float: left;
    font-size: 13px;
  }
  .cart-cont{
    clear: both;
    font-size: 11px;
  }
  .part{
    margin-top: 20px;
  }
  .part-ticket{
    bottom: 100px;
    position: absolute;
  }
  .select{
    float: left;
    width: 60%;
  }
  .dropdown-toggle{
    color: white;margin-left: 25px;width: 60%;border: 1px solid black;padding: 5px;
    /*position: absolute;*/
    display: inline-block;
    /*right: 15px;*/
    bottom: 0;
    margin-left: 5px;
    font-size: 9px;
  }
  .item-act{
    display: inline-block;
    width: 15px;
    height: 15px;
    line-height: 15px;
    background-color: white;
    border-radius: 50%;
    color: #000;

  }
  .dropdown .cart-title{
    font-size: 13px;
    margin-top: 3px;
  }
</style>

