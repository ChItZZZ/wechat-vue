<template>
  <div class="item-info">
    <div class="item-img"><img src="../../src/public/img/item1.png" style="width: 100%;height: 100%"></div>
    <ItemText></ItemText>
    <ItemAct></ItemAct>
  </div>
</template>


<script>
  import ItemAct from '../components/ItemAct.vue'
  import ItemText from '../components/ItemText.vue'
  export default {
    data(){
      return {
        doSomething: function () {
          $('.item-action').html('asdas')
        }
      }
    },
    components:{
      ItemAct,ItemText
    }
  }
</script>

<style scoped>
  .item-info {
    margin-left: 70px;
    color: black;
    background-color: rgba(255, 255, 255, .6);
    height: 100px;
    display: flex;
    flex:5;
    padding: 0;
  }

  .item-img {
    flex: 2;
  }

</style>
