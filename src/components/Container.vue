<template>
  <ul>
    <li class="item-info" v-for="item in items">
      <div class="item-img"><img src="../../src/public/img/item1.png" style="width: 100%;height: 100%"></div>
      <div class="item-text">
        <p class="line-one">{{item.name}}<i class="fa fa-user"></i></p>
        <p class="line-two">月销量 88 份 <i class="glyphicon glyphicon-thumbs-up"></i></p>
        <p class="line-three">{{item.price}} 元/份<span style="text-decoration: line-through;margin-left: 10px">65</span></p>
      </div>
      <ItemAct></ItemAct>
    </li>
  </ul>
</template>


<script>
  import ItemAct from '../components/ItemAct.vue'
  export default {
    props:{
      films:{
        type:Array,
        required:true
      }
    },
    data(){
      return {
        items: [{
          name: "鱼丸面",
          price:123,
          src:"../../src/public/img/item2.png"
        },{
          name:"牛肉面",
          price:12
        }]
      }
    },

    components: {
      ItemAct
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
    flex: 5;
    padding: 0;
  }

  .item-img {
    flex: 2;
  }

  .item-text {
    flex: 3;
    text-align: left;
  }

  .item-text p {
    margin: 5px;
  }

  .line-one {
    margin-top: 20px;
    height: 32px;
    line-height: 46px;
    font-size: 18px;
  }

  .line-two {
    color: black;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
  }

  .line-three {
    height: 32px;
    line-height: 18px;
    font-size: 16px;
    color: red;
  }

</style>
