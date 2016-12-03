<template>
  <div class="item-action">
    <div class="item-minus" id="test" @click="minusItem" :class="{isHidden:num == 0}">-</div>
    <div class="item-num" :class="{isHidden:num == 0}">{{ num }}</div>
    <div class="item-plus" @click="incItem">+</div>
  </div>
</template>
<script>
  import {mapGetters,mapActions} from 'vuex';
  export default {
    computed: {
      ...mapGetters({
        isMinusShow:'isMinusShow',
        itemAddedCount:'itemAddedCount',
        goodsCount:'goodsCount',
      }),
      num:function(){
        var change = this.goodsCount;
        var obj = this.itemAddedCount;
        var id = this.itemId;
        if(id in obj)
          return obj[id];
        else
          return 0;
      }
    },
    data(){
      return {
        num:0,
        isMinusShow:true,
      }
    },
    methods:{
      ...mapActions([
        'setItemAddedCount',
        'setGoodsCount'
      ]),
      incItem:function(){
        var obj = this.itemAddedCount;
        var id = this.itemId;
        if(id in obj)
          ++obj[id];
        else
          obj[id] = 1;

        this.setItemAddedCount(obj);
        var count = this.goodsCount + 1;
        this.setGoodsCount(count);
      },
      minusItem: function () {
        var obj = this.itemAddedCount;
        var id = this.itemId;
        if(id in obj && obj[id] > 0)
        {
          --obj[id];
          this.setItemAddedCount(obj);
          var count = this.goodsCount - 1;
          this.$store.dispatch('setGoodsCount',count);
        }
        else {
          //this.hideMinusAndNum();
        }
      },
      hideMinusAndNum: function () {
        this.$store.dispatch("showMinus",false)
      }
    },
    props:['itemId']

  }
</script>
<style scoped>
  .item-action {
    flex: 2;
    /*position: relative;*/
  }

  .item-plus {
    margin-top: 40px;
    height: 19px;
    width: 19px;
    border-radius: 50%;
    font-weight: 900;
    color: #FF5F33;
    display: inline-block;
    right: 15%;
  }

  .item-num {
    display: inline-block;
    margin:auto;
    vertical-align: center;
    line-height: 100px;
  }
  .item-minus,.item-plus{
    line-height: 17px;
    border: 1px solid grey;
  }
  .item-minus {
    z-index: 0;
    height: 19px;
    width: 19px;
    margin-top: 40px;
    color: #FF5F33;
    font-weight: 900;
    border-radius: 50%;
    left: 15%;
    display: inline-block;
  }
</style>
