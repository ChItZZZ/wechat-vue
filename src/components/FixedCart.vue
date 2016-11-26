<template>
  <div class="fixed-cart">
    <div class="pay">直接付款</div>
    <div class="cart" @click="showCart"><span>11</span><i class="glyphicon glyphicon-shopping-cart"></i></div>
  </div>
</template>
<style scoped>
  .cart span{
    color: red;
    border-radius: 50%;
    display: inline-block;
    margin-right: 10px;
    padding: 3px 2px;
    font-size: 10px;
    font-weight: bold;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    background-color: white;
  }
  .cart, .pay {
    justify-content: center;
    align-items: center;
    float: right;
    display: flex;
    margin-right: 10px;
    position: relative;
    background-color: darkred;
    width: 80px;
    color: white;
    border-radius: 8px;
    height: 24px;
    line-height: 24px;
  }
  .fixed-cart{
    position: fixed;
    right: 3px;
    bottom: 50px;
  }
</style>

<script>
  export default {
    methods:{
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

        this.getCouponList();
      }
    }
  }
</script>
