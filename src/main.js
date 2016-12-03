import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

import routeConfig from './routeConfig'
import 'vuex'
import './public/static/bootstrap.min.css'
import './public/css/global.css'
import './public/static/jquery.min.js'
import './public/static/bootstrap.min.js'
import store from './vuex/store'

import Element from 'element-ui'
import { Cell, Button } from 'mint-ui';

var VueResource = require('vue-resource');
Vue.use(VueResource);
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


