import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import configRouter from '../static/routes'

Vue.use(VueRouter)
Vue.use(ElementUI)

const router = new VueRouter({
  routes: configRouter,
  mode: 'history'
})

Vue.http.options.root = 'http://localhost:8180';

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})