import request from '@/utils/axios'

// 查询文章
export function ApiArticleQuery(data) {
  return request({
    method: 'post',
    url: '/article/query',
    data: data
  })
}
