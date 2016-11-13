/**
 *
 * Created by my on 11/12/16.
 */
import {
  SHOW_MODAL,
  SET_NAVBAR_COUNT,
  SET_ITEM_DATA,
  SHOW_MINUS,
  SHOW_CART
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
  [SHOW_MINUS] (state, isShow){
    state.isMinusShow = isShow;
  },
  [SHOW_CART] (state, isShow){
    state.isCartShow = isShow
  }
}


export default mutations
