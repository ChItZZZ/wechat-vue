<template>
  <div class="join-container" v-if='isCurFuncTab'>
    <div class="join-title">{{info.title}}</div>
    <div class="join-content">
      <p>{{info.content}}</p>
      <!--<p>{{this.date}}</p>-->
      <!--<p>
        工作时间自由,24小时随时出勤,免费品尝美食,一日三餐不要钱;全职员工包住,温馨小窝,工作努力嘉奖
      </p>-->

      <!--<div class="contact-us">
        <p class="contact-title">联系我们</p>
        <p>刘经理:1231231231</p>
        <p>刘经理:1231231231</p>
        <p>刘经理:1231231231</p>
      </div>-->
    </div>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  
  export default {
     computed: {
      ...mapGetters({
        curNavBar:'navBarCount',
        curFuncTab2:'curFuncTab2',
        shopInfo:'shopInfo',
      }),
      isCurFuncTab:function(){
        if(this.curFuncTab2 == '伯乐寻马' && this.curNavBar == 3)
          return true;
        return false;
      },
      date:function(){
        return this.shopInfo.releae_date.slice(0,10);
      },
      info:function(){
        var info = {};
        if(this.shopInfo.title == null)
          info.title = '';
        else
          info.title = this.shopInfo.title;
        if(this.shopInfo.content == null)
          info.content = '';
        else
          info.content = this.shopInfo.content;
        return info;
      }
    },
    data(){
      return{
        url : 'http://api.shmddm.com/'
      }
    }
  }

</script>

<style scoped>
  .join-container {
    text-align: center;
    margin-left: 20%;
    padding: 150px 20px 40px 20px;
    flex-grow: 5;
    /*position: relative;*/
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background-color: rgba(255, 255, 255, .6);
    min-height: 100vh;
  }

  .join-title {
    /*height: 60px;*/
    padding: 10px;
    background-color: rgba(165, 0, 0, 1);
    color: white;
    font-size: 14px;
  }

  .join-content {
    margin-left:70px;
    overflow: scroll;
    text-align: left;
    background-color: rgba(165, 0, 0, 1);
    color: white;
    position: absolute;
    bottom: 50px;
    top: 220px;
    left: 20px;
    right: 20px;
    font-size: 12px;
    padding: 13px;
  }

  .contact-title{
    text-align: left;
  }
  .join-content .contact-us {
    /*bottom: 10px;*/
    /*position: absolute;*/
  }
</style>


