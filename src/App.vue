<template>
  <div id="app">

    <!--<mt-button type="default" ref="default-button" @click="something">default</mt-button>-->
    <!--<mt-button type="primary">primary</mt-button>-->
    <!--<mt-button type="danger">danger</mt-button>-->
    <Ad class="ad"></Ad>
    <Modal ></Modal>
    <Cart></Cart>
    <div style="display: flex">
    <div class="main" v-show="true" style="flex: 1;width: 20%">
      <NavBar class="nav" id="nav"></NavBar>
      <NavBar2 class="nav" id="nav"></NavBar2>
      <NavBar3 class="nav" id="nav"></NavBar3>
    </div>
    <Container style="flex: 2"></Container>
    </div>
    <BtmBar></BtmBar>
    <vip-card></vip-card>
    <fixed-cart></fixed-cart>
    <Orders></Orders>
    <join-us></join-us>
    <BrandStory></brandstory>
    <ActivityInfo></ActivityInfo>
    <my-ticket></my-ticket>

    <Message class="cont" ></Message>

  </div>

</template>

<script>
  import { mapActions,mapGetters } from 'vuex'

  import Ad from './components/Ad.vue'
  import NavBar from './components/NavBar.vue'
  import NavBar2 from './components/NavBar2.vue'
  import NavBar3 from './components/NavBar3.vue'
  import BtmBar from './components/BtmBar.vue'
  import Container from './components/Container.vue'
  import Modal from './components/Modal.vue'
  import Orders from './components/Orders.vue'
  import Cart from './components/Cart.vue'
  import Message from './components/Message.vue'
  import FixedCart from './components/FixedCart.vue'
  import VipCard from './components/VipCard.vue'
  import JoinUs from './components/JoinUs.vue'
  import MyTicket from './components/MyTicket.vue'
  import BrandStory from './components/BrandStory.vue'
  import ActivityInfo from './components/ActivityInfo.vue'

  export default {
    name: 'app',
    components: {

      Ad, NavBar, NavBar2, NavBar3, BtmBar, Container, Modal,Cart, Message,
      FixedCart, VipCard, JoinUs, Orders, MyTicket,BrandStory,ActivityInfo
    },
    data(){
      return {
        url : 'http://api.shmddm.com/',
      }
    },
    computed: {
      ...mapGetters({
        openId:'openId',
        isModalShow:'isModalShow'
      }),
    },
    created:function(){
      this.$store.dispatch('setOpenId',this.getQueryString('openId'));
      var tab = this.getQueryString('tab');
      this.setNavBarCount(parseInt(tab));
      this.getItemsFromServer();
      this.getPersonalInfo();
      this.getActivityInfo();
    },
    methods:{
      ...mapActions([
        'setItemData',
        'setPersonalInfo',
        'setActivityInfo',
        'setNavBarCount'
      ]),
      // 硬编码满足排序需求
      sortItemCatalogue:function(itemData){
        
        var items = itemData.items;
        for(var i in items){
          var itemArr = items[i];
          var sortedArr = [];
          var max = 0;
          var maxIndex = 0;
          var len = itemArr.length;
          while(len > 0){
            for(var j in itemArr){
              if(itemArr[j].sels >= max){
                max = itemArr[j].sels;
                maxIndex = j;
              }
            }
            sortedArr.push(itemArr[maxIndex]);
            itemArr.splice(maxIndex,1);
            max = 0;
            maxIndex = 0;
            len--;
          }
          items[i] = sortedArr
        }
        var priority = itemData.priority;
        var sorted = {};
        for(var i in priority){
          sorted[priority[i]] = items[priority[i]];
        }
        this.setItemData(sorted);
      },
      getItemsFromServer: function () {
        var api = this.url + 'items';
        this.$http.get(api).then((response) => {
          // success callback
          console.log('get items from server');
          this.sortItemCatalogue(response.data);
        }, (response) => {
          // error callback
          console.log('get server items error');
        });
      },
      getPersonalInfo: function (){
        var api = this.url + 'inquire';
        var param = {};
        param.openId = this.openId;
        this.$http.post(api,param).then((response) => {
          console.log('get personal info from server ' );
          this.setPersonalInfo(response.data);
        }, (response) => {
          console.log('get personal info error');
        });
      },
      getActivityInfo: function (){
        var api = this.url + 'getActivity';
        this.$http.get(api).then((response) => {
          console.log('get Activity info from server ' );
          this.setActivityInfo(response.data);
        }, (response) => {
          console.log('get Activity info error');
        });
      },
      getQueryString:function(name){
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)
          return  unescape(r[2]);
        return null;
      },

    }

}

</script>
<style>
  body, ul {
    margin: 0;
    padding: 0;
    color: white;
  }

  .main {
    /*display: flex;*/
    align-items: stretch;
    flex: 1;
    position: fixed;
    top: 130px;
    bottom: 0;
    left: 0;
    height: 100%;
  }

  .nav {
    flex-grow: 1;
  }

  .cont {
    left: 20%;
    padding-top: 130px;
    flex-grow: 5;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
  }

  #app {
    /*display: flex;*/
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;

    min-height: 100vh;
  }
  body{
    background: #000 url(public/img/bg6.png) 0 / cover fixed;
  }
  .ad{
    position: fixed;
    top:0;
  }
  /*.fixed-cart{*/
    /*z-index: 10002;*/
    /*position: fixed;*/
    /*bottom: 50px;*/
    /*color: white;*/
    /*right: 15px;*/
    /*border-radius: 50%;*/
    /*line-height: 65px;*/
    /*width: 65px;*/
    /*height: 65px;*/
    /*background-color: rgba(177,0,0,.8);*/
    /*border: 2px solid black;*/
    /*box-shadow: 5px 5px 10px #888888;*/
  /*}*/
</style>
