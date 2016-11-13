/**
 * Created by my on 11/13/16.
 */
export const showModal = ({commit}, isShow) => {
  commit('SHOW_MODAL', isShow)
}

export const setNavBarCount = ({ commit }, count) => commit('SET_NAVBAR_COUNT',count)

export const setItemData = ({commit}, item_data) => commit('SET_ITEM_DATA',item_data)

