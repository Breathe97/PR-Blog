<template>
  <div id="web" @click="Click">
    <Menu :menuShow.sync="menuShow"></Menu>
    <div class="body">
      <el-col class="left hidden-md-and-down" :span="5" :md="6" :lg="5">
        <ShowMe
          :scrollTop.sync="scrollTop"
          :scrollHeight.sync="scrollHeight"
          :scrollWidth.sync="scrollWidth"
        ></ShowMe>
      </el-col>
      <el-col class="center" :span="13" :xs="24" :sm="16" :md="16" :lg="13">
        <router-view></router-view>
      </el-col>
      <el-col class="right" :span="6" :xs="24" :sm="8" :md="7" :lg="6">
        <TimeLine
          class="hidden-sm-and-down"
          :scrollTop.sync="scrollTop"
          :scrollHeight.sync="scrollHeight"
          :scrollWidth.sync="scrollWidth"
        ></TimeLine>
        <TimeLine class="hidden-md-and-up"></TimeLine>
      </el-col>
    </div>
    <Footer :musicShow.sync="musicShow" />
  </div>
</template>
<script>
import Menu from '@/layout/web/components/menu.vue'
import ShowMe from '@/components/show-me.vue'
import TimeLine from '@/components/time-line.vue'
import Footer from '@/layout/web/components/footer.vue'
export default {
  components: {
    Menu, ShowMe, TimeLine, Footer
  },
  data () {
    return {
      scrollTop: 0,
      scrollHeight: 0,
      scrollWidth: 0,
      menuShow: false,
      resShow: true,
      musicShow: false
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Click () {
      this.musicShow = !this.musicShow
    },
    Init () {
      this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop // 获取滚动条的高度
      this.scrollHeight = document.documentElement.clientHeight || window.clientHeight || document.body.clientHeight //获取浏览器窗口高度
      this.scrollWidth = document.documentElement.clientWidth || window.clientWidth || document.body.clientWidth //获取浏览器窗口宽度
      window.onscroll = () => {
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop // 获取滚动条的高度
        // console.log(this.scrollTop, this.scrollHeight);
      };
      window.onresize = () => {
        this.scrollHeight = document.documentElement.clientHeight || window.clientHeight || document.body.clientHeight //获取浏览器窗口高度
        this.scrollWidth = document.documentElement.clientWidth || window.clientWidth || document.body.clientWidth //获取浏览器窗口宽度
        // console.log(this.scrollWidth);
      }
    },
  }
}
</script>
