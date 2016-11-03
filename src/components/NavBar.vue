<template>
  <!--<el-menu default-active="2" class="el-menu-vertical-demo" @open="handleopen" @close="handleclose" >-->
    <!--<el-submenu index="1">-->
      <!--<template slot="title"><i class="el-icon-message"></i>导航一</template>-->
      <!--<el-menu-item-group title="分组一">-->
        <!--<el-menu-item index="1-1">选项1</el-menu-item>-->
        <!--<el-menu-item index="1-2">选项2</el-menu-item>-->
      <!--</el-menu-item-group>-->
      <!--<el-menu-item-group title="分组2">-->
        <!--<el-menu-item index="1-3">选项3</el-menu-item>-->
      <!--</el-menu-item-group>-->
    <!--</el-submenu>-->
    <!--<el-menu-item index="2">导航一</el-menu-item>-->
    <!--<el-menu-item index="2">导航二</el-menu-item>-->
    <!--<el-menu-item index="3">导航三</el-menu-item>-->
  <!--</el-menu>-->
  <ul class="menu" id="ul">
    <li class="active">123</li>
    <li>123</li>
    <li>123</li>
  </ul>
</template>
<script>
  export default {


  }

</script>
<style scoped>
  .menu{
    /*width: 25%;*/
    /*min-height: 100vh;*/
    margin:0;
    padding: 0;
    position: absolute;
    align-self: stretch;
    align-items: stretch;
    /*flex: 1;*/
    background-color: rgba(0,0,0,.4);
    /*position: absolute;*/
    overflow-y: auto;
    width: 70px;
    overflow-x: hidden;
    top:130px;
    bottom: 0;
  }
  .menu li{
    height: 60px;
    font-size: 16px;
    /*background-color: rgba(0,0,0,.4);*/
    list-style: none;
    line-height: 60px;
    min-width:55px;
    color: white;
    border-bottom:1px solid black;

  }
  .menu li.active{
    background-color: rgba(0,0,0,.8);
  }
</style>
