/**
 *
 * Created by my on 11/12/16.
 */

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isModalShow: false,
  navBarCount: 1,
  item_data: {},
  isMinusShow: true,
  isCartShow: false,
  cart:[{
    name:"牛肉面",
    count:2,
    price:12
  }],
  isCur:1
}

export default{
  state,
  actions,
  getters,
  mutations
}

