<template>
  <div class="fixed-cart">
    <div class="pay">直接付款</div>
    <div class="cart"><span>11</span><i class="glyphicon glyphicon-shopping-cart"></i></div>
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
