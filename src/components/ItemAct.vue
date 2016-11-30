<template>
  <div class="item-action">
    <div class="item-minus" id="test" @click="minusItem" v-show="isMinusShow">-</div>
    <div class="item-num" v-show="isMinusShow">{{ _num }}</div>
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
      _num:function(){
        var change = this.num;
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

        this.changeNum();
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
          this.changeNum();
          this.setItemAddedCount(obj);
          var count = this.goodsCount - 1;
          this.$store.dispatch('setGoodsCount',count);
        }
        else {
          //this.hideMinusAndNum();
        }
      },
      changeNum:function(){
        if(this.num == 0)
          this.num = 1;
        else
          this.num = 0;
          
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
    line-height: 19px;
    border: 1px solid grey;
    border-radius: 50%;
    font-weight: 900;
    color: #FF5F33;
    display: inline-block;
    /*position: absolute;*/
    right: 15%;
  }

  .item-num {
    display: inline-block;
    margin:auto;
    vertical-align: center;
    line-height: 100px;
  }

  .item-minus {
    /*position: absolute;*/
    z-index: 0;
    line-height: 19px;
    height: 19px;
    width: 19px;
    margin-top: 40px;
    color: #FF5F33;
    font-weight: 900;
    border: 1px solid grey;
    border-radius: 50%;
    left: 15%;
    display: inline-block;
  }
</style>
