<template>
  <div id="app">

    <!--<mt-button type="default" ref="default-button" @click="something">default</mt-button>-->
    <!--<mt-button type="primary">primary</mt-button>-->
    <!--<mt-button type="danger">danger</mt-button>-->

    <Ad class="ad"></Ad>
    <Modal slot="test"></Modal>
    <div class="main">
      <NavBar class="nav" id="nav"></NavBar>
      <BtmBar></BtmBar>
      <ul>
        <Container class="cont"  ></Container>
      </ul>
    </div>
  </div>

</template>

<script>
  import Hello from './components/Hello'
  import Ad from './components/Ad.vue'
  import NavBar from './components/NavBar.vue'
  import BtmBar from './components/BtmBar.vue'
  import Container from './components/Container.vue'
  import Modal from './components/Modal.vue'

  export default {
    name: 'app',
    components: {
      Ad, NavBar, BtmBar, Container, Modal
    },
    data(){
      return {
      }
    },
    methods: {
      something: function () {
      }
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
