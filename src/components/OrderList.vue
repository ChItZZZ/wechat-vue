<template>
  <div class="item-text">
    <tr class="orderTitle">
        <td style="width:15%">日期</td>
        <td style="width:15%">商品</td>
        <td style="width:15%">优惠</td>
        <td style="width:15%">实付</td>
        <td style="width:20%">支付方式</td>
        <td style="width:10%">订单码</td>
        <td style="width:10%">状态</td>
    </tr>
    <hr/>
    <div id='ordersDiv'>
      <tr v-for="order in orderslist">
        <td style="width:15%">{{ order.date }</td>
        <td style="width:15%">{{ order.name }}</td>
        <td style="width:15%">{{ order.isCoupon }}</td>
        <td style="width:15%">{{ order.payNum }}</td>
        <td style="width:20%">{{ order.payWay }}</td>
        <td style="width:10%">{{ order.orderID }}</td>
        <td style="width:10%">{{ order.state }}</td> 
      </tr>
    </div>
    <tr class="orderList">
        <td style="width:15%">8/30</td>
        <td style="width:15%">牛肉面</td>
        <td style="width:15%">无</td>
        <td style="width:15%">35</td>
        <td style="width:20%">支付宝</td>
        <td style="width:10%">0011</td>
      
      <td style="width:10%;">未付</td> 
    </tr>
  </div>
</template>

<style scoped>
  .item-text {
    flex: 7;
    text-align: left;
  }

  .item-text tr {
    margin: 5px;
  }

  .item-text tr td{
      text-align: center;      
  }

  .orderTitle {
    margin-top: 20px;
    height: 20px;
    line-height: 46px;
    font-size: 18px;
  }
  .orderList {
    height: 20px;
    line-height: 46px;
    font-size: 18px;
  }

</style>

