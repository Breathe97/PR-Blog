<template>
  <div id="message" v-loading="loading">
    <el-row>
      <el-table
        :data="res_messageQuery.list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="ID" align="center"></el-table-column>
        <el-table-column prop="message" label="内容" align="center"></el-table-column>
        <el-table-column prop="visitor_id" label="留言人" align="center"></el-table-column>
        <el-table-column prop="R_time" label="留言时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="MessageDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="bottom" type="flex" justify="end">
      <el-col :span="12">
        <transition name="el-zoom-in-top">
          <div v-if="isDel">
            <el-button type="danger" @click="MessageDel(0)">删除</el-button>
          </div>
        </transition>
      </el-col>
      <el-col :span="12">
        <el-pagination
          style="text-align: right; padding: 6px 0;"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[5, 10, 15, 20]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="res_messageQuery.total"
        ></el-pagination>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { ApiMessageDel, ApiMessageQuery } from '@/api/message'
export default {
  name: 'message',
  data () {
    return {
      dialogVisible: false,
      model: 0, //1-添加 2-修改
      loading: false,
      isDel: false,
      handleSelectionList: [],
      inf_messageQuery: {
        "pages": 1,
        "sizes": 10
      },
      res_messageQuery: {},
      inf_messageDel: {
        message_id: []
      }
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.MessageQuery()
    },
    //删除
    MessageDel (id) {
      this.inf_messageDel.message_id = []
      if (id) {
        this.inf_messageDel.message_id[0] = id
      } else {
        // console.log(this.handleSelectionList);
        this.handleSelectionList.forEach(element => {
          this.inf_messageDel.message_id.push(element._id)
        });
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ApiMessageDel(this.inf_messageDel).then(() => {
          this.$message.success('删除成功')
          this.MessageQuery()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    // 查询
    MessageQuery () {
      this.loading = true
      ApiMessageQuery(this.inf_messageQuery).then(res => {
        this.res_messageQuery = res.content
        this.loading = false
      })
    },
    // 多选
    handleSelectionChange (val) {
      if (val.length !== 0) {
        this.isDel = true
      } else {
        this.isDel = false
      }
      this.handleSelectionList = val
    },
    //几条 
    handleSizeChange (val) {
      this.inf_messageQuery.sizes = val
      this.inf_messageQuery.pages = 1
      this.MessageQuery()
    },
    // 几页
    handleCurrentChange (val) {
      this.inf_messageQuery.pages = val
      this.MessageQuery()
    }
  }
}
</script>
