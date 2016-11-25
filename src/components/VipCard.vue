<template>
  <div class="vip-container">
    <div class="vip-main vip-one" style="border-top: 1px solid black">
      <div class="vip-title">目前你是白金会员</div>
      <table>
        <tr>
          <td>你最爱</td>
          <td>红烧牛肉面</td>
          <td>余额:88元</td>
        </tr>
        <tr>
          <td>本月来店</td>
          <td>12次</td>
          <td>累计:38次</td>
        </tr>
        <tr>
          <td>本次消费</td>
          <td>123元</td>
          <td>累计:123元</td>
        </tr>
        <tr>
          <td>本月充值</td>
          <td>123元</td>
          <td>累计:1233元</td>
        </tr>
      </table>
    </div>
    <div class="vip-main vip-two">
      <div class="vip-title">会员说明</div>
      <div class="vip-all">
        <div class="vip-level vip-level1">星光会员</div>
        <div class="vip-level vip-level2">纯银会员</div>
        <div class="vip-level vip-level3">纯金会员</div>
        <div class="vip-level vip-level4">钻石会员</div>
      </div>
      <div class="vip-content " style="height: 100px">
        <div class="vip-cont1 vip-cont">阿森纳地哦啊是你的</div>
        <div class="vip-cont2 vip-cont">IQ网合肥南送</div>
        <div class="vip-cont3 vip-cont">懊恼放弃我让你我</div>
        <div class="vip-cont4 vip-cont">弄得是非农是哪位偶然呢我</div>
      </div>
    </div>
    <div class="vip-main vip-three">
      <div class="vip-title">魔都的面 充值(优惠)</div>
    </div>
  </div>
</template>
<style scoped>
  .vip-container {
    text-align: center;
    margin-left: 70px;
    padding-top: 130px;
    flex-grow: 5;
    padding-bottom: 40px;
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    background-color: rgba(255,255,255,.6);
    min-height: 100vh;
  }

  .vip-title {
    border-bottom: 1px solid white;
    background-color: darkred;
    color: white;
    font-size: 12px;
    height: 33px;
    line-height: 33px;
  }
  .vip-main{
    min-height: 130px;
  }
  .vip-level{
    flex: 1;
    background-color: darkred;
    color: white;
    font-size: 10px;
    border-right: 1px solid black;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
    padding: 3px;
  }
  .vip-level:last-child{
    border: 0;
    display: flex;

  }
  .vip-two{
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: stretch;
  }
  .vip-all{
    display: flex;
    flex-direction: row;
    align-items: stretch;
    align-content: stretch;
    align-self: stretch;
  }
  .vip-cont{
    flex: 1;
    color: black;
    font-size: 10px;
    position: relative;
    bottom: 0;
    align-items: stretch;
    flex-direction: column;
    align-self: stretch;
  }
  .vip-content{
    display: flex;
    display: -webkit-flex;
  }
  .vip-cont{
    align-self: stretch;
    align-self: -webkit-stretch;
    border-right: 1px solid black;
  }
  .vip-cont:last-child{
    border: 0;
  }
  table{
    width: 100%;
    font-size: 11px;
    margin-top: 10px;
  }
</style>
