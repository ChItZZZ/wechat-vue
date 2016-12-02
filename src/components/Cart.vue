<template>
  <div id="cart-mask" v-if="isCartShow">
    <div id="cart-modal">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeCart"></a>

      <div class="part">
        <p class="cart-title" style="">取餐方式</p>
        <div class="cart-cont" style="display: flex">
          <div class="cart-self" style="">收银台自取</div>
          <input type="text" id="deskId" style="width: 15%;color: black"><span style="margin-top: 4px">&nbsp;号座位</span>
          <div class="cart-send" style="flex: 2;">送餐</div>
        </div>
      </div>

      <div class="part">
        <p class="cart-title">购物清单</p>
        <ul class="cart-cont" style="clear: both;">
          <li v-for="good in orderInfo" class="" style="display: flex;flex-wrap: nowrap;font-size: 11px">
            <div class="cart-item" style="flex: 2;">{{good.name}}</div>
            <div style="flex: 1;">{{good.price}}元</div>
            <div class="cart-act" style="flex: 1">
              <span class="item-act item-minus" id="test" >-</span>
              <span class="item-num">{{good.count}}</span>
              <span class="item-act item-plus" >+</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="dropdown" style="position: absolute;bottom: 100px;right: 15px;left: 15px">
        <span class="cart-title">我的优惠券</span>
        <a href="#"class="dropdown-toggle" data-toggle="dropdown" style="">
          点击选择
          <b class="caret"></b>
        </a>
        <ul class="dropdown-menu" style="font-size: 10px;left: 50px;right: 0px">
          <li v-for="(coupon,index) in couponList" @click="selectCoupon(index)" > <a href="#">{{coupon.description}}</a> </li>
          <!--<li class="divider"></li>-->
          <!--<li><a href="#">送饮料</a></li>
          <li class="divider"></li>
          <li><a href="#">另一个分离的链接</a></li>-->
        </ul>
      </div>

      <div class="cart-sum"style="position: absolute;bottom: 60px;font-size: 20px">总计:{{totalMoney}} 优惠价:{{price}}</div>

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
    computed: {
      ...mapGetters({
        isCartShow: 'isCartShow',
        orderInfo: 'orderInfo',
        totalMoney: 'totalMoney',
        personalInfo: 'personalInfo',
        activityInfo:'activityInfo',
        couponInfo:'couponInfo',
      }),
      couponList: function(){
        var list = [];
        if(this.couponInfo.isGet)
          list = this.couponInfo.couponList;
        else{
          list[0] = {};
          list[0].description = '没有可以使用的优惠券';
        }
        console.log('hahaha');
        return list;
      },
      price : function(){
        return this.calculatePrice();
      }

    },
    data()
    {
      return {
        url: 'http://api.qiancs.cn/',
        couponDes: '',
        activityDes: '',
        realPrice: 0,
        couponIndex: 0,
        useCoupon : false,
        couponId : -1,
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
      pay: function (payWay) {
        if (this.orderInfo.length == 0){
          alert('购物车为空,请选购');
          return;
        }
        var deskId = document.getElementById("deskId").value;
        if(deskId == ''  || isNaN(deskId)){
          alert('请输入正确的桌号');
          return;
        }

        if (!window.confirm('确定支付?'))
          return;

        this.calculatePrice();

        if (payWay == 'balance') {
          this.payBalance();
        }
        else {
          var isUse = false;
          var xhr = new XMLHttpRequest();
          var api = this.url + 'getChargeNew'
          xhr.open("POST", api, true);
          xhr.setRequestHeader("Content-type", "application/json");
          var data = {
            channel: payWay,
            amount: this.realPrice * 100,
            orderInfo: this.orderInfo,
            desk_id: deskId,
            store_id: 1,
            price: this.totalMoney,
            realPrice: this.realPrice,
            couponDes: this.activityDes + ' ' + this.couponDes,
          }
          if(this.couponId != -1){
            data.coupon_id = this.couponId;
            this.couponId = -1;
            isUse = true;
          }
          xhr.send(JSON.stringify(data));
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              pingpp.createPayment(xhr.responseText, function (result, err) {
                if (result == "success") {
                  if(isUse){
                    //this.getCouponInfoAfterUse(); //使用优惠券后更新本地优惠券数据
                    //this.$store.dispatch("showCart", false)
                  }
                  alert('successed');
              //    this.$store.dispatch('setOrderInfo',[]);
                } else if (result == "fail") {
                  alert('failed');
                } else if (result == "cancel") {
                  alert('canceled');
                }
              });
            }
          }
        }
      },
      payBalance: function () {
        if (this.personalInfo.hasCard == 1 && this.personalInfo.balance >= this.totalMoney) {
          var api = this.url + 'deduct';
          var param = {};
          var isUse = false;
          param.amount = this.totalMoney;
          param.orderInfo = this.orderInfo;
          param.desk_id = document.getElementById("deskId").value;
          param.store_id = 1;
          param.price = this.totalMoney;
          param.realPrice = this.realPrice;
          if(this.couponId != -1){
            param.coupon_id = this.couponId;
            this.couponId = -1;
            isUse = true;
          }
          param.couponDes = this.activityDes + ' ' + this.couponDes;

          this.$http.post(api, param).then((response) => {
            console.log('post balance deduct ' + JSON.stringify(response.data));
            if (response.data.code == 'success') {
              this.$store.dispatch('modifyBalance', -1 * this.totalMoney);
              if(isUse){
                this.getCouponInfoAfterUse();   //使用优惠券后更新本地优惠券数据
              }
              alert('支付成功!');
              this.closeCart();
             // this.$store.dispatch('setOrderInfo',[]);
            }
            else
              alert('支付失败');
            },(response) =>{
              console.log('post balance deduct error');
          });
        }
        else {
          alert('余额不足请充值');
        }
      },
      calculatePrice:function(){
        this.realPrice = this.totalMoney;
        if(this.activityInfo.hasActivity == 1){
          switch(this.activityInfo.activities[0].type){       
            case 1:     //满减
              this.calculateActivity(1);
              break;
            case 2:    //打折
              this.calculateActivity(2);
              break;
            default:
              console.log('no this activity type');
              break;
          }
          if(this.useCoupon)
            this.calculateCoupon(true);
        }
        else if(this.useCoupon)
          this.calculateCoupon(false);
        console.log('des ' + this.activityDes + this.couponDes);
        return this.realPrice;
      },
      cataloguePrice:function(){    //订单中每种类型的总价  {"面类": 20, "酒水":10}
        var catPrice = {};
        var order = this.orderInfo;
        for(var i in order){
          var catalogue = order[i].catalogue;
          if(catalogue in catPrice)
            catPrice[catalogue] += order[i].price * order[i].count;
          else
            catPrice[catalogue] = order[i].price * order[i].count;
        }
        return catPrice;
      },
      calculateActivity:function(type){
        var amount1 = this.activityInfo.activities[0].amount1;
        var amount2 = this.activityInfo.activities[0].amount2;
        var catalogues = this.activityInfo.activities[0].catalogue.split(';');  //可以优惠的类型
        var catPrice = this.cataloguePrice();   //每种类型的计价
        var price = 0;
        var temp = {};
        temp.original = 0;      //订单中不算在活动分类里的总价，无优惠按原价
        temp.modify = 0;        //订单中在活动分类里的总价，按优惠价
        for(var catalogue in catPrice){
          var isModify = false;
          for(var i in catalogues){
            if(catalogue == catalogues[i]){
              temp.modify += catPrice[catalogue];
              isModify = true;
              break;
            }
          }
          if(!isModify)
            temp.original += catPrice[catalogue];
        }
        var isDeduct = false;
        switch(type){
          case 1:
            if(temp.modify >= amount1){
              price = temp.modify - amount2;    //满amount1减amount2
              isDeduct = true;
            }
            else
              price = temp.modify;
            break;
          case 2:
            price = temp.modify * (amount1 / 10);   //打amount1折
            isDeduct = true;
            break;
        }
        price += temp.original;
        this.realPrice = price;
        if(isDeduct){
          this.activityDes = ' 全店活动 ' + this.activityInfo.activities[0].catalogue + ' ' 
                           + this.activityInfo.activities[0].description;
        }
        else
          this.activityDes = '';
      },
      selectCoupon:function(index){
        if(this.couponInfo.isGet && this.couponInfo.couponList.length != 0){
          this.couponIndex = index;
          this.useCoupon = true;
          this.couponId = this.couponInfo.couponList[index].id;
        }
      },
      calculateCoupon:function(hasActivity){
        this.useCoupon = false;
        var coupon = this.couponInfo.couponList[this.couponIndex];
        var type = coupon.type;
        if(type == 3){
          this.couponDes = (' 优惠券 ' + coupon.description);
          // to do   本地扣除index优惠券 or 设置重新查询
          return;
        }
        if(hasActivity)
          return;
        var amount1 = coupon.amount1;
        var amount2 = coupon.amount2;
        var catalogues = coupon.catalogue.split(';');  //可以优惠的类型
        var catPrice = this.cataloguePrice();   //每种类型的计价
        var price = 0;
        var temp = {};
        temp.original = 0;      //订单中不算在优惠券分类里的总价，无优惠按原价
        temp.modify = 0;        //订单中在优惠券分类里的总价，按优惠价
        for(var catalogue in catPrice){
          var isModify = false;
          for(var i in catalogues){
            if(catalogue == catalogues[i]){
              temp.modify += catPrice[catalogue];
              isModify = true;
              break;
            }
          }
          if(!isModify)
            temp.original += catPrice[catalogue];
        }
        var isDeduct = false;
        switch(type){
          case 1:
            if(temp.modify >= amount1){
              price = temp.modify - amount2;    //满amount1减amount2
              isDeduct = true;
            }
            else
              price = temp.modify;
            break;
          case 2:
            price = temp.modify * (amount1 / 10);   //打amount1折
            isDeduct = true;
            break;
        }
        price += temp.original;
        this.realPrice = price;
        if(isDeduct)
          this.couponDes = '优惠券 ' + coupon.catalogue + ' ' + coupon.description;
        else
          this.couponDes = '';
      },
      getCouponInfoAfterUse:function(){
        var api = this.url + 'coupon';
        var param = {};
        param.card_id = this.personalInfo.cardNumber;
        this.$http.post(api,param).then((response) => {
          console.log('post coupon info' + JSON.stringify(response.data));
          var data = {};
          data.isGet = true;
          data.couponList = response.data.couponList;
          this.$store.dispatch('setCouponInfo',data)
        }, (response) => {
          console.log('post coupon info error');
        });
      },

    }
  }
</script>

<style scoped>
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

