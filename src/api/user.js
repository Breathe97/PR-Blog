<<<<<<< HEAD
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
=======
import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
>>>>>>> db0a43113ba5667f88ea74c1287d11e99c71a636
  })
}
