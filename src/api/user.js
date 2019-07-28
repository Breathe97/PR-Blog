import request from '@/utils/axios'

// 用户注册
export function ApiRegister(data) {
  return request({
    method: 'post',
    url: '/user/register',
    data: data
  })
}
// 用户登录
export function ApiLogin(data) {
  return request({
    method: 'post',
    url: '/user/login',
    data: data
  })
}
