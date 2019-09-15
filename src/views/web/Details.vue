<template>
  <div id="details" v-loading="loading">
    <el-row class="title">
      <h2>{{res_details.title}}</h2>
    </el-row>
    <el-row class="other">
      <span>
        <i class="el-icon-time">{{res_details.E_time | TimeFormat}}</i>
      </span>
      <span>
        <i class="el-icon-view">{{ res_details.look_count}}</i>
      </span>
      <span>
        <i class="el-icon-chat-line-square">{{res_details.collection_count}}</i>
      </span>
      <span>
        <i class="el-icon-star-off">{{res_details.comment_count}}</i>
      </span>
      <span>
        <i class="el-icon-discount">{{res_details.tag | TagFormat}}</i>
      </span>
    </el-row>
    <el-row class="describe">{{res_details.describe}}</el-row>
    <div class="ql-container ql-snow">
      <div class="ql-editor" v-html="res_details.content">ssds</div>
    </div>
    <el-divider></el-divider>
    <el-row type="flex" justify="end">
      <el-input type="textarea" :rows="5" placeholder="请输入评论内容" v-model="inf_commentAdd.text"></el-input>
    </el-row>
    <el-row type="flex" justify="end">
      <el-button type="primary" size="mini" style="margin:6px 5px;" @click="CommentAdd">
        <!-- <i class="el-icon-s-opportunity"></i>  -->
        发布
      </el-button>
      <el-button type="warning" size="mini" style="margin:6px 5px;" @click="Share">
        <!-- <i :class="share?'el-icon-caret-right':'el-icon-share'"></i> -->
        分享
      </el-button>
      <share
        class="share"
        :style="share?'':'margin-right:-260px;'"
        :key="res_details._id"
        :config="config"
      ></share>
    </el-row>
    <el-row class="comment-list" :key="res_commentQuery.list.length">
      <div class="user" v-for="(item, index) in res_commentQuery.list" :key="index">
        <div class="img">
          <img :src="item.img_url" alt />
        </div>
        <div class="name">
          <h4>{{item.nickname }}</h4>
          <Time class="time" :time="Number(item.R_time)" />
        </div>
        <div class="text">{{item.text}}</div>
        <!-- <el-row type="flex" justify="end" class="other">
          <span class="reply">回复</span>
        </el-row>-->

        <!-- <div class="time">{{item.R_time | TimeFormat}}</div> -->
      </div>
    </el-row>
  </div>
</template>
<script>
import { ApiArticleDetails, ApiArticleLook } from '@/api/article'
import { ApiCommentAdd, ApiCommentReply, ApiCommentQuery, ApiCommentReplyQuery } from '@/api/comment'
import 'social-share.js/dist/css/share.min.css'
export default {
  data () {
    return {
      time2: (new Date()).getTime() - 1000,
      loading: true,
      share: false,
      textarea2: '',
      res_details: {
        title: '',
        content: ''
      },
      config: {
        url: window.location.href, // 网址，默认使用 window.location.href
        source: 'PR云-穿山甲的老爷爷', // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: '', // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        description: '', // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: '', // 图片, 默认取网页中第一个img标签
        sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban', 'twitter'], // 启用的站点
        // disabled: ['google', 'facebook', 'twitter'], // 禁用的站点
        wechatQrcodeTitle: '微信扫一扫：分享', // 微信二维码提示文字
        wechatQrcodeHelper: '<p>微信里点“发现”，扫一下</p><p>二维码便可将本文分享至朋友圈。</p>'
      },
      inf_commentAdd: {
        "article_id": "",
        "text": ""
      },
      inf_commentReply: {
        "reply_id": "",
        "text": ""
      },
      inf_commentQuery: {
        "article_id": '',
        "pages": 1,
        "sizes": 10
      },
      res_commentQuery: {
        list: []
      },
      inf_commentReplyQuery: {
        "article_id": '',
        "pages": 1,
        "sizes": 10
      },
      res_commentReplyQuery: {}
    }
  },
  created () {
    this.GetArticleDetails()

  },
  methods: {
    GetArticleDetails () {
      ApiArticleLook(this.$route.query.article_id).then(() => {
        ApiArticleDetails(this.$route.query.article_id).then(res => {
          this.res_details = res.content
          this.loading = false
          this.config.title = res.content.title
          this.config.description = res.content.describe
          this.config.image = res.content.img_url
          this.inf_commentQuery.article_id = res.content._id
        }).then(() => {
          this.CommentQuery()
        })

      })
    },
    // 分享
    Share () {
      this.share = !this.share
    },
    // 发布评论
    CommentAdd () {
      if (!this.$store.state.info) {
        this.$store.commit('USER_CENTER_TRUE', true)
        return this.$message.info('请先登录后再评价')
      }
      if (!this.inf_commentAdd.text) {
        return this.$message.info('请填写评论内容')
      }
      this.inf_commentAdd.article_id = this.res_details._id
      ApiCommentAdd(this.inf_commentAdd).then(res => {
        if (res.code === 200) {
          this.inf_commentAdd.text = ''
          this.$message.success('评论成功')
        }
        this.CommentQuery()
      })
    },
    // 回复评论
    CommentReply () {
      this.inf_commentQuery.article_id = this.res_details._id
      ApiCommentReply(this.inf_commentReply).then(res => {
        if (res.code === 200) {
          this.inf_commentReply.text = ''
          this.$message.success('回复成功')
        }
        this.CommentQuery()
      })
    },
    // 查询评论
    CommentQuery () {
      ApiCommentQuery(this.inf_commentQuery).then(res => {
        if (res.code === 200) {
          this.res_commentQuery = res.content
          // console.log(this.res_commentQuery);
        } else {
          this.res_commentQuery.list = []

        }
      })
    },
    // 查询回复评论
    CommentReplyQuery () {
      ApiCommentReplyQuery(this.inf_commentReplyQuery).then(res => {
        if (res.code === 200) {
          this.res_commentReplyQuery = res.content
        }
      })
    }
  },
  watch: {
    $route () {
      this.GetArticleDetails()
    }
  }
}
</script>
