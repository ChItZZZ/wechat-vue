<template>

  <ul class="menu" id="ul" v-show="curBarCount==3">
    <li class="active">333</li>
    <li>333</li>
    <li>333</li>
  </ul>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
 computed: {
    ...mapGetters({
      curBarCount: 'navBarCount',
    })
    
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
    font-size: 16px;
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
