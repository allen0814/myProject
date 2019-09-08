// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import api from './api/index.js'
import utils from './utils/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import myDistrict from '../package/myDistrict'
import echarts from 'echarts'
import './assets/icon/iconfont.css'
import $ from 'jquery'

Vue.use(ElementUI)
Vue.use(myDistrict)
// Vue.use($)

// 将API方法绑定到全局
Vue.prototype.$api = api
Vue.prototype.$utils = utils
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
})
