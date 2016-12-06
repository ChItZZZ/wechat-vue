<template>
  <div class="item-info" v-if="isCurFuncTab">
    <div class="order-container">
      <div class="order-main order-one" style="border-top: 1px solid black">
        <div class="" style="display: flex;font-size: 12px">
          <div class="item-title  ticket-content">优惠券</div>
          <div class="item-title ">数量</div>
          <div class="item-title">状态</div>
          <div class="item-title">使用日期</div>
        </div>
        <div class="item-cont" style="display: flex"  v-for="coupon in list" v-show="hasCoupon">
          <div class="item-content ticket-content">{{coupon.description}}</div>
          <div class="item-content ">{{coupon.number}}</div>
          <div class="item-content ticket-unused">未使用</div>
          <div class="item-content"></div>
        </div>

      </div>
    </div>
    <div class="refresh" @click="getCouponList">
          刷新
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
        couponInfo:'couponInfo',
        personalInfo:'personalInfo',
        openId:'openId'
      }),
      isCurFuncTab:function(){
        if(this.curFuncTab == '我的优惠' && this.curNavBar == 2)
          return true;
        return false;
      },
      list: function(){
        var list = [];
        if(this.couponInfo.isGet && this.couponInfo.couponList.length != 0){
          list = this.couponInfo.couponList;
          this.hasCoupon = true;
        }
        return list;
      },

    },
    data(){
      return{
        url : 'http://api.qiancs.cn/',
        hasCoupon : false
      }
    },
    methods:{
      getCouponList: function(){
        if(this.personalInfo.hasCard == 0)
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
        alert('已刷新');
      },

    },
  }

</script>
<style scoped>
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
  .order-container {
    text-align: center;
    flex-grow: 5;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    min-height: 100vh;
    width:100%;
  }

  .order-one{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .item-cont{
    border-bottom: 1px solid rgba(0,0,0,.4);
    padding: 12px 0px;
  }
  .item-title{
    flex:1;
  }
  .item-content{
    flex: 1;
    padding: 2px;
    font-size: 11px;
    max-height: 2em;
  }
  .ticket-content{
    flex: 2;
  }
  .ticket-unused{
    padding: 3px;
    border-radius: 10px;
    background-color: lightgray;
  }
  .ticket-used{
    padding: 3px;
    border-radius: 10px;
    background-color: darkred;
    color: white;
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
</style>
