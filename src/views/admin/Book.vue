<template>
  <div id="book" v-loading="loading">
    <el-row class="top">
      <el-input
        placeholder="请输入书名"
        clearable
        prefix-icon="el-icon-search"
        v-model="inf_bookQuery.title"
      ></el-input>
      <el-button type="primary" icon="el-icon-search" @click="Search" @click.enter="Search"></el-button>
      <el-button type="success" @click="ClickAdd">添加</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="res_bookQuery.list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="书名" align="center"></el-table-column>
        <el-table-column prop="img_url" label="封面图片" align="center"></el-table-column>
        <el-table-column prop="url" label="详情" align="center"></el-table-column>
        <el-table-column prop="jd_url" label="京东" align="center"></el-table-column>
        <el-table-column prop="dd_url" label="当当" align="center"></el-table-column>
        <el-table-column prop="tm_url" label="天猫" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="ClickEdit(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="BookDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="bottom" type="flex" justify="end">
      <el-col :span="12">
        <transition name="el-zoom-in-top">
          <div v-if="isDel">
            <el-button type="danger" @click="BookDel(0)">删除</el-button>
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
          :total="res_bookQuery.total"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="model===1?'增加':'修改'" :visible.sync="dialogVisible" width="30%">
      <el-form ref="inf_bookAdd" :model="inf_bookAdd">
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_bookAdd.title">
            <template slot="prepend">书籍名称</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_bookAdd.img_url">
            <template slot="prepend">封面图片</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_bookAdd.url">
            <template slot="prepend">书籍详情</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_bookAdd.jd_url">
            <template slot="prepend">京东链接</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_bookAdd.dd_url">
            <template slot="prepend">当当链接</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="inf_bookAdd.tm_url">
            <template slot="prepend">天猫链接</template>
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
import { ApiBookAdd, ApiBookDel, ApiBookQuery, ApiBookEdit } from '@/api/book'
export default {
  name: 'book',
  data () {
    return {
      dialogVisible: false,
      model: 0, //1-添加 2-修改
      loading: false,
      isDel: false,
      handleSelectionList: [],
      inf_bookAdd: {
        "title": "我的第一篇书籍",
        "img_url": "http://liuwangshu.cn/life/android-advanced-secret.html",
        "url": "http://www.baidu.com",
        "jd_url": "http://www.baidu.com",
        "dd_url": "http://www.baidu.com",
        "tm_url": "http://www.baidu.com"
      },
      inf_bookQuery: {
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_bookQuery: {},
      inf_bookDel: {
        book_id: []
      }
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.BookQuery()
    },
    // 增加
    BookAdd () {
      ApiBookAdd(this.inf_bookAdd).then(() => {
        this.$message.success('添加成功')
        this.BookQuery()
        this.dialogVisible = false
      })
    },
    //删除
    BookDel (id) {
      this.inf_bookDel.book_id = []
      if (id) {
        this.inf_bookDel.book_id[0] = id
      } else {
        // console.log(this.handleSelectionList);
        this.handleSelectionList.forEach(element => {
          this.inf_bookDel.book_id.push(element._id)
        });
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ApiBookDel(this.inf_bookDel).then(() => {
          this.$message.success('删除成功')
          this.BookQuery()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    // 查询
    BookQuery () {
      this.loading = true
      ApiBookQuery(this.inf_bookQuery).then(res => {
        this.res_bookQuery = res.content
        this.loading = false
      })
    },
    // 搜索
    Search () {
      this.inf_bookQuery.pages = 1
      this.inf_bookQuery.sizes = 10
      this.BookQuery()
    },
    // 修改
    BookEdit () {
      // console.log(this.inf_bookAdd);
      ApiBookEdit(this.inf_bookAdd).then(() => {
        this.BookQuery()
        this.$message.success('修改成功')
        this.dialogVisible = false
      })
    },
    // 打开对话框
    Dialog (model) {
      this.dialogVisible = true
      //增加
      if (model === 1) {
        this.inf_bookAdd = {}
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
      this.inf_bookQuery.sizes = val
      this.inf_bookQuery.pages = 1
      this.BookQuery()
    },
    // 几页
    handleCurrentChange (val) {
      this.inf_bookQuery.pages = val
      this.BookQuery()
    },
    // 添加按钮
    ClickAdd () {
      this.inf_bookAdd = {}
      this.model = 1
      this.dialogVisible = true
    },
    // 编辑按钮
    ClickEdit (val) {
      this.inf_bookAdd = JSON.parse(JSON.stringify(val))
      this.inf_bookAdd.book_id = this.inf_bookAdd._id
      this.model = 2
      this.dialogVisible = true
    },
    // 确定按钮
    Yes () {
      if (this.model === 1) {
        // 确定添加
        return this.BookAdd()
      }
      if (this.model === 2) {
        // 确定修改
        return this.BookEdit()
      }
    }
  }
}
</script>
