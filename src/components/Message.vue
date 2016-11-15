<template>
  <div class="msg">
    <div class="tag" style="margin: 18px auto;">请留言</div>
    <textarea class="text"></textarea>
    <div class="btn-msg">
      <button class="btn btn-default btn-sub">提交</button>
    </div>
  </div>
</template>
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
