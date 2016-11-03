<template>
  <div class="item-action">
    <div class="item-minus" id="test" @click="doSomething">-</div>
    <div class="item-num">12</div>
    <div class="item-plus">+</div>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        doSomething: function () {
          console.log('asdasdas');
        }
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
