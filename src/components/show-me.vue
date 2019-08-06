<template>
  <div id="show-me" :style="offset?'margin-top:'+offset+'px;':''">
    <!-- <div class="ivu-drawer-mask" :style="wxActive?'':'display:none;'" @click="wxActive=false"></div> -->
    <el-row class="me">
      <el-row>
        <img class="wximg" src="@/assets/me.png" />
      </el-row>
      <el-row class="autograph">
        <span>梦想总要有的</span>
      </el-row>
      <el-row class="name">
        <el-button type="text" @click="ToRouter('/about')">Breathe</el-button>
      </el-row>
      <el-row class="books primary">
        <span
          v-for="(item, index) in booksList.slice(0,3)"
          :key="index"
          @click="Open(item.url)"
        >《{{item.title}}》</span>
      </el-row>
      <el-divider>总览</el-divider>
      <el-row class="generalization" type="flex" justify="center">
        <el-col class="list" :span="11" @click.native="ToRouter('/study')">
          <div class="num">{{res_overview[0]}}</div>
          <div class="title">资料</div>
        </el-col>
        <el-col class="list" :span="11" @click.native="ToRouter('/note')">
          <div class="num">{{res_overview[1]}}</div>
          <div class="title">文章</div>
        </el-col>
      </el-row>
      <el-row class="generalization" type="flex" justify="center">
        <el-col class="list" :span="11" @click.native="ToRouter('/note')">
          <div class="num">{{res_overview[2]}}</div>
          <div class="title">随笔</div>
        </el-col>
        <el-col class="list" :span="11" @click.native="ToRouter('/zone')">
          <div class="num">{{res_overview[3]}}</div>
          <div class="title">工具</div>
        </el-col>
      </el-row>
      <el-divider></el-divider>
      <el-row class="contact">
        <el-col :span="8">
          <div class="github" @click="Open('https://github.com/Breathe97')"></div>
        </el-col>
        <el-col :span="8">
          <div
            class="qq"
            @click="Open('http://wpa.qq.com/msgrd?v=3&uin=704340916&site=qq&menu=yes')"
          ></div>
        </el-col>
        <el-col :span="8">
          <div class="wb" @click="Open('https://weibo.com/5226354789/')"></div>
        </el-col>
      </el-row>
      <el-divider>我的书架</el-divider>
      <el-row class="book-list" v-for="(item, index) in booksList" :key="index">
        <span>{{item.title}}</span>
        <div class="book-img">
          <img :src="item.img_url" alt />
        </div>
        <el-row type="flex" justify="center">
          <el-col :span="6">
            <el-link type="primary" @click="Open(item.jd_url)">京东</el-link>
          </el-col>
          <el-col :span="6">
            <el-link type="primary" @click="Open(item.dd_url)">当当</el-link>
          </el-col>
          <el-col :span="6">
            <el-link type="primary" @click="Open(item.tm_url)">天猫</el-link>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
    <el-row class="collection">
      <h4 class="title">
        <i class="el-icon-arrow-down"></i>外链收藏
      </h4>
      <p v-for="(item, index) in res_urlQuery.list" :key="index">
        <span @click="Open(item.url)">{{item.title}}</span>
      </p>
    </el-row>
  </div>
</template>
<script>
import { ApiOverview } from '@/api/common'
import { ApiBookQuery } from '@/api/book'
import { ApiUrlQuery } from '@/api/url'

export default {
  props: ['scrollTop', 'scrollHeight', 'scrollWidth'],
  data () {
    return {
      offset: 0,
      inf_BookQuery: {
        "type": 1,
        "title": "",
        "pages": 1,
        "sizes": 5
      },
      inf_urlQuery: {
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_overview: [],
      booksList: [],
      res_urlQuery: {},
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    // 初始化
    Init () {
      this.GetOverview()
      this.GetBookQuery()
      this.GetUrlQuery()
    },
    // 总览数量查询
    GetOverview () {
      ApiOverview().then(res => {
        this.res_overview = res.content
      })
    },
    // 书籍查询
    GetBookQuery () {
      ApiBookQuery(this.inf_BookQuery).then(res => {
        this.booksList = res.content.list
      })
    },
    // 外链查询
    GetUrlQuery () {
      ApiUrlQuery(this.inf_urlQuery).then(res => {
        this.res_urlQuery = res.content
        // console.log(res);
      })
    },
    // 跳转路由
    ToRouter (path) {
      this.$router.push(path)
    },
    // 打开链接
    Open (url) {
      return window.open(url, '_blank')
    }
  },
  watch: {
    scrollTop () {
      let offset = this.scrollTop + this.scrollHeight - (this.$el.clientHeight + 162)
      this.offset = offset > 0 ? offset : 0
    },
    scrollHeight () {
      let offset = this.scrollTop + this.scrollHeight - (this.$el.clientHeight + 162)
      this.offset = offset > 0 ? offset : 0
    },
    scrollWidth () {
      let offset = this.scrollTop + this.scrollHeight - (this.$el.clientHeight + 162)
      this.offset = offset > 0 ? offset : 0
    }
  }
}
</script>

