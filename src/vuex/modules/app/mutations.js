/**
 *
 * Created by my on 11/12/16.
 */
import {
  SHOW_MODAL
} from './mutation-type'

const mutations = {
  // 显示模态框
  [SHOW_MODAL] (state, isShow) {
    state.isModalShow = isShow
  }
}
export default mutations
