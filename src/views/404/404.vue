<template>
  <div id="error">
    <el-row class="content">
      <div class="img">
        <img src="@/assets/404.jpg" alt />
      </div>
      <div class="text">
        <span @click="ToRouter('/home')">返回首页</span>
        <span @click="ToRouter(-1)">返回上一页</span>
      </div>
    </el-row>
  </div>
</template>
<style lang="scss">
#error {
  background: white;
  text-align: center;
  .content {
    .img {
      text-align: center;
      margin-top: 150px;
      img {
        width: 100%;
        max-width: 600px;
      }
    }
    .text {
      position: absolute;
      bottom: 50px;
      left: 0;
      right: 0;
      margin: auto;
      span {
        display: inline-block;
        height: 50px;
        margin: -50px 10px;
        text-align: center;
        &:hover {
          color: black;
          cursor: pointer;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
<script>
export default {
  methods: {
    ToRouter (val) {
      // console.log(val);
      if (val === -1) {
        return this.$router.go(-1)
      }
      this.$router.push(val)
    }
  }
}
</script>
