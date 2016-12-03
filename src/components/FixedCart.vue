<template>
  <div class="fixed-cart" @click="showCart" style="position: fixed;z-index: 10003;" v-show="showFix">
    <!--<div class="pay">直接付款</div>-->
    <div class="cart" ><i class="glyphicon glyphicon-shopping-cart"></i><span>{{goodsCount}}</span></div>
  </div>
</template>
<style scoped>
  .cart span{
    color: red;
    border-radius: 50%;
    display: inline-block;
    padding: 3px 5px;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    background-color: white;
  }
  .cart i {
    margin-right: 10px;
    font-size: 20px;
  }
  .cart {
    border: 1px solid darkgrey;
    justify-content: center;
    align-items: center;
    float: right;
    display: flex;
    margin-right: 10px;
    position: relative;
    background-color: rgba(165,0,0,1);
    width: 90px;
    color: white;
    padding: 3px;
    border-radius: 4px;
    height: 28px;
    z-index: 1200;
    line-height: 24px;
  }
  .glyphicon-shopping-cart{
    margin-top: -3px;
    font-size: 18px;
  }
  .fixed-cart{
    position: fixed;
    right: 3px;
    bottom: 50px;
  }
</style>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
      ...mapGetters({
        item_data:'item_data',
        itemAddedCount:'itemAddedCount',
        configItemAdded:'configItemAdded',
        personalInfo:'personalInfo',
        couponInfo:'couponInfo',
        goodsCount: 'goodsCount',
        curBarCount: 'navBarCount',
        openId:'openId',
      }),
      showFix:function(){
        if(this.curBarCount == 1)
          return true;
        return false;
      },
    },
    data(){
      return {
        url : 'http://api.qiancs.cn/'
      }
    },
    methods:{
       showCart: function () {
        var obj = this.itemAddedCount;
        var items = this.item_data;
        var order = [];
        for(var id in obj){
          if(obj[id] != 0){
            var json = {};
            json.count = obj[id];
            json.id = id;
            for ( var key in items){
              var isBreak = false;
              for(var index in items[key]){
                if(items[key][index].id == id){
                  json.name = items[key][index].name;
                  json.price = items[key][index].price;
                  json.catalogue = items[key][index].cls;
                  isBreak = true;
                  break;
                }
              }
              if(isBreak)
                break;
            }
            order.push(json);
          }
        }

        var data = this.configItemAdded;
        for (var i in data) {
          if (data[i].count != 0) {
            var json = {};
            json.count = data[i].count;
            json.name = data[i].name;
            json.price = data[i].price;
            json.catalogue = data[i].catalogue;
            json.id = data[i].id;
            var detail = data[i].size;
            //var detail = data[i].flavor;
            json.detail = detail;
            order.push(json);
          }
        }
        console.log('order' + JSON.stringify(order));
        var totalMoney = 0;
        for(var index in order)
          totalMoney += order[index].count * order[index].price;
        this.$store.dispatch("setTotalMoney",totalMoney);
        this.$store.dispatch("setOrderInfo",order);
        this.$store.dispatch("showModal",false);
        this.$store.dispatch('showCart',true);

        this.getCouponList();
      },
      getCouponList: function(){
        if(this.personalInfo.hasCard == 0 || this.couponInfo.isGet)
          return;

        var api = this.url + 'coupon';
        var param = {};
        param.card_id = this.personalInfo.cardNumber;
        param.openId = this.openId;
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

    },

  }
</script>
