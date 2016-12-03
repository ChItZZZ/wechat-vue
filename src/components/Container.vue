<template>
  <ul v-if='curNavBar == 1'  class="container" style="padding-bottom: 40px;;margin-bottom: 0"  :class="{active:isModalShow||isCartShow,inactive:!isModalShow && !isCartShow}">
    <li class="item-info" v-for="item in goods" >
      <div class="item-img"><img :src="item.imageUrl" @click="showModal(item.id)" style="width: 100%;height: 100%"></div>
      <div class="item-text">
        <p class="line-one">{{item.name}}<i class="fa fa-user"></i></p>
        <p class="line-two">月销量 {{item.sels}} 份 <i class="glyphicon glyphicon-thumbs-up"></i></p>
        <p class="line-three">{{item.price}} 元/份</p>
      </div>
      <ItemAct :itemId="item.id"></ItemAct>
    </li>
  </ul>
</template>


<script>
  import { mapGetters } from 'vuex'
  import ItemAct from '../components/ItemAct.vue'
  export default {
     computed: {
        ...mapGetters({
          curTabIndex: 'curTabIndex',
          item_data:'item_data',
          curNavBar:'navBarCount',
          itemConfig:'itemConfig',
          isModalShow:'isModalShow',
          isCartShow: 'isCartShow'
        }),
        goods: function(){
          var data = [];
          var i = 0;
          for(var key in this.item_data)
          {
            if(i == this.curTabIndex)
            {
              data = this.item_data[key];
              break;
            }
            ++i;
          }
          return data;
        }
    },
    methods:{
      showModal: function (id) {
        if( !(id in this.itemConfig) ){
          var api = this.url + 'itemConfig?item_id=' + parseInt(id);
          this.$http.get(api).then((response) => {
            this.addItemConfig(response.data,id);
          }, (response) => {
            console.log('get server item config error');
          });
        }

        this.$store.dispatch("setItemId",id);
        this.$store.dispatch("showModal",true);
      },
      addItemConfig: function (data,id){
        var obj = {};
        obj[id] = data;
        this.$store.dispatch("setItemConfig",obj);
      }

    },
    data(){
      return {
        url:'http://api.qiancs.cn/'
      }
    },
    components: {
      ItemAct
    }
  }
</script>

<style scoped>
  body{
    overflow-y: hidden;
  }
  .active{
    margin-left: 70px;
    flex-grow: 5;
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100%;
  }
  .inactive{
    margin-left: 70px;
    padding-top: 130px;
    flex-grow: 5;
    overflow-y: hidden;
    overflow-x: hidden;
    height: 100%;
  }
  .item-info {
    border-bottom: 0.5px solid black;
    color: black;
    background-color: rgba(255, 255, 255, .6);
    height: 90px;
    display: flex;
    flex: 5;
  }

  .item-img {
    flex: 2;
    display: flex;
    align-items: center;
  }

  .item-img img{
    align-self: center;
  }

  .item-text {
    flex: 3;
    text-align: left;
    margin-left: 10px;
  }

  .item-text p {
    margin: 5px;
  }

  .line-one {
    margin-top: 13px;
    height: 28px;
    line-height: 32px;
    font-size: 16px;
  }

  .line-two {
    color: black;
    height: 20px;
    line-height: 20px;
    font-size: 11px;
  }

  .line-three {
    height: 32px;
    line-height: 18px;
    font-size: 13px;
    color: red;
  }
  .container{
    padding-left: 0;
    padding-right: 0;
  }
</style>
