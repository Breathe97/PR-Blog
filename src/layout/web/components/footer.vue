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
      <div class="message" @click="dialogVisible=true">
        <span class="icon"></span>
      </div>
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
        src="//music.163.com/outchain/player?type=0&id=2534609174&auto=0&height=430"
      ></iframe>
    </div>
    <el-dialog title="留言" :visible.sync="dialogVisible" width="400px">
      <el-input type="textarea" :rows="4" placeholder="请输入留言内容" v-model="inf_message.message"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="MessageAdd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>

import { ApiMessageAdd } from '@/api/message'
export default {
  props: ['musicShow'],
  data () {
    return {
      show: false,
      dialogVisible: false,
      inf_message: {
        "message": null
      }
    }
  },
  methods: {
    // 确定留言
    MessageAdd () {
      ApiMessageAdd(this.inf_message).then(() => {
        this.$message.success('留言成功')
        this.dialogVisible = false
        this.inf_message.message = null
      })
    }
  },
  watch: {
    // 展开音乐
    musicShow () {
      if (this.musicShow === false) {
        this.show = this.musicShow
      }
    }
  }
}
</script>