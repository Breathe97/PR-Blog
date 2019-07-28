<template>
  <div id="time-line" :style="offset?'margin-top:'+offset+'px;':''">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in resTimeLine"
        :key="index"
        :timestamp="item.R_time | TimeFormat"
        placement="top"
      >
        <h4 @click="ToDetails(item._id)">{{item.type}}《{{item.title}}》</h4>
        <p>{{item.describe}}</p>
      </el-timeline-item>
      <el-timeline-item
        class="more"
        :timestamp="resTimeLine.length!==0? '查看更多':'暂无更多'"
        placement="top"
      ></el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import { ApiTimeLine } from '@/api/common'

export default {
  props: ['scrollTop', 'scrollHeight', 'scrollWidth'],
  data () {
    return {
      offset: 0,
      resTimeLine: []
    }
  },
  mounted () {
    this.GetTimeLine()
  },
  methods: {
    GetTimeLine () {
      ApiTimeLine().then(res => {
        this.resTimeLine = res.content
      })
    }
  },
  watch: {
    scrollTop () {
      let offset = this.scrollTop + this.scrollHeight - (this.$el.clientHeight + 170)
      this.offset = offset > 0 ? offset : 0
    },
    scrollHeight () {
      let offset = this.scrollTop + this.scrollHeight - (this.$el.clientHeight + 170)
      this.offset = offset > 0 ? offset : 0
    },
    scrollWidth () {
      let offset = this.scrollTop + this.scrollHeight - (this.$el.clientHeight + 170)
      this.offset = offset > 0 ? offset : 0
    }
  }
}
</script>