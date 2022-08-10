import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import './plugins/element.js'
import './plugins/waterfall.js'

import './assets/css/commen/icon.scss'
import echarts from 'echarts'

import { post, get, userpost, upload,post1 } from "./utils/httpUrl"
// import host from "../public/basicHost"
import { getCookie, setCookie, delCookie } from './utils/cookie'

Vue.config.devtools = true;


Vue.prototype.$post = post;
Vue.prototype.$post1= post1;
Vue.prototype.$axios = axios;
Vue.prototype.$upload = upload;
Vue.prototype.$userpost = userpost;
Vue.prototype.$get = get;
// Vue.prototype.$host = host;
Vue.prototype.$echarts = echarts;
Vue.prototype.$getCookie = getCookie;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$delCookie = delCookie;


Vue.config.productionTip = false
// axios.defaults.withCredentials = true

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

// router.beforeEach((to, from, next) => {
//   if (to.meta.islogin == true) {//判断是否需要登录
//     if (sessionStorage.getItem("token")) {
//       if (to.meta.title) {
//         document.title = '易丰科技 | ' + to.meta.title
//         next()
//       }
//     } else {
//       document.title = '易丰科技 | ' + to.meta.title
//       next({
//         path: '/components/commen/login'
//       })
//     }
//   } else {
//     if (to.meta.title) {
//       document.title = '易丰科技 | ' + to.meta.title
//       next()
//     }
//   }

// })
