<template>
<div class="item-info">

  <div class="order-container">
    <div class="order-main order-one" style="border-top: 1px solid black">
      <table>
        <tr>
          <td>日期</td>
          <td>订单码</td>
          <td>名称</td>
          <td>数量</td>
          <td>优惠</td>
          <td>金额</td>
          <td>状态</td>
        </tr>
        <hr style="width:100%"/>
      </table>
    </div>

    <div class="order-main order-two">
      <div class="order-content " style="height: 100px">
        <div class="order-cont">8/30</div>
        <div class="order-cont">0001</div>
        <div class="order-cont">红烧牛肉面</div>
        <div class="order-cont">2</div>
        <div class="order-cont">5</div>
        <div class="order-cont">78</div>
        <div class="order-unpaid">未付</div>
      </div>
      <div class="order-content " style="height: 100px">
        <div class="order-cont">8/30</div>
        <div class="order-cont">0001</div>
        <div class="order-cont">红烧牛肉面</div>
        <div class="order-cont">2</div>
        <div class="order-cont">5</div>
        <div class="order-cont">78</div>
        <div class="order-paid">已付</div>
      </div>
    </div>
    <div class="order-main order-two">
      <div class="order-content " style="height: 100px">
        <div class="order-cont">阿森纳地哦啊是你的</div>
        <div class="order-cont">IQ网合肥南送</div>
        <div class="order-cont">懊恼放弃我让你我</div>
      </div>
    </div>
 
  </div>
</div>
</template>
<style scoped>
  .item-info {
    margin-left: 70px;
    color: black;
    background-color: rgba(255, 255, 255, .6);
    height: 100%;
    display: flex;
    flex:5;
    padding: 0;
  }

  .item-img {
    flex: 2;
  }
  .order-container {
    text-align: center;
    flex-grow: 5;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    min-height: 100vh;
    width:100%;
  }

  .order-title {
    border-bottom: 1px solid white;
    background-color: darkred;
    color: white;
    font-size: 12px;
    height: 33px;
    line-height: 33px;
  }
  .order-main{
    min-height: 130px;
  }

  .order-one{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }

  .order-cont{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    align-self: -webkit-stretch;
    border-right: 0px solid black;
  }
  .order-unpaid{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    align-self: -webkit-stretch;
    background-image: url('../public/img/unpaid.png');
  }  
  .order-paid{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    align-self: -webkit-stretch;
    border-right: 0px solid black;
  }
  .order-content{
    display: flex;
    display: -webkit-flex;
  }
  table{
    width: 100%;
    font-size: 10px;
    margin-top: 10px;
  }
</style>
