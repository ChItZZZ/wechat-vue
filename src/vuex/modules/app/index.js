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
  tabIndex: 0,
  itemId : "1",
  itemAddedCount :{},
  orderInfo:[],
  totalMoney:0,
  itemConfig:{},
  isMinusShow: true,
  isCartShow: false,
}

export default{
  state,
  actions,
  getters,
  mutations
}

