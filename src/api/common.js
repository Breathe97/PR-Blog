import request from '@/utils/axios'

// 发送验证码
export function ApiVerificationCode(query) {
  return request({
    method: 'get',
    url: '/other/verificationCode',
    params: { email: query }
  })
}
// 获取总览
export function ApiOverview() {
  return request({
    method: 'get',
    url: '/other/overview'
  })
}
// 获取时间轴
export function ApiTimeLine() {
  return request({
    method: 'get',
    url: '/other/timeLine'
  })
}
