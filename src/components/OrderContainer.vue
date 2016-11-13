<template>
  <div class="item-info">
    <OrderList></OrderList>
  </div>
</template>


<script>
  import OrderList from '../components/OrderList.vue'
  export default {
    data(){
      return {
        doSomething: function () {
          $('.item-action').html('asdas')
        }
      }
    },
    components:{
      OrderList
    }
  }
</script>

<style scoped>
  .item-info {
    margin-left: 70px;
    color: black;
    background-color: rgba(255, 255, 255, .6);
    height: 100%;
    display: flex;
    flex:5;
    padding: 0;
  }

  .item-img {
    flex: 2;
  }

</style>
