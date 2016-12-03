<template>

  <ul class="menu" id="ul" v-show="curBarCount==2">
    <li v-for="item in funcTabIndex" :class="{active:curFuncTab == item}" @click="clickTab(item)">{{item}}</li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
 computed: {
    ...mapGetters({
      curBarCount: 'navBarCount',
      personalInfo: 'personalInfo',
      couponInfo: 'couponInfo',
      openId:'openId',
    })
  },
  data(){
    return {
      curFuncTab: "我是会员",
      funcTabIndex:["我是会员","我的优惠","我的订单"],
      url : 'http://api.qiancs.cn/'
    }
  },
  created: function(){
    this.clickTab("我是会员");
  },
  methods:{
    clickTab:function(item){
      this.curFuncTab = item;
      this.$store.dispatch('setFuncTab',this.curFuncTab);

      switch(this.curFuncTab){
        case "我的订单":
          this.getHistoryOrder();
          break;
        case "我的优惠":
          this.getCouponList();
          break;
      }
    },
    getHistoryOrder:function(){
      var api = this.url + 'order';
      var param = {};
      param.openId = this.openId;
      this.$http.post(api,param).then((response) => {
          console.log('get history order from server' + JSON.stringify(response.data));
          this.$store.dispatch('setHistoryOrder',response.data.historyOrder);
        }, (response) => {
          console.log('get history order error');
        });
    },
    getCouponList: function(){
      if(this.personalInfo.hasCard == 0 || this.couponInfo.isGet)
        return;
      var api = this.url + 'coupon';
      var param = {};
      param.card_id = this.personalInfo.cardNumber;
      param.openId = this.openId;
      this.$http.post(api,param).then((response) => {
        console.log('post coupon info');
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
  .menu{
    /*width: 25%;*/
    /*min-height: 100vh;*/
    margin:0;
    padding: 0;
    position: absolute;
    align-self: stretch;
    align-items: stretch;
    background-color: rgba(0,0,0,.4);
    overflow-y: auto;
    width: 70px;
    overflow-x: hidden;
    top:0;
    bottom: 40px;

  }
  .menu li{
    height: 60px;
    font-size: 14px;
    /*background-color: rgba(0,0,0,.4);*/
    list-style: none;
    line-height: 60px;
    min-width:55px;
    color: white;
    border-bottom:1px solid black;

  }
  .menu li.active{
    background-color: rgba(0,0,0,.8);
  }
</style>
