<template>
  <div id="footer">
    <!-- <el-divider></el-divider> -->
    <el-row type="flex" justify="center">
      <el-col class="text">
        <el-row>© 2019 Breathe</el-row>
        <el-row>Hosted by Coding Pages 本站访问量 824515 次</el-row>
      </el-col>
    </el-row>
    <div class="float-menu">
      <BackTop></BackTop>
      <div class="music" @click="show=!show">
        <span class="icon"></span>
      </div>
      <iframe
        :style="show?'bottom:0':''"
        frameborder="no"
        border="0"
        marginwidth="0"
        marginheight="0"
        width="330"
        height="450"
        src="//music.163.com/outchain/player?type=0&id=2534609174&auto=1&height=430"
      ></iframe>
    </div>
  </div>
</template>
<script>
export default {
  props: ['musicShow'],
  data () {
    return {
      show: false,
    }
  },
  watch: {
    musicShow () {
      if (this.musicShow === false) {
        this.show = this.musicShow
      }
    }
  }
}
</script>