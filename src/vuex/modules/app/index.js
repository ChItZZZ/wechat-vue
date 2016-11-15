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
  isMinusShow: true,
  isCartShow: false,
  cart:[{
    name:"牛肉面",
    count:2,
    price:12
  },{
    name:"叉烧面",
    count:1,
    price:122
  }],
  isCur:1
}

export default{
  state,
  actions,
  getters,
  mutations
}

