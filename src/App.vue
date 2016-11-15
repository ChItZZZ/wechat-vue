<template>
  <div id="app">

    <!--<mt-button type="default" ref="default-button" @click="something">default</mt-button>-->
    <!--<mt-button type="primary">primary</mt-button>-->
    <!--<mt-button type="danger">danger</mt-button>-->


    <Ad class="ad"></Ad>
    <Modal slot="test"></Modal>
    <Cart></Cart>
    <div class="main">
      <NavBar class="nav" id="nav"></NavBar>
      <NavBar2 class="nav" id="nav"></NavBar2>
      <NavBar3 class="nav" id="nav"></NavBar3>
      <BtmBar></BtmBar>
      <Container class="cont"></Container>
      <OrderContainer></Ordercontainer>
    </div>
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

  import OrderContainer from './components/OrderContainer.vue'

  import Cart from './components/Cart.vue'

  export default {
    name: 'app',
    components: {

      Ad, NavBar, NavBar2, NavBar3, BtmBar, Container,OrderContainer, Modal, Cart
    },
    data(){
      return {
      }
    },
    methods:{
      ...mapActions([
        'setItemData'
      ]),
      getItemsFromServer: function () {
        this.$http.get('http://wechat.qiancs.cn/items').then((response) => {
          // success callback
          this.setItemData(response.data);
          console.log('get items from server');
        }, (response) => {
          // error callback
          console.log('get server items error');
        });
      }
    },
    created:function(){
       this.getItemsFromServer()
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
    position: absolute;
    top: 130px;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .nav {
    flex-grow: 1;
  }

  .cont {
    flex-grow: 5;
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
</style>
