import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'
import VueMask from 'vue-the-mask'
import ElementUI from 'element-ui'
import Axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/pt-br'
import configRouter from '../static/routes'
import SystemUtils from '../static/SystemUtils'
import StringUtils from '../static/StringUtils'
import ArrayUtils from '../static/ArrayUtils'
import FormatterUtils from '../static/FormatterUtils'
import MessageUtils from '../static/MessageUtils'

Vue.use(VueRouter)
Vue.use(VueMask)
Vue.use(ElementUI, { locale })

Vue.prototype.$http = Axios;

Vue.use(SystemUtils)
Vue.use(StringUtils)
Vue.use(ArrayUtils)
Vue.use(MessageUtils)
Vue.use(FormatterUtils)


const router = new VueRouter({
    routes: configRouter,
    mode: 'history',
})

router.beforeEach((to, from, next) => {
    const notRequiredAuthRouts = ["/login", "/logout"];
    
    const loggedIn = localStorage.getItem("user");

    if (loggedIn || Vue.prototype.$isInArray(notRequiredAuthRouts, to.path)) {
        next();
    } else {
        localStorage.setItem("nextPath", to.fullPath);
        next({
            path: '/login',
            query: {
                doLogin: true
            }
        })
    }
});

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})