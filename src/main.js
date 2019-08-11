import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import axios from '@/utils/axios'
import '@/theme/index.css'
import './styles/index.scss'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import { ToDetails } from '@/utils/common'
import { ApiInfo } from '@/api/user'
import { Message } from 'element-ui'
import '@/utils/filter'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import Share from 'vue-social-share'
Vue.use(Share)
Vue.use(iView)
Vue.use(ElementUI)
Vue.config.productionTip = false
store.commit('SET_TOKEN', localStorage.getItem('token')) // 获取token 写入到store
router.beforeEach((to, from, next) => {
  if (to.matched[0].path === '/admin') {
    return ApiInfo()
      .then(res => {
        // 服务费返回权限异常
        if (res.code === -1) {
          localStorage.removeItem('token')
          localStorage.removeItem('info')
          Message.error('权限异常')
          return next('/')
        }
        // 信息正常
        if (res.code === 200) {
          store.commit('SET_INFO', res.content)
          // 权限不足
          if (res.content.power !== 0) {
            Message.error('权限不足')
            return next('/')
          }
          // 权限足够
          next()
        }
      })
      .catch(() => {
        // 请求错误 判定-> 权限异常
        Message.error('权限异常')
        localStorage.removeItem('token')
        store.commit('SET_INFO', null)
        next('/')
      })
  }
  next()
})

Vue.prototype.$axios = axios
Vue.prototype.ToDetails = ToDetails
router.afterEach(() => {})
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
