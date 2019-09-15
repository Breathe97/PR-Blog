<template>
  <div id="article">
    <el-row class="top">
      <el-input
        placeholder="请输入文章标题"
        clearable
        prefix-icon="el-icon-search"
        v-model="inf_articleQuery.title"
      ></el-input>
      <el-select
        v-model="inf_articleQuery.type"
        placeholder="请选择"
        prefix-icon="el-icon-search"
        clearable
      >
        <el-option v-for="item in res_articleType" :key="item.value" :label="item" :value="item"></el-option>
      </el-select>
      <!-- <el-input
        placeholder="请输入文章标签"
        clearable
        prefix-icon="el-icon-search"
        v-model="inf_articleQuery.tag"
      ></el-input>-->
      <el-button type="primary" icon="el-icon-search" @click="Search" @keyup.enter="Search"></el-button>
      <el-button type="success" @click="ClickAdd">添加</el-button>
    </el-row>
    <el-row>
      <el-table
        :data="res_articleQuery.list"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column type="index" label="ID" align="center"></el-table-column>
        <el-table-column prop="title" label="标题" align="center"></el-table-column>
        <el-table-column prop="type" label="类型" align="center"></el-table-column>
        <el-table-column prop="tag" label="标签" align="center"></el-table-column>
        <el-table-column prop="collection_count" label="收藏" align="center"></el-table-column>
        <el-table-column prop="comment_count" label="评论" align="center"></el-table-column>
        <el-table-column prop="look_count" label="查看" align="center"></el-table-column>
        <el-table-column prop="istop" label="置顶" align="center">
          <template slot-scope="scope">{{scope.row.istop}}</template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="ClickEdit(scope.row)">详情</el-button>
            <el-button size="mini" type="danger" @click="ArticleDel(scope.row._id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="bottom" type="flex" justify="end">
      <el-col :span="12">
        <transition name="el-zoom-in-top">
          <div v-if="isDel">
            <el-button type="danger" @click="ArticleDel(0)">删除</el-button>
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
          :total="res_articleQuery.total"
        ></el-pagination>
      </el-col>
    </el-row>
    <el-dialog :title="model===1?'增加':'修改'" :visible.sync="dialogVisible" :fullscreen="true">
      <el-row type="flex" justify="center">
        <el-col :span="11">
          <el-form ref="inf_articleAdd" :model="inf_articleAdd" label-width="80px">
            <el-form-item label="类型">
              <el-select v-model="inf_articleAdd.type" placeholder="请选择" clearable>
                <el-option
                  v-for="item in res_articleType"
                  :key="item.value"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="标签">
              <el-tag
                v-for="(tag,index) in inf_articleAdd.tag"
                :key="index"
                closable
                :disable-transitions="false"
                @close="handleClose(tag)"
              >{{tag}}</el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputTag"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm"
                @blur="handleInputConfirm"
              ></el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </el-form-item>
            <el-form-item label="标题">
              <el-input v-model="inf_articleAdd.title"></el-input>
            </el-form-item>
            <el-form-item label="封面图片">
              <el-upload
                class="upload-demo"
                action="/api/other/upload"
                :headers="headers"
                :on-success="OnSuccess"
                :limit="1"
                :show-file-list="false"
              >
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过5MB</div>
              </el-upload>
              <img :src="inf_articleAdd.img_url" alt />
            </el-form-item>
            <el-form-item label="描述">
              <el-input v-model="inf_articleAdd.describe"></el-input>
            </el-form-item>
            <el-upload
              class="avatar-uploader"
              action="/api/other/upload"
              name="file"
              :headers="headers"
              :show-file-list="false"
              list-type="picture"
              :multiple="false"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              :before-upload="beforeUpload"
            ></el-upload>
            <quill-editor
              class="editor"
              v-model="inf_articleAdd.content"
              ref="myQuillEditor"
              :options="editorOption"
              @blur="onEditorBlur($event)"
              @focus="onEditorFocus($event)"
              @change="onEditorChange($event)"
            ></quill-editor>
          </el-form>
        </el-col>
        <el-col :span="11" :offset="1">
          <div id="details">
            <el-row class="title">
              <h2>{{inf_articleAdd.title}}</h2>
            </el-row>
            <el-row class="other">
              <span>
                <i class="el-icon-time">{{new Date() | TimeFormat}}</i>
              </span>
              <span>
                <i class="el-icon-view">{{ 99}}</i>
              </span>
              <span>
                <i class="el-icon-chat-line-square">{{99}}</i>
              </span>
              <span>
                <i class="el-icon-star-off">{{99}}</i>
              </span>
              <span>
                <i class="el-icon-discount">{{inf_articleAdd.tag | TagFormat}}</i>
              </span>
            </el-row>
            <el-row class="describe">{{inf_articleAdd.describe}}</el-row>
            <div class="ql-container ql-snow">
              <div class="ql-editor" v-html="inf_articleAdd.content"></div>
            </div>
          </div>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="Yes">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { ApiArticleAdd, ApiArticleDel, ApiArticleQuery, ApiArticleEdit } from '@/api/article'
import { ApiArticleType } from '@/api/system'
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["image"] // 链接、图片、视频
  // ["link", "image", "video"] // 链接、图片、视频
];
export default {
  components: {
    quillEditor
  },
  data () {
    return {
      disabled: false,
      inputTag: '',
      inputVisible: false,
      loading: false,
      tinymceHtml: '',
      headers: {
        token: localStorage.getItem('token')
      },
      dialogVisible: false,
      model: 0, //1-添加 2-修改
      isDel: false,
      handleSelectionList: [],
      content: null,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function (value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              // link: function (value) {
              //   if (value) {
              //     var href = prompt('请输入url');
              //     this.quill.format("link", href);
              //   } else {
              //     this.quill.format("link", false);
              //   }
              // },
            }
          }
        }
      },
      inf_articleAdd: {
        "title": "我的第一篇文章",
        "type": "文章",
        "tag": [],
        "icon": "http://xxx.icon",
        "img_url": "我的第一篇文章",
        "describe": "我的第一篇文章的描述",
        "content": "我的第一篇文章的内容"
      },
      inf_articleQuery: {
        "model": 1,
        "type": "",
        "title": "",
        "pages": 1,
        "sizes": 10
      },
      res_articleQuery: {},
      res_articleType: [],
      inf_articleDel: {
        article_id: []
      },
      formData: ''
    }
  },
  mounted () {
    this.Init()
  },
  methods: {
    Init () {
      this.ArticleQuery()
      this.GetArticleType()
    },
    // 增加
    ArticleAdd () {
      ApiArticleAdd(this.inf_articleAdd).then(() => {
        this.$message.success('添加成功')
        this.ArticleQuery()
        this.dialogVisible = false
      })
    },
    //删除
    ArticleDel (id) {
      this.inf_articleDel.article_id = []
      if (id) {
        this.inf_articleDel.article_id[0] = id
      } else {
        // console.log(this.handleSelectionList);
        this.handleSelectionList.forEach(element => {
          this.inf_articleDel.article_id.push(element._id)
        });
      }
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ApiArticleDel(this.inf_articleDel).then(() => {
          this.$message.success('删除成功')
          this.ArticleQuery()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    // 查询文章
    ArticleQuery () {
      this.loading = true
      ApiArticleQuery(this.inf_articleQuery).then(res => {
        this.res_articleQuery = res.content
        this.loading = false
      })
    },
    // 获取文章类型
    GetArticleType () {
      ApiArticleType().then(res => {
        this.res_articleType = res.content.list
      })
    },
    // 搜索
    Search () {
      this.inf_articleQuery.pages = 1
      this.inf_articleQuery.sizes = 10
      this.ArticleQuery()
    },
    // 修改
    ArticleEdit () {
      ApiArticleEdit(this.inf_articleAdd).then(() => {
        this.ArticleQuery()
        this.$message.success('修改成功')
        this.dialogVisible = false
      })
    },
    // 打开对话框
    Dialog (model) {
      this.dialogVisible = true
      //增加
      if (model === 1) {
        this.inf_articleAdd = {}
        // console.log(this.inf_articleAdd);
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
      this.inf_articleQuery.sizes = val
      this.inf_articleQuery.pages = 1
      this.ArticleQuery()
    },
    // 几页
    handleCurrentChange (val) {
      this.inf_articleQuery.pages = val
      this.ArticleQuery()
    },
    // 添加按钮
    ClickAdd () {
      this.inf_articleAdd = {
        "title": "",
        "type": "",
        "tag": [],
        "icon": "",
        "img_url": "",
        "describe": "",
        "content": ""
      }
      this.model = 1
      this.dialogVisible = true
    },
    // 编辑按钮
    ClickEdit (val) {
      // console.log(val);
      this.inf_articleAdd = JSON.parse(JSON.stringify(val))
      this.inf_articleAdd.article_id = this.inf_articleAdd._id
      this.model = 2
      this.dialogVisible = true
    },
    // 确定按钮
    Yes () {
      if (this.model === 1) {
        // 确定添加
        return this.ArticleAdd()
      }
      if (this.model === 2) {
        // 确定修改
        return this.ArticleEdit()
      }
    },
    onEditorBlur () {
      //失去焦点事件
    },
    onEditorFocus () {
      //获得焦点事件
    },
    onEditorChange () {
      //内容改变事件
      this.$emit("input", this.content);
    },
    // 富文本图片上传前
    beforeUpload () {
      // 显示loading动画
      this.quillUpdateImg = true;
    },
    OnSuccess (res) {
      // console.log(res);
      this.inf_articleAdd.img_url = 'http://pryun.vip:3000' + res.content.path
    },
    uploadSuccess (res) {
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", 'http://pryun.vip:3000' + res.content.path);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError () {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    },
    // 删除标签
    handleClose (tag) {
      this.inf_articleAdd.tag.splice(this.inf_articleAdd.tag.indexOf(tag), 1);
    },
    // 输入标签
    showInput () {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm () {
      let inputValue = this.inputTag;
      if (inputValue) {
        this.inf_articleAdd.tag.push(inputValue);
      }
      this.inputVisible = false;
      this.inputTag = '';
    }
  },
  computed: {

  }
}
</script>
<style scope>
.editor {
  line-height: normal !important;
  height: 800px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>