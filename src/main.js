import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueMask from 'vue-the-mask'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import configRouter from '../static/routes'
import DvsHttps from '../static/DvsHttp'
import StringUtils from '../static/StringUtils'
import MessageUtils from '../static/MessageUtils'

// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueMask)
Vue.use(ElementUI, { locale })

// Vue.http.options.root = 'http://localhost:8180'

Vue.use(DvsHttps)
Vue.use(StringUtils)
Vue.use(MessageUtils)

const router = new VueRouter({
    routes: configRouter,
    mode: 'history'
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})