<template>
  <div id="cart-mask" v-if="isCartShow">
    <div id="cart-modal">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeCart"></a>
      <div style="margin-top: 22px;padding: 10px">
        <ul class="cart-ul" style="padding: 10px">
          <li class="cart-li" v-for="order in orderInfo">
            <div class="cart-info cart-name">{{order.name}}</div>
            <div class="cart-info cart-num">{{order.count}}</div>
            <div class="cart-info cart-price">{{order.price}}</div>
          </li>

        </ul>
        <div class="coupon">
          <select>
          </select>
        </div>
        <div class="cart-sum">总计: {{totalMoney}}</div>
      </div>
      <div class="pay-sub">
        <button @click="pay('alipay_wap')">支付宝</button>
        <button @click="pay('wx_pub')">微信支付</button>
        <button @click="pay('balance')">余额支付</button>
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
        isCartShow: 'isCartShow',
        orderInfo:'orderInfo',
        totalMoney:'totalMoney'
      }),
    },
    data(){
      return{
      }
    },
    methods: {
      closeCart: function () {
        this.$store.dispatch("showCart", false)
      },
      showCart: function () {
        this.$store.dispatch("showModal", false);
        this.$store.dispatch('showCart', true);
      },
      pay:function(payWay){
        if(payWay == 'balance'){

        }
        else{
          var xhr = new XMLHttpRequest();
          xhr.open("POST", 'http://120.27.120.60:3000/getCharge', true);
          xhr.setRequestHeader("Content-type", "application/json");
          xhr.send(JSON.stringify({
              channel: payWay,
              amount: 30 * 100,
              order_str: {name:'nnn',count:2},
              desk_id: 1,
              store_id: 1,
              price:30
          }));
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
                pingpp.createPayment(xhr.responseText, function(result, err) {
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
       
    }
  }
</script>

<style>
  #cart-mask {
    background-color: rgba(0, 0, 0, .4);
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
  }

  #cart-modal {
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
  .cart-info{
    display: inline-block;
  }
  .cart-name{
    width: 35%;
  }
  .cart-num,.cart-price{
    width: 20%;
  }
  .cart-ul{
    border-bottom: 1px solid black;
  }
  .cart-li{
    list-style: none;
  }
  .cart-sum{
    color: white;
  }
  .pay-sub{
    left: 20px;
    right: 20px;
    display: block;
    margin:auto;
    background-color: darkred;
    border-radius: 5px;
    position: absolute;
    bottom: 20px;
    border: 2px solid darkgray;
  }
  .pay-sub:hover{
    background-color: rgba(177,0,0,.2);
  }
  .pay-sub button{
    color: black;
  }
  .pay-sub button{
    font-size: 13px;
    color: white;

  }
</style>

