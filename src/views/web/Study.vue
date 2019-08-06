<template>
  <div id="study" v-loading="loading">
    <div class="books">
      <div class="list">
        <el-divider content-position="left">
          <span>新</span>手入门
        </el-divider>
        <div class="content" v-for="(item,index) in res_articleQuery.list" :key="index">
          <div class="title" @click="ToDetails(item._id)">{{item.title}}</div>
          <div class="other">
            <span>
              <i class="el-icon-time">{{item.E_time | TimeFormat}}</i>
            </span>
            <span>
              <i class="el-icon-view">{{item.look_count}}</i>
            </span>
            <span>
              <i class="el-icon-chat-line-square">{{item.comment_count}}</i>
            </span>
            <span>
              <i class="el-icon-star-off">{{item.collection_count}}</i>
            </span>
            <span>
              <i class="el-icon-discount">{{item.tag | TagFormat}}</i>
            </span>
          </div>
        </div>
      </div>
      <div class="list">
        <el-divider content-position="left">
          <span>初</span>级必备
        </el-divider>
        <div class="content" v-for="(item,index) in res_articleQuery2.list" :key="index">
          <div class="title" @click="ToDetails(item._id)">{{item.title}}</div>
          <div class="other">
            <span>
              <i class="el-icon-time">{{item.E_time | TimeFormat}}</i>
            </span>
            <span>
              <i class="el-icon-view">{{item.look_count}}</i>
            </span>
            <span>
              <i class="el-icon-chat-line-square">{{item.comment_count}}</i>
            </span>
            <span>
              <i class="el-icon-star-off">{{item.collection_count}}</i>
            </span>
            <span>
              <i class="el-icon-discount">{{item.tag | TagFormat}}</i>
            </span>
          </div>
        </div>
      </div>
      <div class="list">
        <el-divider content-position="left">
          <span>中</span>级进阶
        </el-divider>
        <div class="content" v-for="(item,index) in res_articleQuery3.list" :key="index">
          <div class="title" @click="ToDetails(item._id)">{{item.title}}</div>
          <div class="other">
            <span>
              <i class="el-icon-time">{{item.E_time | TimeFormat}}</i>
            </span>
            <span>
              <i class="el-icon-view">{{item.look_count}}</i>
            </span>
            <span>
              <i class="el-icon-chat-line-square">{{item.comment_count}}</i>
            </span>
            <span>
              <i class="el-icon-star-off">{{item.collection_count}}</i>
            </span>
            <span>
              <i class="el-icon-discount">{{item.tag | TagFormat}}</i>
            </span>
          </div>
        </div>
      </div>
      <div class="list">
        <el-divider content-position="left">
          <span>高</span>级选修
        </el-divider>
        <div class="content" v-for="(item,index) in res_articleQuery4.list" :key="index">
          <div class="title" @click="ToDetails(item._id)">{{item.title}}</div>
          <div class="other">
            <span>
              <i class="el-icon-time">{{item.E_time | TimeFormat}}</i>
            </span>
            <span>
              <i class="el-icon-view">{{item.look_count}}</i>
            </span>
            <span>
              <i class="el-icon-chat-line-square">{{item.comment_count}}</i>
            </span>
            <span>
              <i class="el-icon-star-off">{{item.collection_count}}</i>
            </span>
            <span>
              <i class="el-icon-discount">{{item.tag | TagFormat}}</i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ApiArticleQuery } from '@/api/article'
export default {
  data () {
    return {
      loading: true,
      inf_articleQuery: {
        "model": 0,
        "type": "新手入门",
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      inf_articleQuery2: {
        "model": 0,
        "type": "初级必备",
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      inf_articleQuery3: {
        "model": 0,
        "type": "中级进阶",
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      inf_articleQuery4: {
        "model": 0,
        "type": "高级选修",
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_articleQuery: {},
      res_articleQuery2: {},
      res_articleQuery3: {},
      res_articleQuery4: {}
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.GetArticleQuery()
      this.GetArticleQuery2()
      this.GetArticleQuery3()
      this.GetArticleQuery4()
      // axios.all([
      //   ApiArticleQuery(this.inf_articleQuery),
      //   ApiArticleQuery(this.inf_articleQuery2),
      //   ApiArticleQuery(this.inf_articleQuery3),
      //   ApiArticleQuery(this.inf_articleQuery4)
      // ]).then(axios.spread((acct, perms) => {
      //   console.log(acct);
      // }))
    },
    GetArticleQuery () {
      return ApiArticleQuery(this.inf_articleQuery).then(res => {
        this.res_articleQuery = res.content
        this.loading = false
      })
    },
    GetArticleQuery2 () {
      return ApiArticleQuery(this.inf_articleQuery2).then(res => {
        this.res_articleQuery2 = res.content
        this.loading = false
      })
    },
    GetArticleQuery3 () {
      return ApiArticleQuery(this.inf_articleQuery3).then(res => {
        this.res_articleQuery3 = res.content
        this.loading = false
      })
    },
    GetArticleQuery4 () {
      return ApiArticleQuery(this.inf_articleQuery4).then(res => {
        this.res_articleQuery4 = res.content
        this.loading = false
      })
    },
  }
}
</script>
