import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import routeConfig from './routeConfig'

import './public/css/bootstrap.min.css'
import './public/js/jquery.min.js'
import './public/js/bootstrap.min.js'
import store from './vuex/store'
import $ from 'jquery'
import Element from 'element-ui'
import { Cell, Button } from 'mint-ui';
Vue.use($);

Vue.use(VueRouter);
Vue.use(Element);
Vue.component(Cell.name, Cell);
Vue.component(Button.name, Button);
const router = new VueRouter({
  routes:routeConfig
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  store,
  components: { App }
})


