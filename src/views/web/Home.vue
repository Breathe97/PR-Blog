<template>
  <div id="home">
    <div class="list" v-for="(item,index) in res_rticleQuery" :key="index">
      <el-row class="title">
        <h2>{{item.title}}</h2>
      </el-row>
      <el-row class="other">
        <span>
          <i class="el-icon-time">{{item.E_time | TimeFormat}}</i>
        </span>
        <span>
          <i class="el-icon-view">{{ item.look_count}}</i>
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
      </el-row>
      <el-row class="list-img">
        <el-image :src="item.img_url"></el-image>
      </el-row>
      <el-row class="text">
        <p>{{item.content}}</p>
      </el-row>
    </div>
  </div>
</template>
<script>
import { ApiArticleQuery } from '@/api/article'
export default {
  name: 'home',
  data () {
    return {
      count: 20,
      value2: false,
      scrollTop: 0,
      scrollHeight: 0,
      getList: false,
      scrollWidth: 0,
      inf_rticleQuery: {
        "model": 2,
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_rticleQuery: [],
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.GetArticleQuery()
    },
    // 查询文章
    GetArticleQuery () {
      ApiArticleQuery(this.inf_rticleQuery).then(res => {
        this.res_rticleQuery = res.content.list
      })
    },
  }
}
</script>