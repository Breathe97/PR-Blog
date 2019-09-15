import request from '@/utils/axios'

// 获取文章类型
export function ApiArticleType() {
  return request({
    method: 'post',
    url: '/system/articleType'
  })
}
