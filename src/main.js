import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import configRouter from '../static/routes'

import StringUtils from '../static/StringUtils'

Vue.use(VueRouter)
Vue.use(ElementUI)

Vue.use(StringUtils)

const router = new VueRouter({
  routes: configRouter,
  mode: 'history'
})

/*Vue.mixin({
  methods: {
    isEmpty: function(arg) {
      if (arg instanceof String) {
        return (arg === undefined || arg.length === 0);
      } else {
        return (arg === undefined);
      }
    }
  }
})*/

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
