import request from '@/utils/axios'

// ��ѯ����
export function ApiArticleQuery(data) {
  return request({
    method: 'post',
    url: '/article/query',
    data: data
  })
}
