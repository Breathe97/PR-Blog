// 全局过滤器
import Vue from 'vue'
import Moment from 'moment'
//  注册
Vue.filter('TimeFormat', date => {
  // 返回处理后的值
  return Moment(Number(date)).format('YYYY-MM-DD')
})
Vue.filter('TagFormat', date => {
  // 返回处理后的值
  if (typeof date === 'object') {
    let str = ''
    date.forEach((element, index) => {
      if (index === 0) {
        str = str + element
      } else {
        str = str + ',' + element
      }
    })
    return str
  }
})

// getter，返回已注册的过滤器
const TimeFormat = Vue.filter('TimeFormat')
const TagFormat = Vue.filter('TagFormat')

export { TimeFormat, TagFormat }
