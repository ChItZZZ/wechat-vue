<template>
  <div class="story-container" v-if='isCurFuncTab'>
    <div class="story-content1">
      <p class="story-title">本店活动信息介绍</p>
    </div>
    <div class="story-content2" v-show='this.info.hasActivity == 1'>

        <p class="story-title">全场{{info.catalogue}} {{info.description}}</p>
        <p>活动时间：{{info.startDate}} 至 {{info.endDate}}</p>
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
        info:'activityInfo',
      }),
      isCurFuncTab:function(){
        if(this.curFuncTab2 == '活动福利' && this.curNavBar == 3)
          return true;
        return false;
      },
      activity:function(){
        var obj = {};
        if(this.info.hasActivity == 0){
          obj.catalogue = '';
          obj.description = '';
          obj.startData = '';
          obj.endData = '';
        }
        else{
          obj.catalogue = this.info.activities[0].catalogue;
          obj.description = this.info.activities[0].description;
          obj.startData = this.info.startDate.substring(0,10);
          obj.endData = this.info.endDate.substring(0,10);
        }
        return obj;
      }
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
  .story-container {
    text-align: center;
    margin-left: 70px;
    padding: 150px 20px 40px 20px;
    flex-grow: 5;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background-color: rgba(255, 255, 255, .6);
    min-height: 100vh;
    font-weight: 500;
  }

  .story-content1 {
    /*height: 40px;*/
    padding: 10px;
    color: black;
    font-size: 13px;
  }

  .story-content2 {
    margin-left:70px;
    text-align: left;
    color: black;
    position: absolute;
    bottom: 40px;
    top: 300px;
    left: 10px;
    right: 20px;
    font-size: 12px;
    font-weight: 500;
    padding: 5px;
  }

  .story-title{
    font-weight: 700;
    font-size:13px;
  }
</style>