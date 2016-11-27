<template>
  <table class="bar">
    <tr>
      <th :class="{active:curCount==1}" @click="clickBar(1)">快速点餐</th>
      <th :class="{active:curCount==2}" @click="clickBar(2)">我是面粉</th>
      <th :class="{active:curCount==3}" @click="clickBar(3)">魔都的面</th>
    </tr>
  </table>


</template>
<script>
  import { mapActions } from 'vuex'

  export default {
    data () {
      return {
        curCount: 1
      }
    },
    methods: {
      ...mapActions([
        'setNavBarCount'
      ]),
      clickBar(count)
      {
        this.curCount = count;
        this.setNavBarCount(count);
      }
    }

  }

</script>
<style scoped>
  .bar {
    /*min-height: 100vh;*/
    width: 100%;
    margin: 0;
    padding: 0;
    position: fixed;
    z-index: 10023;
    align-self: stretch;
    align-items: stretch;
    /*flex: 1;*/
    background-color: rgba(0, 0, 0, .6);
    /*position: absolute;*/
    overflow-y: auto;
    /*  width: 70px; */
    overflow-x: hidden;
    bottom: 0;
    /*z-index: 1000;*/
  }

  .bar th {
    height: 40px;
    font-size: 14px;
    /*background-color: rgba(0,0,0,.4);*/
    min-width: 55px;
    color: white;
    border-right: 1px solid black;
    text-align: center;

  }

  .bar .active {
    background-color: rgba(0, 0, 0, .8);
  }
</style>
