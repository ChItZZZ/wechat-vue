/**
 * Created by my on 11/12/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'

Vue.use(Vuex)

//const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({
  modules: {
    app
  },
  strict: true
})

if (module.hot) {
  module.hot.accept([
    './modules/app/getters',
    './modules/app/actions',
    './modules/app/mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./modules/app/getters'),
      actions: require('./modules/app/actions'),
      mutations: require('./modules/app/mutations')
    })
  })
}

export default store