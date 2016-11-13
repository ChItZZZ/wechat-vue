<template>
  <ul class="menu" id="ul" v-show="curBarCount==1">
    <li v-for="item in menu"  >{{item}}</li>
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
    props: {
      items: {
        type: Array,
        required: true
      }
    },
    data(){
      return {
        menus: [{
          name: 'ncz'
        }, {
          name: 'nicky'
        }, {
          name: "cherry"
        },{
          name: "test"
        }]
      }
    }
  }

</script>

<style scoped>
  .menu {
    /*width: 25%;*/
    /*min-height: 100vh;*/
    margin: 0;
    padding: 0;
    position: absolute;
    align-self: stretch;
    align-items: stretch;
    background-color: rgba(0, 0, 0, .4);
    overflow-y: auto;
    width: 70px;
    overflow-x: hidden;
    top: 0;
    bottom: 40px;

  }

  .menu li {
    height: 60px;
    font-size: 16px;
    /*background-color: rgba(0,0,0,.4);*/
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
