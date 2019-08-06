import request from '@/utils/axios'

// 文章增加
export function ApiArticleAdd(data) {
  return request({
    method: 'post',
    url: '/article/add',
    data: data
  })
}
// 文章删除
export function ApiArticleDel(data) {
  return request({
    method: 'post',
    url: '/article/del',
    data: data
  })
}
// 文章详情查询
export function ApiArticleDetails(id) {
  return request({
    method: 'get',
    url: '/article/details',
    params: { article_id: id }
  })
}
// 文章查询
export function ApiArticleQuery(data) {
  return request({
    method: 'post',
    url: '/article/query',
    data: data
  })
}
// 文章修改
export function ApiArticleEdit(data) {
  return request({
    method: 'post',
    url: '/article/edit',
    data: data
  })
}
