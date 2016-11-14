<template>
  <div class="item-action">
    <div class="item-minus" id="test" @click="minusItem" v-show="isMinusShow">-</div>
    <div class="item-num" v-show="isMinusShow">{{ num }}</div>
    <div class="item-plus" @click="showModal">+</div>
  </div>
</template>
<script>
  import {mapGetters} from 'vuex';
  export default {
    computed:mapGetters({
      isMinusShow:'isMinusShow',
    }),
    data(){
      return {
        num:1,
        isMinusShow:true
      }
    },
    methods:{
      showModal: function () {
        console.log(this.$data);
        this.$store.dispatch("setItemId",this.itemId);
        this.$store.dispatch("showModal",true);
        this.$store.dispatch("showMinus",true);
      },
      minusItem: function () {
        if(this.num>1){
          this.num--;
        }
        else {
          this.hideMinusAndNum();
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
    position: relative;
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
    position: absolute;
    right: 15%;
  }

  .item-num {
    display: inline-block;
    margin:auto;
    vertical-align: center;
    line-height: 100px;
  }

  .item-minus {
    position: absolute;
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
