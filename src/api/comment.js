import request from '@/utils/axios'

// 评论增加
export function ApiCommentAdd(data) {
  return request({
    method: 'post',
    url: '/comment/add',
    data: data
  })
}
// 评论回复
export function ApiCommentReply(data) {
  return request({
    method: 'post',
    url: '/comment/reply',
    data: data
  })
}
// 评论删除
export function ApiCommentDel(data) {
  return request({
    method: 'post',
    url: '/comment/del',
    data: data
  })
}
// 评论查询
export function ApiCommentQuery(data) {
  return request({
    method: 'post',
    url: '/comment/query',
    data: data
  })
}
// 评论回复查询
export function ApiCommentReplyQuery(data) {
  return request({
    method: 'post',
    url: '/comment/replyQuery',
    data: data
  })
}
// 评论修改
export function ApiCommentEdit(data) {
  return request({
    method: 'post',
    url: '/comment/edit',
    data: data
  })
}
