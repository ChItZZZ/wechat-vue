/**
 * Created by my on 11/13/16.
 */
export const showModal = ({commit}, isShow) => {
  commit('SHOW_MODAL', isShow)
}

export const showMinus = ({ commit }, isShow) => {
  commit('SHOW_MINUS', isShow)
}
export const showCart = ({ commit }, isShow) => {
  commit('SHOW_CART', isShow)
}

export const setNavBarCount = ({ commit }, count) => commit('SET_NAVBAR_COUNT',count)

export const setItemData = ({commit}, item_data) => commit('SET_ITEM_DATA',item_data)

export const setTabIndex = ({ commit }, index) => commit('SET_TAB_INDEX',index)

export const setItemId = ({ commit }, id) => commit('SET_ITEM_ID',id)

export const setItemAddedCount = ({ commit }, itemAddedCount) => commit('SET_ITEM_COUNT',itemAddedCount)

export const setOrderInfo = ({ commit }, orderInfo) => commit('SET_ORDER_INFO',orderInfo)

export const setTotalMoney = ({ commit }, money) => commit('SET_TOTAL_MONEY',money)

export const setItemConfig = ({ commit }, itemConfig) => commit('SET_ITEM_CONFIG',itemConfig)

export const setFuncTab = ({ commit }, funcTab) => commit('SET_FUNC_TAB',funcTab)

export const setFuncTab2 = ({ commit }, funcTab) => commit('SET_FUNC_TAB2',funcTab)

export const addConfigItemAdded = ({ commit }, configItemAdded) => commit('ADD_CONFIG_ITEM_ADDED',configItemAdded)

export const setPersonalInfo = ({ commit }, personalInfo) => commit('SET_PERSONAL_INFO',personalInfo)

export const setActivityInfo = ({ commit }, activityInfo) => commit('SET_ACTIVITY_INFO',activityInfo)

export const setShopInfo = ({ commit },shopInfo) => commit('SET_SHOP_INFO',shopInfo)

export const modifyBalance = ({ commit },amount) => commit('MODIFY_BALANCE',amount)

export const setCouponInfo = ({ commit },coupon) => commit('SET_COUPON_INFO',coupon)

export const setHistoryOrder = ({ commit },order) => commit('SET_HISTORY_ORDER',order)

export const setGoodsCount = ({ commit },count) => commit('SET_GOODS_COUNT',count)

export const setCouponGet = ({ commit },isGet) => commit('SET_COUPON_GET',isGet)

export const incOrderInfo = ({ commit },index) => commit('INC_ORDER_INFO',index)

export const minusOrderInfo = ({ commit },index) => commit('MINUS_ORDER_INFO',index)

export const incConfigItemCount = ({ commit },id) => commit("INC_CONFIG_ITEM_COUNT",id)




