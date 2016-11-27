<template>
<div class="item-info" v-if='isCurFuncTab'>
  <div class="order-container">
    <div class="order-main order-one" style="border-top: 1px solid black">
        <div class="" style="display: flex;font-size: 12px">
          <div class="item-title">日期</div>
          <!--<div class="item-title item-id">订单码</div>-->
          <div class="item-title item-name">商品名称</div>
          <div class="item-title">数量</div>
          <div class="item-title">优惠</div>
          <div class="item-title">金额</div>
          <div class="item-title">状态</div>
        </div>
        <div class="item-cont" style="display: flex">
          <div class="item-content">8/30</div>
          <!--<div class="item-content item-id">0001</div>-->
          <div class="item-content item-name">招牌三鲜牛肉面</div>
          <div class="item-content">2</div>
          <div class="item-content">5元</div>
          <div class="item-content">89</div>
          <div class="item-content item-used">已出</div>
        </div>
        <div class="item-cont" style="display: flex">
          <div class="item-content">8/30</div>
          <!--<div class="item-content item-id">0001</div>-->
          <div class="item-content item-name">招牌三鲜牛肉面</div>
          <div class="item-content">2</div>
          <div class="item-content">5元</div>
          <div class="item-content">89</div>
          <div class="item-content item-unused">未出</div>
        </div>
        <div class="item-cont" style="display: flex">
          <div class="item-content">8/30</div>
          <!--<div class="item-content item-id">0001</div>-->
          <div class="item-content item-name">招牌三鲜牛肉面</div>
          <div class="item-content">2</div>
          <div class="item-content">5元</div>
          <div class="item-content">89</div>
          <div class="item-content item-used">已出</div>
        </div>
        </tbody>
      </table>
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
        curFuncTab:'curFuncTab'
      }),
      isCurFuncTab:function(){
        if(this.curFuncTab == '我的订单' && this.curNavBar == 2)
          return true;
        return false;
      },
    },
    data(){
      return{
        url : 'http://api.qiancs.cn/'
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
    border-radius: 8px;
  }
  .item-unused{
    padding: 2px;
    background-color: darkred;
    color: white;
    border-radius: 8px;
  }
</style>
