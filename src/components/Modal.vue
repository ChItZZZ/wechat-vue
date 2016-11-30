<template>
  <div id="mask" v-show="isModalShow">
    <div id="modal">
      <img :src="curItem.imageUrl" id="detail-img">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeModal"></a>
      <div id="detail-food">
        <div class="part-one">
          <ul class="food-size">
            <li v-for="(size,index) in curItemConfig.size" class="select-food" :class="{active:curSizeIndex==index}"
                @click="curSizeIndex=index">{{size}}</li>
            </li>
            <!--<li class="select-food active">1123123123</li>
            <li class="select-food">1123123123</li>-->
          </ul>
        </div>
        <div class="part-two">
          <div class="recommend-food">
            <i class="glyphicon glyphicon-chevron-left"></i>
            <img v-for="item in configItemInfo" :src="item.imageUrl" class="recommend-img">
            <!--<img src="../public/img/egg.jpeg" class="recommend-img">
            <img src="../public/img/egg.jpeg" class="recommend-img">
            <img src="../public/img/egg.jpeg" class="recommend-img">
            <img src="../public/img/egg.jpeg" class="recommend-img">-->
            <i class="glyphicon glyphicon-chevron-right"></i>
          </div>
        </div>
        <div class="part-three">
          <div class="food-act">
            <button class="cart" @click="addToCart">加入购物车</button>
            <button class="pay" @click="showCart">直接结算{{goodsCount}}</button>
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
    overflow: hidden;
  }

  #modal {
    position: absolute;
    z-index: 1000;
    margin: auto;
    height: 60%;
    top: 20%;
    left: 8%;
    right: 8%;
    border: 2px solid darkred;
  }
  .recommend-food i{
    color: white;
    padding: 12px 6px;
    /*background-color: rgba(0,0,0,.6);*/
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

  li {
    list-style: none;
  }

  .left-part {
    position: absolute;
    left: 5px;
    height: 100%
  }

  .right-part {
    position: absolute;
    right: 5px;
    height: 100%;
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

  .img {
    left: 40px;
    height: 100%;
    position: absolute;
    right: 40px;
  }

  .recommend-food {
    position: absolute;
    bottom: 10px;
  }

  .recommend-img {
    width: 18%;
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
        itemConfig:'itemConfig',
        configItemAdded:'configItemAdded',
        personalInfo:'personalInfo',
        couponInfo:'couponInfo',
        goodsCount:'goodsCount'
      }),
      curItem: function () {
        var item = {};
        var items = [];
        var i = 0;
        for (var key in this.item_data) {
          if (i == this.tabIndex) {
            items = this.item_data[key];
            break;
          }
          ++i;
        }
        for (var index in items) {
          if (items[index].id == this.itemId) {
            item = items[index];
            break;
          }
        }
        return item;
      },
      curItemConfig: function () {
        var id = this.itemId;
        if (id in this.itemConfig)
          return this.itemConfig[id];
        else {
          var temp = {size: ['加载中...'],};
          return temp;
        }
      },
      configItemInfo: function () {
        var itemsName = this.curItemConfig.recommend;
        var data = this.item_data;
        var info = [];
        for (var i in itemsName) {
          for (var key in data) {
            for (var index in data[key]) {
              if (data[key][index].name == itemsName[i]) {
                var obj = {};
                obj.name = data[key][index].name;
                obj.price = data[key][index].price;
                obj.id = data[key][index].id;
                obj.imageUrl = data[key][index].imageUrl;
                info.push(obj);
              }
            }
          }
        }
        return info;
      }
    },
    data(){
      return {
        curSizeIndex:0,
        url:'http://api.qiancs.cn/'
      };
    },
    methods: {
      closeModal: function () {
        this.$store.dispatch("showModal", false);
      },
      showCart: function () {
        var obj = this.itemAddedCount;
        var items = this.item_data;
        var order = [];  //  组装 order = [{"count":1,"id":"57","name":"香槟","price":20,"catalogue":"酒水"}] 并可能有detail:大份加辣
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
                  json.catalogue = items[key][index].cls;
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
        for (var i in data) {
          if (data[i].count != 0) {
            var json = {};
            json.count = data[i].count;
            json.name = data[i].name;
            json.price = data[i].price;
            json.catalogue = data[i].catalogue;
            json.id = data[i].id;
            var detail = data[i].size;
            //var detail = data[i].flavor;
            json.detail = detail;
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

        this.getCouponList();
      },
      getCouponList: function(){
        if(this.personalInfo.hasCard == 0 || this.couponInfo.isGet)
          return;

        var api = this.url + 'coupon';
        var param = {};
        param.card_id = this.personalInfo.cardNumber;
        this.$http.post(api,param).then((response) => {
          console.log('post coupon info' + JSON.stringify(response.data));
          var data = {};
          data.isGet = true;
          data.couponList = response.data.couponList;
          this.$store.dispatch('setCouponInfo',data)
        }, (response) => {
          console.log('post coupon info error');
        });
      },
      addToCart: function(){
        if(window.confirm('加入购物车?')){
          var obj = {};
          var item = this.curItem;
          obj.id = item.id;
          obj.name = item.name;
          obj.price = item.price;
          obj.catalogue = item.cls;
          obj.size = this.curItemConfig.size[this.curSizeIndex];
        //  obj.flavor = 
          obj.count = 1;
          this.$store.dispatch("addConfigItemAdded",obj);
          var count = this.goodsCount + 1;
          this.$store.dispatch('setGoodsCount',count);
        }
      },

    },
  }
</script>
