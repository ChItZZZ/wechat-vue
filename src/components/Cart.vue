<template xmlns="http://www.w3.org/1999/html">
  <div id="cart-mask" v-if="isCartShow">
    <div id="cart-modal">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeCart"></a>

      <div class="part">
        <p class="cart-title" style="">取餐方式</p>
        <div class="cart-cont" style="display: flex"> 
          <div class="cart-self" style="" :class="{active:recWayIndex==0}" @click="recWayIndex=0">收银台自取</div>
          <div class="cart-send" style="flex: 2;" :class="{active:recWayIndex==1}" @click="recWayIndex=1">送餐到座位</div>
          <input type="text" id="deskId" style="width: 15%;color: black" v-show="recWayIndex==1">
          <span style="margin-top: 4px"  v-show="recWayIndex==1">&nbsp;号座位</span>
        </div>
      </div>

      <div class="part" style="height: 36%;">
        <p class="cart-title">购物清单</p>
        <ul class="cart-cont" style="clear: both;overflow-y: auto;max-height: 100%">
          <li v-for="(goods,index) in orderInfo" class="cart-item" style="display: flex;flex-wrap: nowrap;">
            <div class="cart-item-name" style="flex: 3;">{{goods.name}}</div>
            <div class="cart-size" style="flex: 2">{{goods.detail}}</div>
            <div style="flex: 2;">{{goods.price}}元</div>
            <div class="cart-act" style="flex: 2;display: flex;flex-wrap: nowrap" >
              <span class="item-act item-minus" id="test" @click='minusCount(index)'>-</span>
              <span class="item-num" style="color:rgba(155,0,0,1)">0</span>
              <span class="item-num">{{goods.count}}</span>
              <span class="item-num" style="color:rgba(155,0,0,1)">0</span>
              <span class="item-act item-plus" @click='incCount(index)'>+</span>
            </div>
          </li>
        </ul>
      </div>

      <div class="dropdown" style="position: absolute;bottom: 120px;right: 15px;left: 15px">
        <span class="cart-title" style="font-size: 11px">我的优惠券</span>
        <a id="select" href="#"class="dropdown-toggle" data-toggle="dropdown" style="">
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

      <div class="cart-sum"style="position: absolute;bottom: 65px;font-size: 14px">总计:{{totalMoney}}  优惠价:{{price}}<span style="font-size: 10px">
        {{activityDes}}{{couponDes}}</span></div>

      <div class="pay-sub">
        <span style="margin-right: 15px">支付方式</span>
        <!--<div href="#" @click="pay('alipay_wap')" style=""><img src="../public/img/alipay.png"></div>-->
        <div href="#" @click="pay('wx_pub')"><img src="../public/img/wechatpay.png"></div>
        <div href="#" @click="pay('balance')"><img src="../public/img/modu.png"></div>
        <div href="#" style=""></div>
        <!--<button @click="pay('balance')">余额支付</button>-->
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
        goodsCount:'goodsCount',
        itemAddedCount:'itemAddedCount',
        configItemAdded:'configItemAdded',
        openId:'openId',
        
      }),
      couponList: function(){
        var list = [];
        if(this.couponInfo.isGet)
          list = this.couponInfo.couponList;
        else{
          list[0] = {};
          list[0].description = '没有可以使用的优惠券';
        }
        return list;
      },
      price : function(){
        return this.calculatePrice();
      }

    },
    data()
    {
      return {
        url: 'http://api.shmddm.com/',
        couponDes: '',
        activityDes: '',
        realPrice: 0,
        couponIndex: 0,
        useCoupon : false,
        couponId : -1,
        recWayIndex: -1,
        isSelectCoupon : false,
      }
    },
    methods: {
      enterOrder:function(){
        this.$store.dispatch('setNavBarCount',2);
        this.$store.dispatch('setFuncTab','我的订单');
      },
      resetData:function(){
        this.recWayIndex = -1;
        this.couponDes = '';
        this.useCoupon = false;
        this.isSelectCoupon = false;
      },
      closeCart: function () {
        $('body').css({
          'overflow-y':'auto'
        })
        this.resetData();
        this.$store.dispatch("showCart", false);
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
        if(this.recWayIndex == -1){
          alert('请选择取餐方式');
          return;
        }
        var deskId = -1;
        if(this.recWayIndex == 1){
          deskId = document.getElementById("deskId").value;
          if(deskId == ''  || isNaN(deskId)){
            alert('请输入正确的桌号');
            return;
          }
        }
        var recTips = '';
        if(this.recWayIndex == 1){
          recTips = '请注意您选择的取餐方式：送餐到' + deskId + '号座位。';
        }
        else{
          recTips = '请注意您选择的取餐方式：到收银台自取。';
        }
       
        if (!window.confirm(recTips + '确定支付'+this.realPrice+'元?'))
          return;

       // this.calculatePrice();

        if (payWay == 'balance' || this.realPrice == 0) {
          this.payBalance(deskId);
        }
        else {
          var isUse = false;
          var api = this.url + 'getChargeNew'
          var param = {
            channel: payWay,
            amount: this.realPrice * 100,
            orderInfo: this.orderInfo,
            desk_id: deskId,
            store_id: 1,
            price: this.totalMoney,
            realPrice: this.realPrice,
            couponDes: this.activityDes + ' ' + this.couponDes,
            openId:this.openId,
          }
          if(this.useCoupon){
            param.coupon_id = this.couponId;
            this.useCoupon = false;
            isUse = true;
          }
          this.$http.post(api,param).then((response) => {
            if(isUse){
              this.resetCouponGetAfterUse(); //使用优惠券后更新本地优惠券数据
            }
            this.closeCart();
            this.enterOrder();
            pingpp.createPayment(response.data, function (result, err) {
              if (result == "success") {
                alert('支付成功!请刷新订单,并关注订单编号及状态,魔都的面祝您用餐愉快');
              } else if (result == "fail") {
                alert('支付失败，请刷新订单');
              } else if (result == "cancel") {
                alert('支付取消');
              }
            });
          }, (response) => {
            console.log('get charge error');
          });
        }
      },
      payBalance: function (deskId) {
        if (this.personalInfo.hasCard == 1 && this.personalInfo.balance >= this.realPrice) {
          var api = this.url + 'deduct';
          var param = {};
          var isUse = false;
          param.amount = this.realPrice;
          param.orderInfo = this.orderInfo;
          param.desk_id = deskId;
          param.store_id = 1;
          param.price = this.totalMoney;
          param.realPrice = this.realPrice;
          param.openId = this.openId;
          if(this.useCoupon){
            param.coupon_id = this.couponId;
            this.useCoupon = false;
            isUse = true;
          }
          param.couponDes = this.activityDes + ' ' + this.couponDes;
          this.$http.post(api, param).then((response) => {
            console.log('post balance deduct ');
            if (response.data.code == 'success') {
              this.$store.dispatch('modifyBalance', this.handleDecimal(this.personalInfo.balance - this.realPrice));
              if(isUse){
                this.resetCouponGetAfterUse();   //使用优惠券后更新本地优惠券数据
              }
              alert('支付成功!请关注订单编号及状态，魔都的面祝您用餐愉快');
              this.closeCart();
              this.enterOrder();
              this.getHistoryOrder();
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
          if(this.isSelectCoupon)
            this.calculateCoupon(true);
        }
        else if(this.isSelectCoupon)
          this.calculateCoupon(false);
        console.log('des ' + this.activityDes + this.couponDes);
        this.realPrice = this.handleDecimal(this.realPrice);
        this.realPrice = this.realPrice > 0 ? this.realPrice : 0;
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
          this.activityDes = ' 全店活动: ' + this.activityInfo.activities[0].catalogue + ' '
                           + this.activityInfo.activities[0].description;
        }
        else
          this.activityDes = '';
      },
      selectCoupon:function(index){
        if(this.couponInfo.isGet && this.couponInfo.couponList.length != 0){
          this.couponIndex = index;
          this.isSelectCoupon = true;
          this.useCoupon = false;
          this.couponDes = '';
          this.couponId = this.couponInfo.couponList[index].id;
          document.getElementById('select').innerText = this.couponInfo.couponList[index].description;
        }
      },
      resetCouponDisplay:function(){
        document.getElementById('select').innerText = "点击选择";
        this.couponDes = '';
      },
      calculateCoupon:function(hasActivity){
        this.isSelectCoupon = false;
        var coupon = this.couponInfo.couponList[this.couponIndex];
        var type = coupon.type;
        if(type == 3){
          var name = coupon.catalogue;
          for(var i in this.orderInfo){
            if(this.orderInfo[i].name == name && this.orderInfo[i].count >= 1){
              this.realPrice = this.handleDecimal(this.realPrice - this.orderInfo[i].price);
              this.useCoupon = true;
              this.couponDes = (' 优惠券: ' + coupon.description);
              break;
            }
          }
          return;
        }
        if(hasActivity)
          return;
        var amount1 = coupon.amount1;
        var amount2 = coupon.amount2;
        var discount = coupon.discount;
        var catalogues = coupon.catalogue.split(';');  //可以优惠的类型
        var catPrice = this.cataloguePrice();   //每种类型的计价
        var price = 0;
        var temp = {};
        temp.original = 0;      //订单中不算在优惠券分类里的总价，无优惠按原价
        temp.modify = 0;        //订单中在优惠券分类里的总价，按优惠价
        var isModify = false;
        for(var catalogue in catPrice){
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
            price = temp.modify * (discount / 10);   //打amount1折
            if(isModify)
              isDeduct = true;
            break;
        }
        price += temp.original;
        this.realPrice = this.handleDecimal(price);
        if(isDeduct){
          this.useCoupon = true;
          this.couponDes = ' 优惠券:' + coupon.catalogue + ' ' + coupon.description;
        }
        else
          this.couponDes = '';
      },
      resetCouponGetAfterUse:function(){
        var data = {};
        data.isGet = false;
        data.couponList = [];
        this.$store.dispatch('setCouponInfo',data)
      },
      incCount:function(index){
        var id = this.orderInfo[index].id;
        this.$store.dispatch('setGoodsCount',this.goodsCount + 1);
        this.$store.dispatch('setTotalMoney',this.handleDecimal(this.totalMoney + this.orderInfo[index].price));
        this.$store.dispatch('incOrderInfo',index);
        var length = 0;
        for(var key in this.itemAddedCount)
          ++length;
        if(index + 1 <= length){
          var obj = this.itemAddedCount;
          if(id in obj)
            ++obj[id];
          this.$store.dispatch('setItemAddedCount',obj);
        }
        else{
          this.$store.dispatch('incConfigItemCount',id);
        }
        this.resetCouponDisplay();
      },
      minusCount:function(index){
        var id = this.orderInfo[index].id;
        this.$store.dispatch('setGoodsCount',this.goodsCount - 1);
        this.$store.dispatch('setTotalMoney',this.handleDecimal(this.totalMoney - this.orderInfo[index].price));
        this.$store.dispatch('minusOrderInfo',index);
        var length = 0;
        for(var key in this.itemAddedCount){
          if(this.itemAddedCount[key] != 0){
            ++length;
          }
        }
        if(index + 1 <= length){
          var obj = this.itemAddedCount;
          if(id in obj)
            --obj[id];
          this.$store.dispatch('setItemAddedCount',obj);
        }
        else{
          this.$store.dispatch('minusConfigItemCount',id);
        }
        this.resetCouponDisplay();
      },
      handleDecimal:function(num){
        var length = 0;
        if(num.toString().split('.')[1] != null){
          length = num.toString().split('.')[1].length;
        }
        if(length > 2){
          return Math.round(num*100)/100;
        }
        return num;
      },
      getHistoryOrder:function(){
        var api = this.url + 'order';
        var param = {};
        param.openId = this.openId;
        this.$http.post(api,param).then((response) => {
            console.log('get history order from server');
            this.$store.dispatch('setHistoryOrder',response.data.historyOrder);
          }, (response) => {
            console.log('get history order error');
          });
      }

    }
  }
</script>

<style scoped>
  #cart-mask {
    color: white;
    background-color: rgba(0, 0, 0, .4);
    position: fixed;
    z-index: 1000;
    top:0;
    right: 0;
    left:0;
    bottom:0;
    width: 100%;
    height: 100%;
    margin: auto; 
  }

  #cart-modal {
    padding: 8px;
    position: fixed;
    z-index: 1000;
    margin: auto;
    height: 80%;
    /*width: 80%;*/
    top: 5%;
    left: 8%;
    right: 8%;
    background-color: rgba(155,0,0,1);
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

  .cart-item {
    font-size: 13px;
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
    text-align: left;
    left: 0px;
    right: 0px;
    display: flex;
    flex-wrap: nowrap;
    margin: 10px auto;
    background-color: darkred;
    position: absolute;
    font-size: 16px;
    bottom: 0px;
    padding: 5px;
    line-height: 24px;
    height: 55px;
  }

  .pay-sub span{
    align-self: center;
    flex: 2;
  }
  .pay-sub div{
    margin-right: 5px;
    flex: 1;
  }
  .pay-sub button {
    background-color: darkred;
    color: black;
    border:0;
  }

  .pay-sub button {
    font-size: 11px;
    color: white;
  }
  .cart-self,.cart-send{
    flex: 3;background-color: rgba(237,190,190,.8);margin: 0 10px;
    border-radius: 4px;line-height: 26px;height: 26px;
    color: darkred;
  }
  .cart-title{
    float: left;
    font-size: 11px;
  }
  .cart-cont{
    clear: both;
    font-size: 13px;
  }
  .cart-cont ul li div{
    font-size: 13px;
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
    width: 20px;
    height: 20px;
    line-height: 20px;
    background-color: white;
    border-radius: 50%;
    color: #000;

  }
  .dropdown .cart-title{
    font-size: 13px;
    margin-top: 3px;
  }
  .pay-sub div{
    display: inline-block;
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
  .pay-sub img{
    width: 100%;
    height: 100%;
    border-radius: 6px;
  }
  .active{
    background-color: lightcoral;
  }
</style>

