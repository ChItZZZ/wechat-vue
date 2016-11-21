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
  SET_FUNC_TAB
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
  [SHOW_MINUS] (state, isShow){
    state.isMinusShow = isShow;
  },
  [SHOW_CART] (state, isShow){
    state.isCartShow = isShow
  }
}


export default mutations
