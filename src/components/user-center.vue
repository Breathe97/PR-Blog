<template>
  <div id="user-center">
    <div v-if="token">
      <h4>704340916@qq.com，您好！</h4>
    </div>
    <div v-else>
      <div class="title">
        <h4>
          您还未登录，请先
          <span style="color:cornflowerblue;cursor: pointer;" @click="ClickModel(0)">登录</span>！
        </h4>
      </div>
      <div>
        <!-- 登录 -->
        <el-form ref="form" v-if="regModel===0">
          <el-form-item>
            <el-input v-model="inf_login.UPE" placeholder="请输入您的账号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="inf_login.password" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="DoLogin(1)">登录</el-button>
          <el-row type="flex" justify="end" class="end">
            <el-col :span="6">
              <span>忘记密码?</span>
            </el-col>
            <el-col :span="3">
              <span style="color:cornflowerblue;cursor: pointer;" @click="ClickModel(1)">注册</span>
            </el-col>
          </el-row>
        </el-form>
        <!-- 用户名注册 -->
        <el-form ref="form" v-else-if="regModel===1">
          <el-form-item>
            <el-input v-model="inf_reg.username" placeholder="请输入您的用户名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="inf_reg.password" placeholder="请输入您的密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="inf_reg._password" placeholder="请重复输入密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="DoRegister(1)">注册</el-button>
          <el-row type="flex" justify="end" class="end">
            <el-col :span="4">
              <span @click="ClickModel(2)">手机注册</span>
            </el-col>
            <el-col :span="4">
              <span style="color:cornflowerblue;cursor: pointer;" @click="ClickModel(3)">邮箱注册</span>
            </el-col>
          </el-row>
        </el-form>
        <!-- 邮箱注册 -->
        <el-form ref="form" v-else-if="regModel===3">
          <el-form-item>
            <el-input v-model="inf_reg.email" placeholder="请输入您的邮箱"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="14">
              <el-input v-model.number="inf_reg.VC_code" placeholder="请输入邮箱验证码"></el-input>
            </el-col>
            <el-col :span="9" :offset="1" style="text-align:center;">
              <el-button
                type="primary"
                :disabled="time>1"
                @click="GetVS_code"
              >{{time===0?'获取':'重新发送'+(time===1?'':'('+time+')')}}</el-button>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-input v-model="inf_reg.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-button type="primary" @click="DoRegister(3)">注册</el-button>
          <el-row type="flex" justify="end" class="end">
            <el-col :span="4">
              <span @click="ClickModel(2)">手机注册</span>
            </el-col>
            <el-col :span="5">
              <span style="color:cornflowerblue;cursor: pointer;" @click="ClickModel(1)">用户名注册</span>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import { ApiLogin, ApiRegister, } from '@/api/user'
import { ApiVerificationCode } from '@/api/common'
export default {
  data () {
    return {
      value: '',
      token: null,
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
  mounted () {
    this.token = localStorage.getItem('token');
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
}
</script>