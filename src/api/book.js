import request from '@/utils/axios'

// 收藏查询
export function ApiBookQuery(data) {
  return request({
    method: 'post',
    url: '/book/query',
    data: data
  })
}
