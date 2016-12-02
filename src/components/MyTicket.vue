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
          <div class="item-content">6/30</div>
        </div>

      </div>
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
</style>
