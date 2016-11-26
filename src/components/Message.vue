<template>
  <div class="msg" v-if='isCurFuncTab'>
    <div class="tag" style="margin: 18px auto;">请留言</div>
    <textarea class="text" id="content"></textarea>
    <div class="btn-msg">
      <button class="btn btn-default btn-sub" @click="submit">提交</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
     computed: {
      ...mapGetters({
        curNavBar:'navBarCount',
        curFuncTab:'curFuncTab'
      }),
      isCurFuncTab:function(){
        if(this.curFuncTab == '倾听留言' && this.curNavBar == 3)
          return true;
        return false;
      },
    },
    data(){
      return{
        url : 'http://api.qiancs.cn/'
      }
    },
    methods:{
      submit: function(){
        var api = this.url + 'addComment';
        var param = {};
        param.content = document.getElementById("content").value;
        param.name = 'haha';
        param.phone = '110';
        this.$http.post(api,param).then((response) => {
          console.log('post comment ' + response.status);
        }, (response) => {
          console.log('post comment error');
        });
      },

    },

  }

</script>
<style scoped>
  .btn-msg {
    text-align: center;
  }

  .tag {
    padding: 10px;
    background-color: darkred;
    border-radius: 5px;
    color: white;
    width: 60%;
  }

  .text {
    width: 90%;
    min-height: 240px;
  }

  .btn-sub {
    background-color: darkred;
    color: white;
    width: 75%;
    margin-top: 20px;
  }
</style>
