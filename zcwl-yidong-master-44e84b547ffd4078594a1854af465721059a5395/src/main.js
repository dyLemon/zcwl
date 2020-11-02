import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/reset.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/swiper-bundle.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import { sliceText } from './utils/util'
import './rem.js'
Vue.prototype.sliceText = sliceText
Vue.use(VueAwesomeSwiper, /* { default options with global component } */)
Vue.use(ElementUI)
Vue.use(Vant);
Vue.config.productionTip = false
Vue.prototype.baseURL = 'http://zhongcwl.b.langqiyun.cn'
import axios from 'axios';
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
   
    // 移动端

router.beforeEach((to, from, next) => {
    // chrome
    document.body.scrollTop = 0
    // firefox
    document.documentElement.scrollTop = 0
    // safari
    window.pageYOffset = 0
    next()
})