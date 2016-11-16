/**
 * Created by my on 11/13/16.
 */
export const showModal = ({commit}, isShow) => {
  commit('SHOW_MODAL', isShow)
}

export const setNavBarCount = ({ commit }, count) => commit('SET_NAVBAR_COUNT',count)

export const setItemData = ({commit}, item_data) => commit('SET_ITEM_DATA',item_data)

export const setTabIndex = ({ commit }, index) => commit('SET_TAB_INDEX',index)

export const setItemId = ({ commit }, id) => commit('SET_ITEM_ID',id)

export const setItemAddedCount = ({ commit }, itemAddedCount) => commit('SET_ITEM_COUNT',itemAddedCount)

export const setOrderInfo = ({ commit }, orderInfo) => commit('SET_ORDER_INFO',orderInfo)

export const setTotalMoney = ({ commit }, money) => commit('SET_TOTAL_MONEY',money)

export const showMinus = ({ commit }, isShow) => {
  commit('SHOW_MINUS', isShow)
}
export const showCart = ({ commit }, isShow) => {
  commit('SHOW_CART', isShow)
}

