<template>
  <div class="item-action">
    <div class="item-minus" id="test">-</div>
    <div class="item-num">{{ num }}</div>
    <div class="item-plus" @click="showModal">+</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        num:1
      }
    },
    methods:{
      showModal: function () {
        this.$store.dispatch("showModal",true);
      }
    }
  }
</script>
<style scoped>
  .item-action {
    flex: 2
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
  }

  .item-num {
    display: inline-block;
  }

  .item-minus {
    line-height: 19px;
    height: 19px;
    width: 19px;
    margin-top: 40px;
    color: #FF5F33;
    font-weight: 900;
    border: 1px solid grey;
    border-radius: 50%;
    display: inline-block;
  }
</style>
