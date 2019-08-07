<template>
  <div id="about">
    <el-row class="title">
      <h3>关于我</h3>
    </el-row>
    <el-row class="me">
      <p>
        人生如梦，梦如人生。我是一个平凡的普通前端工程师，没有过人的天赋，也没有显赫的背景。但是，我有着比常人更大的决心，我是一个自大的人，自大到难以想象。但是我认为这并不是我的缺点，因为自大的我，总是会寻求最完美的方式解决问题，学习最新的的知识来充实自己。虽然我的
        <span
          class="dream"
          @click="DreamShow"
        >梦想</span>
        遥不可及。但是，我从未想过放弃！每当我想要放弃的时候，我就会默默鼓励自己，一步一步来，总会成功的。只有努力过才可以名正言顺的放弃，置于死地而后生，Let's Go ！
      </p>
    </el-row>
    <el-row v-loading="loading">
      <embed
        v-show="dream"
        src="//player.video.iqiyi.com/43493f6a88f70a228995e898dccd324d/0/0/w_19s0nhwgwh.swf-albumId=23120768509-tvId=23120768509-isPurchase=0-cnId=undefined"
        allowfullscreen="true"
        quality="high"
        width="100%"
        height="350"
        align="middle"
        allowScriptAccess="always"
        type="application/x-shockwave-flash"
      />
    </el-row>
    <el-divider></el-divider>
    <el-row class="title">
      <h3>关于本博客</h3>
    </el-row>

    <el-row class="title">
      <h4>技术栈</h4>
    </el-row>
    <el-row class="arts">
      <h5>前端</h5>
      <ul>
        <li>
          <a href="https://cli.vuejs.org/zh/" target="_blank">vue-cli</a>：一个基于 Vue.js 进行快速开发的完整系统。
        </li>
        <li>
          <a href="https://router.vuejs.org/zh/" target="_blank">vue-router</a>： Vue.js 官方的路由管理器。
        </li>
        <li>
          <a href="https://vuex.vuejs.org/zh/" target="_blank">vuex</a>：为 Vue.js 应用程序开发的状态管理模式。
        </li>
        <li>
          <a href="https://www.npmjs.com/package/axios" target="_blank">axios</a>： 一个基于 promise 的 HTTP 库，可以用在浏览器和 node.js 中。
        </li>
        <li>
          <a href="https://element.eleme.cn/#/zh-CN" target="_blank">element-ui</a>：一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库。
        </li>
        <li>
          <a href="https://www.iviewui.com/" target="_blank">iview</a>：一套基于 Vue.js 的高质量 UI 组件库。
        </li>
        <li>
          <a href="http://momentjs.cn/" target="_blank">moment</a>：一个JavaScript 日期处理类库。
        </li>
        <li>
          <a href="https://www.npmjs.com/package/vue-quill-editor" target="_blank">vue-quill-editor</a>：基于 Quill、适用于 Vue 的富文本编辑器，支持服务端渲染和单页应用。
        </li>
        <li>
          <a href="https://www.npmjs.com/package/node-sass" target="_blank">node-sass</a>：一个css样式表预处理器。
        </li>
      </ul>
      <br />
      <h5>后端</h5>
      <ul>
        <li>
          <a href="http://nodejs.cn/" target="_blank">nodejs</a>：一个基于 Chrome V8 引擎的 JavaScript 运行环境。
        </li>
        <li>
          <a href="http://www.expressjs.com.cn/" target="_blank">express</a>：基于 Node.js 平台，快速、开放、极简的 Web 开发框架。
        </li>
        <li>
          <a href="https://www.npmjs.com/package/mongoose" target="_blank">mongoose</a>：是一个基于分布式文件存储的数据库。
        </li>
        <li>
          <a href="https://www.npmjs.com/package/body-parser" target="_blank">body-parser</a>：用于解析中间件中的传入请求主体。
        </li>
        <li>
          <a href="https://www.npmjs.com/package/nodemailer" target="_blank">nodemailer</a>：一个方便发送邮箱验证码的插件。
        </li>
        <li>
          <a
            href="https://www.npmjs.com/package/express-swagger-generator"
            target="_blank"
          >express-swagger-generator</a>：一个基于swagger的工具自动生成api文档工具。
        </li>
        <li>
          <a href="https://jwt.io/" target="_blank">jsonwebtoken</a>：一个自动生成token、身份验证、合法性、有效性等功能的工具
        </li>
        <li>
          <a href="https://www.npmjs.com/package/cors" target="_blank">cors</a>：用于解决前后端ajax请求跨域。
        </li>
      </ul>
    </el-row>
    <el-row class="title">
      <p>
        PS:初次设计博客，UI是个让我很困扰的问题，所以本博客UI参照了
        <a href="http://liuwangshu.cn/" target="_blank">刘望舒的博客</a>
      </p>
    </el-row>
  </div>
</template>
<script>
import { setTimeout } from 'timers';

export default {
  data () {
    return {
      dream: false,
      loading: false,
    }
  },

  methods: {
    DreamShow () {
      this.dream = !this.dream
      if (this.dream) {
        this.loading = true
        setTimeout(() => {
          this.loading = false
        }, 1000)
      }
    }
  }
}
</script>
<style>
</style>
