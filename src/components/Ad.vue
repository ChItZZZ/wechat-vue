<template>
  <!--<img src="../public/img/bg2.png">-->
  <!--<div id="ad"><img src="../public/img/bg2.png"></div>-->
<div style="height: 130px;z-index: 1000;right: 0;left: 0">
    <!--<img src="../public/img/bg2.png">-->
<div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
  <!-- Indicators -->
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" :data-slide-to="index" :class="{active:index==0}" v-for="(pic,index) in picUrls"></li>
    <!--<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>-->
  </ol>

  <!-- Wrapper for slides -->
  <div class="carousel-inner" role="listbox">
    <div class="item" :class="{active:index==0}"  v-for="(pic,index) in picUrls">
      <img :src=pic alt="...">
    </div>
    <!--<div class="item active">
      <img src="../public/img/bg2.png" alt="...">
    </div>
    <div class="item">
      <img src="../public/img/bg2.png" alt="...">
    </div>
    <div class="item">
      <img src="../public/img/bg2.png" alt="...">
    </div>
    <div class="item">
      <img src="../public/img/bg2.png" alt="...">
    </div>-->
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

<script>
  import { mapGetters } from 'vuex'

  export default {
     computed: {
      ...mapGetters({
        info:'activityInfo',
      }),
      pictures:function(){
        if( this.info.hasActivity == 1 && !this.isAdd ){
          this.picUrls.push(this.info.activities[0].imageUrl);
          this.isAdd = true;
        }
        return this.picUrls;
      },
    },
    data(){
      return{
        url : 'http://api.shmddm.com/',
        picUrls : [],
        isAdd : false,
      }
    },
    created:function(){
      // this.picUrls.push("../public/img/bg2.png");
      // this.picUrls.push("../public/img/bg2.png");
      // this.picUrls.push("../public/img/bg2.png");

      this.getHeadPic();
    },
    methods:{
      getHeadPic:function(){
        var api = this.url + 'getHeaderPic';
        this.$http.get(api).then((response) => {
          console.log('get head pictures ');
          for(var i in response.data.HeaderPicture){
            var url = response.data.HeaderPicture[i].picture_path
            this.picUrls.push(url);
          }
        }, (response) => {
          // error callback
          console.log('get head pictures error');
        });
      }
    },

  }

</script>

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
