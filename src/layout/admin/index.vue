<template>
  <div id="admin">
    <div class="left" :style="isCollapse?'width:64px':''">
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#6495ed"
        :collapse="isCollapse"
        @select="Select"
        router
      >
        <el-menu-item index="index">
          <i class="el-icon-menu"></i>
          <span slot="title">总览</span>
        </el-menu-item>
        <el-menu-item index="book">
          <i class="el-icon-reading"></i>
          <span slot="title">书籍管理</span>
        </el-menu-item>
        <el-menu-item index="url">
          <i class="el-icon-link"></i>
          <span slot="title">外链管理</span>
        </el-menu-item>
        <el-menu-item index="article">
          <i class="el-icon-document"></i>
          <span slot="title">文章管理</span>
        </el-menu-item>
        <el-menu-item index="comment">
          <i class="el-icon-s-comment"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item index="message">
          <i class="el-icon-edit"></i>
          <span slot="title">留言管理</span>
        </el-menu-item>
        <el-menu-item index="user">
          <i class="el-icon-user-solid"></i>
          <span slot="title">用户管理</span>
        </el-menu-item>
        <el-menu-item index="set">
          <i class="el-icon-setting"></i>
          <span slot="title">系统设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="right" :style="isCollapse?'padding-left:64px':''">
      <div class="header">
        <div class="left" @click="isCollapse=!isCollapse">
          <svg
            data-v-49e15297
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            class="hamburger is-active"
          >
            <path
              data-v-49e15297
              d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
            />
          </svg>
        </div>
        <div class="right">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="defaultActive">{{defaultActive | MenuPath }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="tag">
          <Tag
            fade
            :type="defaultActive===item?'dot':'border'"
            :class="defaultActive===item?'active':'def'"
            :name="item"
            closable
            checked
            @on-close="OnClose"
            @click.native="OnChange(item)"
            color
            v-for="(item, index) in tags"
            :key="index"
          >{{item | MenuPath}}</Tag>
        </div>
      </div>
      <div class="body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      defaultActive: 'index',
      isCollapse: false,
      tags: ['index']
    }
  },
  mounted () {
    // console.log(this.$route);
    this.defaultActive = this.$route.name
    this.tags = [this.$route.name]
  },
  methods: {
    Select (val) {
      this.defaultActive = val
      if (this.tags.indexOf(val) !== -1) {
        return
      } else {
        this.tags.push(val)
      }
    },
    // 标签关闭
    OnClose (event, name) {
      const index = this.tags.indexOf(name);
      this.tags.splice(index, 1);
      this.defaultActive = this.tags[index]
      this.$router.push(this.defaultActive)
    },
    //标签选择
    OnChange (val) {
      this.defaultActive = val
      this.$router.push(val)
    }
  },
  filters: {
    MenuPath (val) {
      if (val === 'index') {
        return '总览'
      }
      if (val === 'book') {
        return '书籍'
      }
      if (val === 'url') {
        return '外链管理'
      }
      if (val === 'article') {
        return '文章管理'
      }
      if (val === 'comment') {
        return '评论管理'
      }
      if (val === 'message') {
        return '留言管理'
      }
      if (val === 'user') {
        return '用户管理'
      }
      if (val === 'set') {
        return '系统设置'
      }
    }
  }
}
</script>
