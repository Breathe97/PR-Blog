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
Vue.use(iView)
Vue.use(ElementUI)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  if (to.matched[0].path === '/admin') {
    return ApiInfo()
      .then(res => {
        if (res.content.power !== 0) {
          // 权限不足
          Message.error('权限不足')
          return next('/')
        }
        // 权限足够
        next()
      })
      .catch(() => {
        // 权限异常
        Message.error('权限异常')
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
