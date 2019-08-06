<template>
  <div id="note">
    <el-row class="top">
      <span :class="inf_articleQuery.model===0?'active':''" @click="ClickModel(0)">默认</span>
      <el-divider direction="vertical"></el-divider>
      <span :class="inf_articleQuery.model===1?'active':''" @click="ClickModel(1)">最新</span>
      <el-divider direction="vertical"></el-divider>
      <span :class="inf_articleQuery.model===3?'active':''" @click="ClickModel(3)">最热</span>
    </el-row>
    <el-row
      class="list"
      v-for="(item, index) in res_articleQuery.list"
      :key="index"
      @click.native="ToDetails(item._id)"
    >
      <el-row class="top">
        <h2>{{item.title}}</h2>
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
      </el-row>
      <el-row class="content">
        <el-row>
          <el-col class="list-img" :span="8">
            <el-image :src="item.img_url" />
          </el-col>
          <el-col class="text" :span="16">
            <p>{{item.content}}</p>
          </el-col>
        </el-row>
      </el-row>
    </el-row>
    <el-row class="more">
      <span @click="More">
        <i v-if="loading" class="el-icon-loading"></i>
        {{more}}
      </span>
    </el-row>
  </div>
</template>
<script>
import { ApiArticleQuery } from '@/api/article'
export default {
  data () {
    return {
      more: '加载更多',
      loading: false,
      inf_articleQuery: {
        "model": 0,
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_articleQuery: {},
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
      ApiArticleQuery(this.inf_articleQuery).then(res => {
        this.res_articleQuery = res.content
        this.loading = false
        if (this.inf_articleQuery.sizes >= this.res_articleQuery.total) {
          return this.more = '暂无更多'
        }
      })
    },
    // 切换模式
    ClickModel (val) {
      this.inf_articleQuery.model = val
      this.GetArticleQuery()
    },
    More () {
      if (this.more === '暂无更多') {
        return
      }
      this.inf_articleQuery.sizes += 5
      this.loading = true
      this.GetArticleQuery()
    }
  },
}
</script>
