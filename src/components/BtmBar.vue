<template>
  <table class="bar">
    <tr>
      <th :class="{active:curBarCount==1}" @click="clickBar(1)">快速点餐</th>
      <th :class="{active:curBarCount==2}" @click="clickBar(2)">我的订单</th>
      <th :class="{active:curBarCount==3}" @click="clickBar(3)">关于我们</th>
    </tr>
  </table>


</template>
<script>
  import { mapActions,mapGetters } from 'vuex'

  export default {
    data () {
      return {
      }
    },
    computed: {
      ...mapGetters({
          curBarCount: 'navBarCount'
      }),
    },
    methods: {
      ...mapActions([
        'setNavBarCount',
        'setFuncTab',
      ]),
      clickBar(count)
      {
        this.setNavBarCount(count);
        // switch(count){
        //   case 2:
        //     this.setFuncTab('我是会员');
        //     break;
        //   default:
        //     break;
        // }
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
    background-color: rgba(0,0,0,.7);
    overflow-y: auto;
    overflow-x: hidden;
    bottom: 0;
  }

  .bar th {
    height: 40px;
    font-size: 14px;
    /*background-color: rgba(0,0,0,.4);*/
    color: white;
    min-width: 55px;
    border-right: 1px solid black;
    text-align: center;

  }

  .bar .active {
    background-color: rgba(0, 0, 0, .8);
    color: white;
  }
</style>
