import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueMask from 'vue-the-mask'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import configRouter from '../static/routes'
import SystemUtils from '../static/SystemUtils'
import StringUtils from '../static/StringUtils'
import ArrayUtils from '../static/ArrayUtils'
import FormatterUtils from '../static/FormatterUtils'
import MessageUtils from '../static/MessageUtils'

// Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueMask)
Vue.use(ElementUI, { locale })

// Vue.http.options.root = 'http://localhost:8180'

Vue.use(SystemUtils)
Vue.use(StringUtils)
Vue.use(ArrayUtils)
Vue.use(MessageUtils)
Vue.use(FormatterUtils)

const router = new VueRouter({
    routes: configRouter,
    mode: 'history'
})

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})