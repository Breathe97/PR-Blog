import axios from 'axios'
import { Message } from 'element-ui'
// 创建请求
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000 // request timeout
})

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // iView.LoadingBar.start()
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token')
    if (token) {
      config.headers['token'] = token
    }
    return config
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
service.interceptors.response.use(
  response => {
    let res = response.data
    // 后台异常错误数据 code ===0
    if (res.code === 0) {
      // iView.LoadingBar.error()
      Message({
        message: res.message || 'Error',
        type: 'error'
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
    // iView.LoadingBar.finish()
    return res // 其他正常数据 返回
  },
  error => {
    // 请求错误;
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
