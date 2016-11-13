/**
 * Created by my on 11/12/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex)

//const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    app
  },
  strict: true
})
