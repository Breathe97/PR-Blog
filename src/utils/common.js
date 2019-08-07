// 文章详情页面
export function ToDetails(id) {
  // 选择菜单后滚动条回到顶部
  let backTop = document.getElementsByClassName('ivu-back-top-show')[0]
  if (backTop) {
    backTop.click()
  }
  // console.log(id)
  this.$router.push({ path: '/details', query: { article_id: id } })
}
