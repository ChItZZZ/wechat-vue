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
    })
  },
  data(){
    return {
      curFuncTab: "购物车",
      funcTabIndex:["购物车","我的订单","我的优惠","我是会员"]
    }
  },
  methods:{
    clickTab:function(item){
      this.curFuncTab = item;
      this.$store.dispatch('setFuncTab',this.curFuncTab);

      switch(this.curFuncTab){
        case "我的订单":
          this.getHistoryOrder();
          break;

      }
    },
    getHistoryOrder:function(){
      this.$http.get('http://120.27.120.60:3000/order').then((response) => {
          console.log('get history order from server');
          console.log('history order '+ JSON.stringify(response.data));
        }, (response) => {
          console.log('get history order error');
        });
    }
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
