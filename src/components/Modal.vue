<template>
  <div id="mask" v-show="isModalShow">
    <div id="modal">
      <img :src="curItem.imageUrl" id="detail-img">
      <a href="javascript:;" class="glyphicon glyphicon-remove modal-close" @click="closeModal"></a>
      <div id="detail-food">
        <div class="part-one">
          <ul class="food-size">
            <li v-for="(size,index) in curItemConfig.size" class="select-food" :class="{active:curSizeIndex==index}"
                @click="curSizeIndex=index">{{size}}</li>
            </li>
            
          </ul>
        </div>
        <div class="part-two">
          <div class="recommend-food">
            <i class="glyphicon glyphicon-chevron-left btn-disabled" ref="case-left" :class="{'btn-disabled':showIndex == 0}" @click="minusShowIndex" v-if="configItemInfo.length != 0"></i>

            <div class="recommend-p" v-for="(item,i) in configItemInfo" :class="{isHidden:item.name == 'test'}">
              <div class="recommend-pimg"><img :src="item.imageUrl" class="recommend-img"  @click="selectrecItemIndex(i)"></div>
              <div class="recommend-pprice"><span class="case-price">{{item.name}}<div>{{item.price}}元</div></span></div>
            </div>

            <i class="glyphicon glyphicon-chevron-right" ref="case-right" :class="{'btn-disabled': showIndex == maxShowIndex}" @click="addShowIndex" v-if="configItemInfo.length != 0"></i>
          </div>
          <div class="recommend-check">
              <i class="glyphicon glyphicon-chevron-left" style="visibility: hidden"></i>
            <span v-for="(item,i) in configItemInfo"  :class="{isHidden:item.name == 'test'}" @click="selectrecItemIndex(i)">
              <i class="glyphicon glyphicon-ok check-active" style="display: none" :checkIndex="i" v-show="recItemIndex[i] == 1"></i></span>
              <i class="glyphicon glyphicon-chevron-right"  style="visibility: hidden"></i>
          </div>

        </div>
        <div class="part-case">
          <div class="part-case-name"  v-for="(flavor,index) in curItemConfig.flavor"
           :class="{active:curFlavorIndex[index] == 1}"  @click="selectFlavor(index)">{{flavor}}</div>
        </div>
        <div class="part-three">
          <div class="food-act">
            <button class="cart" @click="addToCart">加入购物车</button>
            <button class="pay" @click="showCart">直接结算</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
  #mask {
    background-color: rgba(0, 0, 0, .4);
    position: fixed;
    z-index: 1000;
    width: 100%;
    height: 100%;
    margin: auto;
    overflow: hidden;
  }

  #modal {
    position: fixed;
    z-index: 1000;
    margin: auto;
    height: 70%;
    top: 15%;
    left: 8%;
    right: 8%;
    border: 2px solid darkred;
  }
  .recommend-food i:before{
    align-self: center;
  }
  .recommend-food i.btn-disabled{
      background-color: darkgrey;
      color: white;
  }
  .glyphicon-chevron-left,.glyphicon-chevron-right{
      position:relative;z-index: 100;
      color: white;
      padding: 12px 6px;
      background-color: rgba(60,0,0,1);
      display: flex;
      max-width: 26px;
      border: 1px solid rgba(80,0,0,1);
      margin-left: -2px;
  }
  #detail-food {
    height: 60%;
    position: relative;
    background-color: rgba(155,0,0,1);
  }

  #detail-img {
    width: 100%;
    height: 40%
  }

  li {
    list-style: none;
  }

  .modal-close {
    position: absolute !important;
    right: 2px;
    color: white;
    background-color: black;
    display: block;
    height: 29px;
    width: 29px;
    border-radius: 50%;
    line-height: 29px !important;
  }


  .recommend-food {
    position: absolute;
    top: 5px;;
    display: flex;
    right: 0;
    background-color: darkred;
    left: 0;
  }

  .recommend-food img.active{
    border: 1px solid black;
  }
  .recommend-img {
    width: 18%;
    height: 100%;
  }

  .food-size {
    position: absolute;
    left: 35px;
    top: 5px;
    right: 35px;
  }

  .select-food {
    background-color: rgba(89, 8, 9, 1);
    margin-top: 5px;
    border-radius: 10px;
    font-size: 13px;
    color: white;
  }

  .select-food.active {
    background-color: black;
  }

  .food-act {
    /*position: absolute;*/
    bottom: 0;
    text-align: center;
    margin: auto;
    position: relative;
    bottom: 0;
  }

  .food-act button {
    color: darkred;
    background-color: rgba(255, 233, 249, .9);
    border-radius: 3px;
    width: 115px;
    font-size: 12px;
    border: 0;
    padding: 5px 6px;
  }

  .part-one {
    height: 30%;
  }

  .part-two {
    height: 30%;
    margin-top: 5px;
    position: relative;
  }

  .part-case{
    height: 13%;
    margin-top: 20px;
  }
  .part-three {
    /*height: 15%;*/
  }
  .recommend-check{
    position: relative;
    top: 40px;
      display: flex;
  }
  .recommend-check .hidden{
      visibility: hidden;
  }
  .recommend-check span{
    /*width: 18%;*/
    height: 100%;
      flex: 1;

    display: inline-block;
  }
  .glyphicon-ok{
    border-radius: 50%;
      /*position: absolute;*/
    color: white;
    background-color: green;
    width: 18px;
    height: 18px;
    bottom: 40%;
  }
  .glyphicon-ok:before{
    line-height: 16px;
      font-size: 9px;
  }

  .part-case-name{
    display: inline-block;
    width: 19%;
    padding: 2px;
    background-color: white;
    color: black;
    font-size: 11px;
    border-radius: 7px;
    margin-right: 10px;
  }
  .part-case-name.active{
    background-color: rgba(0,0,0,.8);
      color: white;
  }
  .recommend-p{
    display: inline-block;
    flex: 1;
    flex-direction: column;
    font-size: 10px;
    color: white;
      margin: 2px;;
  }
  .recommend-p img{
    width: 100%;
    height: 50px;
  }
</style>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters({
        isModalShow: 'isModalShow',
        item_data:'item_data',
        itemId:'curItemId',
        tabIndex:'curTabIndex',
        itemAddedCount:'itemAddedCount',
        itemConfig:'itemConfig',
        configItemAdded:'configItemAdded',
        personalInfo:'personalInfo',
        couponInfo:'couponInfo',
        goodsCount:'goodsCount',
        openId:'openId',
        isRecharged:'isRecharged',
        curTabIndex: 'curTabIndex',
      }),
      curItem: function () {
        var item = {};
        var items = [];
        var i = 0;
        for (var key in this.item_data) {
          if (i == this.tabIndex) {
            items = this.item_data[key];
            break;
          }
          ++i;
        }
        for (var index in items) {
          if (items[index].id == this.itemId) {
            item = items[index];
            break;
          }
        }
        return item;
      },
      curItemConfig: function () {
        var id = this.itemId;
        if (id in this.itemConfig)
          return this.itemConfig[id];
        else {
          var temp = {size: ['加载中...'],};
          return temp;
        }
      },
      configItemInfo: function () {
        var itemsName = this.curItemConfig.recommend;
        var data = this.item_data;
        var info = [];
        for (var i in itemsName) {
          for (var key in data) {
            for (var index in data[key]) {
              if (data[key][index].name == itemsName[i]) {
                var obj = {};
                obj.name = data[key][index].name;
                obj.price = data[key][index].price;
                obj.id = data[key][index].id;
                obj.imageUrl = data[key][index].imageUrl;
                obj.catalogue = data[key][index].cls;
                info.push(obj);
              }
            }
          }
        }
          // while(info.length%3 != 0){
          //     info.push({
          //         name:'test',
          //     })
          // }
        return info;
      },
      maxShowIndex: function(){
        this.maxShowIndex = Math.floor(this.configItemInfo.length/4);
        return Math.floor(this.configItemInfo.length/4);
      }
    },
    data(){
      return {
        curSizeIndex:-1,
        url:'http://api.shmddm.com/',
        showIndex:0,
        curFlavorIndex:[0,0,0],
        recItemIndex:[0,0,0]
      }
    },
    methods: {
      selectFlavor:function(index){
        if(this.curFlavorIndex[index] == 1)
          this.curFlavorIndex[index] = 0;
        else
          this.curFlavorIndex[index] = 1;
        var temp = [];
        for(var i in this.curFlavorIndex){
          temp.push(this.curFlavorIndex[i]);
        }
        this.curFlavorIndex = temp;
      },
      selectrecItemIndex:function(index){       
        if(this.recItemIndex[index] == 1)
          this.recItemIndex[index] = 0;
        else
          this.recItemIndex[index] = 1;
        var temp = [];
        for(var i in this.recItemIndex){
          temp.push(this.recItemIndex[i]);
        }
        this.recItemIndex = temp;
      },
      resetSelect:function(){
        this.recItemIndex = [0,0,0];
        this.curSizeIndex = -1;
        this.curFlavorIndex = [0,0,0];
        this.recItemIndex = [0,0,0];
      },
      closeModal: function () {
        $('body').css({
            'overflow-y':'auto'
        })
        this.resetSelect();
        this.$store.dispatch("showModal", false);
      },
      showCart: function () {
        this.addToCart();
        var obj = this.itemAddedCount;
        var items = this.item_data;
        var order = [];  //  组装 order = [{"count":1,"id":"57","name":"香槟","price":20,"catalogue":"酒水"}] 并可能有detail:大份加辣
        for(var id in obj){
          if(obj[id] != 0){
            var json = {};
            json.count = obj[id];
            json.id = id;
            for ( var key in items){
              var isBreak = false;
              for(var index in items[key]){
                if(items[key][index].id == id){
                  json.name = items[key][index].name;
                  json.price = items[key][index].price;
                  json.catalogue = items[key][index].cls;
                  isBreak = true;
                  break;
                }
              }
              if(isBreak)
                break;
            }
            order.push(json);
          }
        }

        var data = this.configItemAdded;
        for (var i in data) {
          if (data[i].count != 0) {
            var json = {};
            json.count = data[i].count;
            json.name = data[i].name;
            json.price = data[i].price;
            json.catalogue = data[i].catalogue;
            json.id = data[i].id;
            var detail = data[i].size + ' ' + data[i].flavor;
            json.detail = detail;
            order.push(json);
          }
        }
        console.log('order' + JSON.stringify(order));
        var totalMoney = 0;
        for(var index in order)
          totalMoney += order[index].count * order[index].price;
        this.$store.dispatch("setTotalMoney",this.handleDecimal(totalMoney));
        this.$store.dispatch("setOrderInfo",order);
        this.closeModal();
        this.$store.dispatch('showCart',true);
        this.getInfo();
      },
      getInfo:function(){
        if(this.isRecharged){
          var api = this.url + 'inquire';
          var param = {};
          param.openId = this.openId;
          this.$http.post(api,param).then((response) => {
            console.log('get personal info from server ');
            this.$store.dispatch('setPersonalInfo',response.data);
            this.$store.dispatch('setRecharged',false);
            this.getCouponList();
          }, (response) => {
            console.log('get personal info error');
          });
        }
        else
          this.getCouponList();
      },
      getCouponList: function(){
        if(this.personalInfo.hasCard == 0 || this.couponInfo.isGet)
          return;
        var api = this.url + 'coupon';
        var param = {};
        param.card_id = this.personalInfo.cardNumber;
        param.openId = this.openId;
        this.$http.post(api,param).then((response) => {
          console.log('post coupon info' + JSON.stringify(response.data));
          var data = {};
          data.isGet = true;
          data.couponList = response.data.couponList;
          this.$store.dispatch('setCouponInfo',data)
        }, (response) => {
          console.log('post coupon info error');
        });
      },
      addToCart: function(){
        for(var i in this.recItemIndex){
          if(this.recItemIndex[i] == 1){
            var obj = this.itemAddedCount;
            var id = this.configItemInfo[i].id;
            if(this.detectIsSaleOut(id,this.configItemInfo[i].catalogue)){
              alert(this.configItemInfo[i].name + '已售罄');
            }
            else{
              if(id in obj)
                ++obj[id];
              else
                obj[id] = 1;
              this.$store.dispatch('setItemAddedCount',obj);
              this.$store.dispatch('setGoodsCount',this.goodsCount + 1);
            }
          }
        }
        var obj = {};
        var item = this.curItem;
        obj.id = item.id;     
        obj.name = item.name;
        obj.catalogue = item.cls;
        if(this.detectIsSaleOut(obj.id,obj.catalogue)){
          alert(obj.name + '已售罄');
          return;
        }
        obj.price = item.price;
        obj.size = this.curSizeIndex == -1 ? '' : this.curItemConfig.size[this.curSizeIndex];
        //obj.flavor = this.curFlavorIndex == -1 ? '' : this.curItemConfig.flavor[this.curFlavorIndex];
        var flavor = '';
        for(var i in this.curFlavorIndex){
          if(this.curFlavorIndex[i] == 1){
            flavor = flavor + ' ' + this.curItemConfig.flavor[i];
          }
        }
        obj.flavor= flavor;
        obj.count = 1;
        this.$store.dispatch("addConfigItemAdded",obj);
        this.$store.dispatch('setGoodsCount',this.goodsCount + 1);
       // this.resetSelect();
        this.closeModal();
      },
      addShowIndex:function(){
        if( this.showIndex <= this.maxShowIndex){
          return;
        }
        this.showIndex++;
      },
      minusShowIndex:function(){
        if(this.showIndex>0){
          this.showIndex--;
        }
      },
      handleDecimal:function(num){
        var length = 0;
        if(num.toString().split('.')[1] != null){
          length = num.toString().split('.')[1].length;
        }
        if(length > 2){
          return Math.round(num*100)/100;
        }
        return num;
      },
      detectIsSaleOut:function(id,cls){
        var i = 0;
        var data = this.item_data[cls];
        for(var index in data){
          if(data[index].id == id && data[index].saleOut == 'Y')
            return true;
        }
        return false;
      },

    },
  }
</script>
