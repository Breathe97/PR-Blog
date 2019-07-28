import request from '@/utils/axios'

// ╡Ия╞ндуб
export function ApiArticleQuery(data) {
  return request({
    method: 'post',
    url: '/article/query',
    data: data
  })
}
