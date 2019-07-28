<template>
  <div id="zone">
    <el-row class="menu">
      <h3>我的工具</h3>
      <el-row>
        <el-col
          class="list"
          :span="11"
          v-for="(item, index) in res_articleQuery.list"
          :key="index"
          :xs="24"
          @click.native="ToDetails(item._id)"
        >
          <el-row>
            <h4>{{item.title}}</h4>
          </el-row>
          <el-row class="content">
            <el-col class="img">
              <img :src="item.img_url" alt />
            </el-col>
            <el-col class="text">
              <p>{{item.describe}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
    <el-row class="menu">
      <h3>我的作品</h3>
      <el-row>
        <el-col
          class="list"
          :span="11"
          v-for="(item, index) in res_articleQuery2.list"
          :key="index"
          :xs="24"
          @click.native="ToDetails(item._id)"
        >
          <el-row>
            <h4>{{item.title}}</h4>
          </el-row>
          <el-row class="content">
            <el-col class="img">
              <img :src="item.img_url" alt />
            </el-col>
            <el-col class="text">
              <p>{{item.describe}}</p>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>
<script>
import { ApiArticleQuery } from '@/api/article'
export default {
  data () {
    return {
      inf_articleQuery: {
        "model": 0,
        "type": "工具",
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 999
      },
      inf_articleQuery2: {
        "model": 0,
        "type": "作品",
        "tag": "",
        "title": "",
        "pages": 1,
        "sizes": 999
      },
      res_articleQuery: {},
      res_articleQuery2: {},
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.GetArticleQuery()
      this.GetArticleQuery2()
    },
    GetArticleQuery () {
      ApiArticleQuery(this.inf_articleQuery).then(res => {
        this.res_articleQuery = res.content
      })
    },
    GetArticleQuery2 () {
      ApiArticleQuery(this.inf_articleQuery2).then(res => {
        this.res_articleQuery2 = res.content
      })
    }
  }
};
</script>