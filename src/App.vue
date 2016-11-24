<template>
  <div id="app">

    <!--<mt-button type="default" ref="default-button" @click="something">default</mt-button>-->
    <!--<mt-button type="primary">primary</mt-button>-->
    <!--<mt-button type="danger">danger</mt-button>-->


    <Ad class="ad"></Ad>
    <Modal ></Modal>
    <Cart></Cart>
    <div class="main" >
      <NavBar class="nav" id="nav"></NavBar>
      <NavBar2 class="nav" id="nav"></NavBar2>
      <NavBar3 class="nav" id="nav"></NavBar3>
      <BtmBar></BtmBar>
    </div>
    <div class="fixed-cart" @click="showCart">购物车</div>
    <Container class="cont"></Container>
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
  import Cart from './components/Cart.vue'
  import Message from './components/Message.vue'

  export default {
    name: 'app',
    components: {
      Ad, NavBar, NavBar2, NavBar3, BtmBar, Container, Modal, Cart, Message
    },
    data(){
      return {
        url : 'http://api.qiancs.cn/'
      }
    },
    computed: {
      ...mapGetters({
        item_data:'item_data',
        itemAddedCount:'itemAddedCount',
        configItemAdded:'configItemAdded',
      }),
    },
    created:function(){
       this.getItemsFromServer();
       this.getPersonalInfo();
       this.getActivityInfo();
    },
    methods:{
      ...mapActions([
        'setItemData',
        'setPersonalInfo',
        'setActivityInfo'
      ]),
      getItemsFromServer: function () {
        var api = this.url + 'items';
        this.$http.get(api).then((response) => {
          // success callback
          this.setItemData(response.data);
          console.log('get items from server');
        }, (response) => {
          // error callback
          console.log('get server items error');
        });
      },
      getPersonalInfo: function (){
        var api = this.url + 'inquire';
        this.$http.get(api).then((response) => {
          console.log('get personal info from server ');
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
      showCart: function () {
        var obj = this.itemAddedCount;
        var items = this.item_data;
        var order = [];
        for(var id in obj){
          if(obj[id] != 0){
            var json = {};
            json.count = obj[id];
            json.id = id;
            for ( var key in items){
              var isBreak = false;
              for(var index in items[key]){
                if(items[key][index].id == id){
                  json.name = items[key][index].name;
                  json.price = items[key][index].price;
                  isBreak = true;
                  break;
                }
              }
              if(isBreak)
                break;
            }
            order.push(json);
          }
        }

        var data = this.configItemAdded;
        for(var i in data){
          if(data[i].count != 0){
            var json = {};
            json.count = data[i].count;
            json.name = data[i].name;
            json.price = data[i].price;
            json.id = data[i].id;
            var des = data[i].size;
            json.des = des;
            order.push(json);
          }
        }
        console.log('order' + JSON.stringify(order));
        var totalMoney = 0;
        for(var index in order)
          totalMoney += order[index].count * order[index].price;

        this.$store.dispatch("setTotalMoney",totalMoney);
        this.$store.dispatch("setOrderInfo",order);
        this.$store.dispatch("showModal",false);
        this.$store.dispatch('showCart',true);
      }

    },

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
    margin-left: 70px;
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
    color: #2c3e50;
    background: #000 url(public/img/bg3.png) 0 / cover fixed;
    min-height: 100vh;
  }
  .ad{
    position: fixed;
    top:0;
  }
  .fixed-cart{
    z-index: 10002;
    position: fixed;
    bottom: 50px;
    color: white;
    right: 15px;
    border-radius: 50%;
    line-height: 65px;
    width: 65px;
    height: 65px;
    background-color: rgba(177,0,0,.8);
    border: 2px solid black;
    box-shadow: 5px 5px 10px #888888;
  }
</style>
