/**
 *
 * Created by my on 11/12/16.
 */

import * as actions from './actions'
import * as getters from './getters'
import mutations from './mutations'

const state = {
  isModalShow: false,
  navBarCount: 1
}

export default{
  state,
  actions,
  getters,
  mutations
}

