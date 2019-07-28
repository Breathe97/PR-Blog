<template>
  <div id="menu">
    <!-- logo -->
    <el-row class="top">
      <el-col class="left hidden-lg-and-up" :xs="16" :sm="13" :md="15" @click.native="meShow=true">
        <img src="@/assets/login.png" />
        <span>穿山甲的老爷爷</span>
      </el-col>
      <el-col class="left hidden-md-and-down" :md="15" :lg="5">
        <img src="@/assets/login.png" />
        <span>穿山甲的老爷爷</span>
      </el-col>
      <!-- 菜单 -->
      <el-col class="center hidden-md-and-down" :lg="12">
        <MenuItem></MenuItem>
      </el-col>
      <!-- 右侧 -->
      <el-col class="right" :xs="7" :sm="10" :md="8" :lg="6" :offset="1">
        <el-row type="flex" justify="center">
          <!-- 搜索 -->
          <el-col class="hidden-xs-only" :xs="0" :sm="12" :md="12" :lg="16">
            <div class="search">
              <el-input size="small" placeholder="Enter something..." prefix-icon="el-icon-search"></el-input>
            </div>
          </el-col>
          <el-col :xs="12" :sm="5" :md="5" :lg="6" :offset="2">
            <!-- 用户中心按钮 -->
            <div class="user" @click="userCenterShow=true">
              <Icon type="logo-octocat">
                <span class="hidden-md-and-down">用户中心</span>
              </Icon>
            </div>
          </el-col>
          <el-col :xs="10" :sm="5" :md="5" :lg="0">
            <div class="btn">
              <!-- 缩小菜单按钮 -->
              <div class="btn hidden-sm-and-up" @click="ChickMenu('xs')">
                <!-- <Icon type="md-menu"></Icon> -->
                <Icon type="ios-options" />
              </div>
              <div class="btn hidden-xs-only" @click="ChickMenu('sm')">
                <Icon type="ios-options" />
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 其他菜单组件 用于适应不同屏幕 -->
    <MenuItem class="xs hidden-sm-and-up" :class="activeMenu==='xs'?'active':''" :searchShow="true"></MenuItem>
    <MenuItem class="sm hidden-xs-only hidden-lg-and-up" :class="activeMenu==='sm'?'active':''"></MenuItem>
    <!-- 博主抽屉 -->
    <Drawer title="穿山甲的老爷爷" :closable="false" width="350" v-model="meShow">
      <ShowMe></ShowMe>
    </Drawer>
    <!-- 用户中心抽屉 -->
    <Drawer title="用户中心" :closable="false" width="350" v-model="userCenterShow">
      <UserCenter></UserCenter>
    </Drawer>
  </div>
</template>
<script>
import MenuItem from '@/layout/menu/menu-item'
import UserCenter from '@/components/user-center'
import ShowMe from '@/components/show-me'
import { ApiLogin, ApiRegister, } from '@/api/user'
import { ApiVerificationCode } from '@/api/common'
export default {
  props: ['menuShow'],
  components: {
    MenuItem, UserCenter, ShowMe
  },
  data () {
    return {
      activeName: '/home',
      activeMenu: null,
      meShow: false,
      userCenterShow: false,
      value: '',
      time: 0,
      theme1: 'light',
      inputFocus: false,
      regModel: 0, // 注册模式 0- 登录 1 -普通注册 2-手机注册 3 -邮箱注册
      inf_login: {
        model: 1,
        UPE: '',
        password: ''
      },
      inf_reg: {
        model: 1,
        username: '',
        email: '',
        phone: '',
        password: '',
        _password: '',
        VC_code: null
      }
    }
  },
  methods: {
    // 确定登录
    DoLogin () {
      ApiLogin(this.inf_login).then(res => {
        localStorage.setItem('token', res.content.token)
        this.$message.success('登录成功')
      })
    },
    //注册 按钮
    DoRegister (val) {
      this.inf_reg.model = val // 切换注册模式
      ApiRegister(this.inf_reg).then(res => {
        this.$message.success('注册成功')
        localStorage.setItem('token', res.content.token)
      })
    },
    // 切换注册模式
    ClickModel (val) {
      if (val === 2) {
        return this.$message.info('暂不可用')
      }
      this.regModel = val
    },
    // 切换菜单
    ChickMenu (val) {
      // console.log(val);
      if (this.activeMenu !== val) {
        this.activeMenu = val
      } else {
        this.activeMenu = null
      }

    },
    // 获取验证码
    GetVS_code () {
      ApiVerificationCode(this.inf_reg.email).then(() => {
        this.time = 10
        let a = setInterval(() => {
          this.time--
          if (this.time === 1) {
            clearInterval(a)
          }
        }, 1000)
      })
    }
  },
  watch: {
    menuShow () {
      if (this.menuShow === false) {
        this.activeMenu = null
      }
    }
  }
}
</script>