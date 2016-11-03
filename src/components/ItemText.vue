<template>
  <div class="item-text">
    <p class="line-one">牛肉面<i class="fa fa-user"></i></p>
    <p class="line-two">月销量 88 份 <i class="glyphicon glyphicon-thumbs-up"></i></p>
    <p class="line-three">22元/份<span style="text-decoration: line-through;margin-left: 10px">65</span></p>
  </div>
</template>

<style scoped>
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
