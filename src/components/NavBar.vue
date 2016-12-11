<template>
  <ul class="menu" id="ul" v-show="curBarCount==1">
    <li v-for="(item,index) in menu" :class="{active:isCur == index}" @click="clickTab(index)">{{item}}</li>
  </ul>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        curBarCount: 'navBarCount',
        item_data:'item_data'
      }),
      menu: function(){
        var data = [];
        for(var i in this.item_data)
        {
          data.push(i);
        }
        return data;
      }
    },
    methods: {
      ...mapActions([
        'setTabIndex'
      ]),
      clickTab(index)
      {

//        if($('[curIndex="index"]').length != 0){
//          $('[curIndex="index"]').show();
//        }
//        else {
          this.isCur = index;
          this.setTabIndex(index);
//        }
      }
    },
    data(){
      return {
        isCur: 0
      }
    }
  }
</script>

<style scoped>
  .menu {
    margin: 0;
    padding: 0;
    position: absolute;
    align-self: stretch;
    align-items: stretch;
    background-color: rgba(0, 0, 0, .4);
    overflow-y: auto;
    width: 100%;
    overflow-x: hidden;
    top: 0;
    bottom: 40px;
    z-index: 100;
  }

  .menu li {
    height: 60px;
    font-size: 1.2em;
    list-style: none;
    line-height: 60px;
    min-width: 55px;
    color: white;
    border-bottom: 1px solid black;

  }

  .menu li.active {
    background-color: rgba(0, 0, 0, .8);
  }
</style>
