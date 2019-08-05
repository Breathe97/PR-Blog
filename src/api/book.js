import request from '@/utils/axios'

// 书籍增加
export function ApiBookAdd(data) {
  return request({
    method: 'post',
    url: '/book/add',
    data: data
  })
}
// 书籍删除
export function ApiBookDel(data) {
  return request({
    method: 'post',
    url: '/book/del',
    data: data
  })
}
// 书籍查询
export function ApiBookQuery(data) {
  return request({
    method: 'post',
    url: '/book/query',
    data: data
  })
}
// 书籍修改
export function ApiBookEdit(data) {
  return request({
    method: 'post',
    url: '/book/edit',
    data: data
  })
}
