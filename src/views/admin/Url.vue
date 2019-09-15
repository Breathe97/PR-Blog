<template>
  <div id="url">
    <el-row class="top">
      <el-input
        placeholder="请输入标题"
        clearable
        prefix-icon="el-icon-search"
        v-model="inf_urlQuery.title"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="Search" @click.enter="Search"></el-button>
      <el-button type="success" @click="ClickAdd">添加</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="res_urlQuery.list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="url" label="链接" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="ClickEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="UrlDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="bottom" type="flex" justify="end">
      <el-col :span="12">
        <transition name="el-zoom-in-top">
          <div v-if="isDel">
            <el-button type="danger" @click="UrlDel(0)">删除</el-button>
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
          :total="res_urlQuery.total"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="model===1?'增加':'修改'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="inf_urlAdd" :model="inf_urlAdd">
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_urlAdd.title">
            <template slot="prepend">标题</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_urlAdd.url">
            <template slot="prepend">链接</template>
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Yes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>


<script>
import { ApiUrlAdd, ApiUrlDel, ApiUrlQuery, ApiUrlEdit } from '@/api/url'
export default {
  name: 'url',
  data () {
    return {
      dialogVisible: false,
      model: 0, //1-添加 2-修改
      isDel: false,
      handleSelectionList: [],
      loading: false,
      inf_urlAdd: {
        "title": "我的第一篇书籍",
        "url": "http://www.baidu.com",
      },
      inf_urlQuery: {
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_urlQuery: {},
      inf_urlDel: {
        url_id: []
      }
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.UrlQuery()
    },
    // 增加
    UrlAdd () {
      ApiUrlAdd(this.inf_urlAdd).then(() => {
        this.$message.success('添加成功')
        this.UrlQuery()
        this.dialogVisible = false
      })
    },
    //删除
    UrlDel (id) {
      this.inf_urlDel.url_id = []
      if (id) {
        this.inf_urlDel.url_id[0] = id
      } else {
        // console.log(this.handleSelectionList);
        this.handleSelectionList.forEach(element => {
          this.inf_urlDel.url_id.push(element._id)
        });
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ApiUrlDel(this.inf_urlDel).then(() => {
          this.$message.success('删除成功')
          this.UrlQuery()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    // 查询
    UrlQuery () {
      this.loading = true
      ApiUrlQuery(this.inf_urlQuery).then(res => {
        this.res_urlQuery = res.content
        this.loading = false
      })
    },
    // 搜索
    Search () {
      this.inf_urlQuery.pages = 1
      this.inf_urlQuery.sizes = 10
      this.UrlQuery()
    },
    // 修改
    UrlEdit () {
      // console.log(this.inf_urlAdd);
      ApiUrlEdit(this.inf_urlAdd).then(() => {
        this.$message.success('修改成功')
        this.dialogVisible = false
        this.UrlQuery()
      })
    },
    // 打开对话框
    Dialog (model) {
      this.dialogVisible = true
      //增加
      if (model === 1) {
        this.inf_urlAdd = {}
      }
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
      this.inf_urlQuery.sizes = val
      this.inf_urlQuery.pages = 1
      this.UrlQuery()
    },
    // 几页
    handleCurrentChange (val) {
      this.inf_urlQuery.pages = val
      this.UrlQuery()
    },
    // 添加按钮
    ClickAdd () {
      this.inf_urlAdd = {}
      this.model = 1
      this.dialogVisible = true
    },
    // 编辑按钮
    ClickEdit (val) {
      // console.log(val);
      this.inf_urlAdd = JSON.parse(JSON.stringify(val))
      this.inf_urlAdd.url_id = this.inf_urlAdd._id
      this.model = 2
      this.dialogVisible = true
    },
    // 确定按钮
    Yes () {
      if (this.model === 1) {
        // 确定添加
        return this.UrlAdd()
      }
      if (this.model === 2) {
        // 确定修改
        return this.UrlEdit()
      }
    }
  }
}
</script>
