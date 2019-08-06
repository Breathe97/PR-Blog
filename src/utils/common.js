// 文章详情页面
export function ToDetails(id) {
  // console.log(id)
  this.$router.push({ path: '/details', query: { article_id: id } })
}
