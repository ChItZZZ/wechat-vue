<template>
  <div id="mask" v-show="isModalShow">
    <div id="modal">
      <img :src="curItem.imageUrl" id="detail-img">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeModal"></a>
      <div id="detail-food">
        <div class="part-one">
          <ul class="food-size">
            <li v-for="(size,index) in sizes" class="select-food" :class=" {active:isCur==index}" @click="isCur=index">{{size.name}}</li>
          </ul>
        </div>
        <div class="part-two">
          <div class="recommend-food">
            <img src="../public/img/egg.jpeg" class="recommend-img">
            <img src="../public/img/egg.jpeg" class="recommend-img">
            <img src="../public/img/egg.jpeg" class="recommend-img">
            <img src="../public/img/egg.jpeg" class="recommend-img">
          </div>
        </div>
        <div class="part-three">
          <div class="food-act">
            <button class="cart" @click="showCart">购物车</button>
            <button class="pay">直接结算</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
  #mask {
    background-color: rgba(0, 0, 0, .4);
    position: absolute;
    width: 100%;
    height: 100%;
    margin: auto;
  }

  #modal {
    position: relative;
    z-index: 1000;
    margin: auto;
    height: 60%;
    width: 70%;
    top: 20%;
    border: 2px solid darkred;
  }

  #detail-food {
    height: 50%;
    position: relative;
    background-color: darkred;
  }

  #detail-img {
    width: 100%;
    height: 50%
  }
  li{
    list-style: none;
  }
  .modal-close {
    position: absolute !important;
    right: 2px;
    color: white;
    background-color: black;
    display: block;
    height: 29px;
    width: 29px;
    border-radius: 50%;
    line-height: 29px !important;
  }

  .recommend-food {
    bottom: 12px;
    position: absolute;

  }

  .recommend-img {
    width: 20%;
    height: 100%;

  }

  .food-size {
    position: absolute;
    left: 35px;
    top: 12%;
    right: 35px;

  }

  .select-food {
    background-color: rgba(89, 8, 9, 1);
    margin-top: 5px;
    border-radius: 10px;
    font-size: 14px;
    color: white;
  }

  .select-food.active {
    background-color: black;
  }

  .food-act {
    /*position: absolute;*/
    bottom: 0;
    text-align: center;
    margin: auto;
    position: relative;
    bottom: 0;
  }

  .food-act button {
    color: darkred;
    background-color: rgba(255, 233, 249, .9);
    border-radius: 15px;
    width: 80px;
    font-size: 13px;
    border: 0;
  }

  .part-one {
    height: 40%;
  }

  .part-two {
    height: 40%;
    position: relative;
  }

  .part-three {
    height: 20%;
  }

</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        isModalShow: 'isModalShow',
        item_data:'item_data',
        itemId:'curItemId',
        tabIndex:'curTabIndex',
        itemAddedCount:'itemAddedCount',
      }),
      curItem: function(){
        var item = {};
        var items = [];
        var i = 0;
        for(var key in this.item_data)
        {
          if(i == this.tabIndex)
          {
            items = this.item_data[key];
            break;
          }
          ++i;
        }
        for(var index in items)
        {
          if(items[index].id == this.itemId)
          {
            item = items[index];
            break;
          }
        }
        return item;
      }
    },
    data(){
      return {
        isCur:0,
        sizes:[{
          name:'牛肉面大份'
        },{
          name:"牛肉面小份"
        }]
      }
    },
    methods: {
      closeModal: function () {
        this.$store.dispatch("showModal", false)
//        store.commit("showModal",false)
      },
      showCart: function () {
        var obj = this.itemAddedCount;
        var items = this.item_data;
        var order = [];
        for(var id in obj)
        {
          if(obj[id] != 0)
          {
            var json = {};
            json.count = obj[id];
            for ( var key in items)
            {
              var isBreak = false;
              for(var index in items[key])
              {
                if(items[key][index].id == id)
                {
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
        var totalMoney = 0;
        for(var index in order)
          totalMoney += order[index].count * order[index].price;
        
        this.$store.dispatch("setTotalMoney",totalMoney);
        this.$store.dispatch("setOrderInfo",order);
        this.$store.dispatch("showModal",false);
        this.$store.dispatch('showCart',true);
      },
      selectFood: function () {
//        var $this = $(".select-food.active")
//        $this.removeClass('active');
//        console.log(this);
//        this.$set("class",'active')
      },
      
    }
  }
</script>
