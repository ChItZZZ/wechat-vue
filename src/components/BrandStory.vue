<template>
  <div class="story-container" v-if='isCurFuncTab'>
    <div class="story-content1">
      <p class="story-title">魔都的面经营理念</p>
      <p>打造清洁的店铺空间</p>
      <p>提供新鲜的优质食材</p>
      <p>传递热情的幸福微笑</p>
      <p>感动顾客的极致体验</p>
    </div>
    <div class="story-content2">

        <p class="story-title">魔都的面企业故事</p>
        <p>魔都的面始于一个最简单的想法：开一家和朋友欢聚还能吃到美食的小店，于是四个大男孩在2016年的秋天，开了一家温暖的点，期待在这里遇见最温暖的你！</p>
        <p>我们年轻但是坚持梦想把店铺开向全国，我们逗逼但执着态度把美食带给大家，坚持每天用天然的椰子水熬汤，新鲜的土鸡蛋和面，
            传统的古法技艺做浇头，健康的食材，纯粹的调料撞出有爱的味道，熬出精致的情感，喝出丝丝的回忆，煮出时间的味道，体验传统的滋味</p>
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
      }),
      isCurFuncTab:function(){
        if(this.curFuncTab2 == '品牌故事' && this.curNavBar == 3)
          return true;
        return false;
      },
    },
    data(){
      return{
        url : 'http://api.shmddm.com/'
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
    /*position: relative;*/
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
    margin-left: 70px;
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