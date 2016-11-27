/**
 *
 * Created by my on 11/12/16.
 */

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isModalShow: false,
  isMinusShow: true,
  isCartShow: false,
  navBarCount: 1,
  item_data: {},
  tabIndex: 0,
  itemId : "1",
  itemAddedCount :{},
  configItemAdded:[],
  orderInfo:[],
  totalMoney:0,
  itemConfig:{},
  curFuncTab:"",
  personalInfo:{},
  activityInfo:{},
  shopInfo:{},
  couponInfo:{isGet: false},
  historyOrder:[],
  goodsCount:0,
  
}

export default{
  state,
  actions,
  getters,
  mutations
}

