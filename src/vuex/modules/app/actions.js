/**
 * Created by my on 11/13/16.
 */
export const showModal = ({commit}, isShow) => {
  commit('SHOW_MODAL', isShow)
}


export const setNavBarCount = ({ commit }, count) => commit('SET_NAVBAR_COUNT',count)

