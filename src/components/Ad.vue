<template>
  <!--<img src="../public/img/bg2.png">-->
  <!--<div id="ad"><img src="../public/img/bg2.png"></div>-->
<div style="height: 130px;z-index: 1000">
    <!--<img src="../public/img/bg2.png">-->
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item active">
      <img src="../public/img/bg2.png" alt="...">
    </div>
    <div class="item">
      <img src="../public/img/bg2.png" alt="...">
    </div>
    <div class="item">
      <img src="../public/img/bg2.png" alt="...">
    </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
    <span class="sr-only">Next</span>
  </a>
</div>

</div>
</template>
<style scoped>
  #ad{
    width: 100%;
  }
  img{
    max-height: 130px;
    z-index:1000;
    width: 100%;
    height: 100%;
  }
</style>
