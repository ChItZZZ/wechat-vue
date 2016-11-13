/**
 *
 * Created by my on 11/12/16.
 */
import {
  SHOW_MODAL,
  SET_NAVBAR_COUNT,
  SHOW_MINUS,
  SHOW_CART
} from './mutation-type'

const mutations = {
  // 显示模态框
  [SHOW_MODAL] (state, isShow) {
    state.isModalShow = isShow
  },
  [SET_NAVBAR_COUNT] (state,count){
    state.navBarCount = count;
  },
  [SHOW_MINUS] (state, isShow){
    state.isMinusShow = isShow;
  },
  [SHOW_CART] (state, isShow){
    state.isCartShow = isShow
  }
}


export default mutations
