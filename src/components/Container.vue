<template>
  <ul>
    <li class="item-info" v-for="item in goods">
      <div class="item-img"><img :src="item.imageUrl" style="width: 100%;height: 100%"></div>
      <div class="item-text">
        <p class="line-one">{{item.name}}<i class="fa fa-user"></i></p>
        <p class="line-two">月销量 {{item.sels}} 份 <i class="glyphicon glyphicon-thumbs-up"></i></p>
        <p class="line-three">{{item.price}} 元/份<span style="text-decoration: line-through;margin-left: 10px">65</span></p>
      </div>
      <ItemAct></ItemAct>
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
          item_data:'item_data'
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
    data(){
      return {
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
