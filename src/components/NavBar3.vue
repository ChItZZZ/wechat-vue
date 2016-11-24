<template>

  <ul class="menu" id="ul" v-show="curBarCount==3">
    <li v-for="item in funcTabIndex" :class="{active:curFuncTab == item}" @click="clickTab(item)">{{item}}</li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
 computed: {
    ...mapGetters({
      curBarCount: 'navBarCount',
      shopInfo:'shopInfo',
    })   
  },
  data(){
    return {
      curFuncTab: "活动福利",
      funcTabIndex:["活动福利","倾听留言","伯乐寻马","品牌故事"]
    }
  },
  methods:{
    clickTab:function(item){
      this.curFuncTab = item;
      this.$store.dispatch('setFuncTab',this.curFuncTab);

      if(item == '伯乐寻马'){
        if( !('title' in this.shopInfo) ){
          var api = 'http://api.qiancs.cn/' + 'getRecruit';
          this.$http.get(api).then((response) => {
            console.log('get shop info from server' + JSON.stringify(response.data));
            this.$store.dispatch('setShopInfo',response.data);
          }, (response) => {
            console.log('get shop info error');
          });
        }
      }
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
