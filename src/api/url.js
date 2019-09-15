import request from '@/utils/axios'

// 书籍增加
export function ApiUrlAdd(data) {
  return request({
    method: 'post',
    url: '/url/add',
    data: data
  })
}
// 书籍删除
export function ApiUrlDel(data) {
  return request({
    method: 'post',
    url: '/url/del',
    data: data
  })
}
// 书籍查询
export function ApiUrlQuery(data) {
  return request({
    method: 'post',
    url: '/url/query',
    data: data
  })
}
// 书籍修改
export function ApiUrlEdit(data) {
  return request({
    method: 'post',
    url: '/url/edit',
    data: data
  })
}
