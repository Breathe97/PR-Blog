<template>
  <div id="menu-item">
    <el-menu :default-active="activeName" :router="true" mode="horizontal" @select="Select">
      <el-menu-item index="/home">
        <template slot="title">
          <img src="@/assets/1.png" />
          <span>首页</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/study">
        <template slot="title">
          <img src="@/assets/2.png" />
          <span>学无止境</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/note">
        <template slot="title">
          <img src="@/assets/3.png" />
          <span>日积月累</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/zone">
        <template slot="title">
          <img src="@/assets/6.png" />
          <span>私密空间</span>
        </template>
      </el-menu-item>
      <el-menu-item index="/about">
        <template slot="title">
          <img src="@/assets/7.png" />
          <span>关于</span>
        </template>
      </el-menu-item>
      <div class="search" v-show="searchShow" :style="focus?'width:80%':'width:50%'">
        <el-input
          @focus="focus=true"
          @blur="focus=false"
          size="small"
          placeholder="Enter something..."
          suffix-icon="el-icon-search"
        ></el-input>
      </div>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: ['searchShow'],
  data () {
    return {
      focus: false,
      activeName: '/home',
      scrollTop: 0
    }
  },
  mounted () {
    this.activeName = this.$route.path

  },
  methods: {
    Select () {
      // 选择菜单后滚动条回到顶部
      let backTop = document.getElementsByClassName('ivu-back-top-show')[0]
      if (backTop) {
        backTop.click()
      }
    },
  },
  watch: {
    $route () {
      this.activeName = this.$route.path
    }
  }
}
</script>
