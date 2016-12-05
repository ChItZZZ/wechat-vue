/**
 *
 * Created by my on 11/12/16.
 */
import {
  SHOW_MODAL,
  SET_NAVBAR_COUNT,
  SET_ITEM_DATA,
  SHOW_MINUS,
  SHOW_CART,
  SET_TAB_INDEX,
  SET_ITEM_ID,
  SET_ITEM_COUNT,
  SET_ORDER_INFO,
  SET_TOTAL_MONEY,
  SET_ITEM_CONFIG,
  SET_FUNC_TAB,
  SET_FUNC_TAB2,
  ADD_CONFIG_ITEM_ADDED,
  SET_PERSONAL_INFO,
  SET_ACTIVITY_INFO,
  SET_SHOP_INFO,
  MODIFY_BALANCE,
  SET_COUPON_INFO,
  SET_HISTORY_ORDER,
  SET_GOODS_COUNT,
  SET_COUPON_GET,
  INC_ORDER_INFO,
  MINUS_ORDER_INFO,
  INC_CONFIG_ITEM_COUNT,
  MINUS_CONFIG_ITEM_COUNT,
  SET_OPEN_ID,
  SET_RECHARGED
} from './mutation-type'

const mutations = {
  // 显示模态框
  [SHOW_MODAL] (state, isShow) {
    state.isModalShow = isShow
  },
  // 选择选项卡
  [SET_NAVBAR_COUNT] (state,count){
    state.navBarCount = count;
  },
  // 设置菜品信息数据
  [SET_ITEM_DATA] (state,item_data){
      state.item_data = item_data
  },
  // 设置菜品分类索引
  [SET_TAB_INDEX] (state,index){
    state.tabIndex = index
  },
  // 设置当前选中菜品id
  [SET_ITEM_ID] (state,id){
    state.itemId = id
  },
  // 设置选中物品数量
  [SET_ITEM_COUNT] (state,itemAddedCount){
    state.itemAddedCount = itemAddedCount
  },
  // 设置订单信息
  [SET_ORDER_INFO] (state,orderInfo){
    state.orderInfo = orderInfo
  },
  // 设置总金额
  [SET_TOTAL_MONEY] (state,money){
    state.totalMoney = money
  },
  // 设置菜品配置信息
  [SET_ITEM_CONFIG] (state,itemConfig){
    state.itemConfig = itemConfig
  },
  // 设置功能选项卡
  [SET_FUNC_TAB] (state,funcTab){
    state.curFuncTab = funcTab
  },
  // 设置功能选项卡2
  [SET_FUNC_TAB2] (state,funcTab){
    state.curFuncTab2 = funcTab
  },
  // 添加订单中选过配置的菜品
  [ADD_CONFIG_ITEM_ADDED] (state,configItemAdded){
    state.configItemAdded.push(configItemAdded)
  },
  // 设置个人信息
  [SET_PERSONAL_INFO] (state,personalInfo){
    state.personalInfo = personalInfo
  },
  // 设置活动信息
  [SET_ACTIVITY_INFO] (state,activityInfo){
    state.activityInfo = activityInfo
  },
  // 设置店铺(招聘)信息
  [SET_SHOP_INFO] (state,shopInfo){
    state.shopInfo = shopInfo
  },
  // 余额变更
  [MODIFY_BALANCE] (state,amount){
    state.personalInfo.balance = amount
  },
  // 设置优惠券列表信息
  [SET_COUPON_INFO] (state,coupon){
    state.couponInfo = coupon
  },
  [SHOW_MINUS] (state, isShow){
    state.isMinusShow = isShow;
  },
  [SHOW_CART] (state, isShow){
    state.isCartShow = isShow
  },
  // 设置历史订单信息
  [SET_HISTORY_ORDER] (state,order){
    state.historyOrder = order
  },
  // 设置购物车商品数量
  [SET_GOODS_COUNT] (state,count){
    state.goodsCount = count
  },
  // 设置是否获取过优惠券
  [SET_COUPON_GET] (state,isGet){
    state.couponInfo.isGet = isGet;
  },
  // 修改购物车订单信息
  [INC_ORDER_INFO] (state,index){
    state.orderInfo[index].count++;
  },
  [MINUS_ORDER_INFO] (state,index){
    if(state.orderInfo[index].count == 1)
      state.orderInfo.splice(index,1)
    else
      state.orderInfo[index].count--;
  },
  [INC_CONFIG_ITEM_COUNT] (state,id){
    for(var i in state.configItemAdded){
      if(state.configItemAdded[i].id == id){
        state.configItemAdded[i].count++;
        break;
      }
    }
  },
  [MINUS_CONFIG_ITEM_COUNT] (state,id){
    for(var i in state.configItemAdded){
      if(state.configItemAdded[i].id == id){
        var count = state.configItemAdded[i].count;
        if(state.configItemAdded[i].count > 1)
          state.configItemAdded[i].count--;
        else
          state.configItemAdded.splice(i,1);
        break;
      }
    }
  },
  [SET_OPEN_ID] (state,id){
    state.openId = id;
  },
  [SET_RECHARGED] (state,isRecharged){
    state.isRecharged = isRecharged;
  }

}


export default mutations
