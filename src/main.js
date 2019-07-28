import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/display.css'
import axios from '@/utils/axios'
import '@/theme/index.css' // 主题
import './styles/index.scss' // 自定义样式
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueParticles from 'vue-particles'
import { ToDetails } from '@/utils/common'
import '@/utils/filter'
Vue.use(VueParticles)
Vue.use(iView)
Vue.use(ElementUI)
Vue.config.productionTip = false
router.beforeEach((to, from, next) => {
  next()
})
Vue.prototype.$axios = axios
Vue.prototype.ToDetails = ToDetails // 跳转到文章详情页面
router.afterEach(() => {})
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
