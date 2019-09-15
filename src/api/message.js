import request from '@/utils/axios'

// 留言增加
export function ApiMessageAdd(data) {
  return request({
    method: 'post',
    url: '/Message/add',
    data: data
  })
}
// 留言删除
export function ApiMessageDel(data) {
  return request({
    method: 'post',
    url: '/Message/del',
    data: data
  })
}
// 留言查询
export function ApiMessageQuery(data) {
  return request({
    method: 'post',
    url: '/Message/query',
    data: data
  })
}
// 留言修改
export function ApiMessageEdit(data) {
  return request({
    method: 'post',
    url: '/Message/edit',
    data: data
  })
}
