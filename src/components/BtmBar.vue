<template>
  <table class="bar">
      <tr>
         <th class="active">快速点餐</th>
         <th>我是面粉</th>
         <th>魔都的面</th>
       </tr>
  </table>


</template>
<script>
  export default {


  }

</script>
<style scoped>
  .bar{
    /*min-height: 100vh;*/
    width: 100%;
    margin:0;
    padding: 0;
    position: absolute;
    align-self: stretch;
    align-items: stretch;
    /*flex: 1;*/
    background-color: rgba(0,0,0,.4);
    /*position: absolute;*/
    overflow-y: auto;
  /*  width: 70px; */
    overflow-x: hidden;
    bottom: 0;
  }
  .bar th{
    height: 40px;
    font-size: 14px;
    /*background-color: rgba(0,0,0,.4);*/
    min-width:55px;
    color: white;
    border-right:1px solid black;
    text-align:center;

  }
  .bar .active{
    background-color: rgba(0,0,0,.8);
  }
</style>
