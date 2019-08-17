<template>
  <div id="user-center">
    <div v-if="$store.state.info">
      <h4>
        {{$store.state.info.nickname||$store.state.info.username||$store.state.info.email||$store.state.info.phone}}，您好！
        <Icon type="ios-exit-outline" class="logout" @click.native="Logout()" />
        <Icon
          v-if="!$store.state.info.power"
          type="ios-cog-outline"
          class="logout"
          @click.native="Toadmin"
        />
      </h4>
    </div>
    <div v-else>
      <div class="title">
        <h4>
          您还未登录，请先
          <span style="color:cornflowerblue;cursor: pointer;" @click="ClickModel(0)">登录</span>
          ！
        </h4>
      </div>
      <div>
        <!-- 登录 -->
        <el-form ref="form" v-if="regModel===0">
          <el-form-item>
            <el-input placeholder="请输入您的账号" v-model="inf_login.UPE">
              <template slot="prepend">
                <Icon type="ios-person" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入您的密码" v-model="inf_login.password" show-password>
              <template slot="prepend">
                <Icon type="ios-keypad" />
              </template>
            </el-input>
          </el-form-item>
          <el-button
            type="primary"
            @click="DoLogin(1)"
            :icon="loging?'el-icon-loading':''"
            :disabled="loging"
          >登录</el-button>
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
            <el-input placeholder="请输入您的用户名" v-model="inf_reg.username">
              <template slot="prepend">
                <Icon type="ios-person" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入您的密码" v-model="inf_reg.password" show-password>
              <template slot="prepend">
                <Icon type="ios-keypad" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请重复输入密码" v-model="inf_reg._password" show-password>
              <template slot="prepend">
                <Icon type="ios-keypad" />
              </template>
            </el-input>
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
            <el-input placeholder="请输入您的邮箱" v-model="inf_reg.email">
              <template slot="prepend">
                <Icon type="ios-mail" />
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入邮箱验证码" v-model="inf_reg.VC_code">
              <template slot="prepend">
                <Icon type="md-key" />
              </template>
              <template slot="append">
                <span
                  :class="time>1?'disabled':'get_code'"
                  @click="time>1?'':GetVS_code()"
                >{{time===0?'获取':'重新发送'+(time===1?'':'('+time+')')}}</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="请输入您的密码" v-model="inf_reg.password" show-password>
              <template slot="prepend">
                <Icon type="ios-keypad" />
              </template>
            </el-input>
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
import { ApiLogin, ApiRegister, ApiLogout, ApiInfo } from '@/api/user'
import { ApiVerificationCode } from '@/api/common'
export default {
  data () {
    return {
      value: '',
      time: 0,
      theme1: 'light',
      loging: false,
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
  created () {
  },
  methods: {
    // 获取用户信息
    GetInfo () {
      ApiInfo().then(res => {
        if (res.code === 200) {
          return this.$store.commit('SET_INFO', res.content)
        }
        return this.$store.commit('SET_INFO', null)
      })
    },
    // 确定登录
    DoLogin () {
      this.loging = true
      ApiLogin(this.inf_login).then(res => {
        this.loging = false
        if (res.code === 200) {
          localStorage.setItem('token', res.content.token)
          this.$message.success('登录成功')
        } else {
          this.$message.error(res.message)
        }
        this.GetInfo()
      })
    },
    // 注销
    Logout () {
      ApiLogout().then(() => {
        localStorage.removeItem('token')
        this.$store.commit('SET_INFO', null)
        this.$message.success('已注销')
      })
    },
    //注册 按钮
    DoRegister (val) {
      this.inf_reg.model = val // 切换注册模式
      ApiRegister(this.inf_reg).then(res => {
        if (res.code === 200) {
          this.$message.success('注册成功')
          localStorage.setItem('token', res.content.token)
          this.GetInfo()
        } else {
          this.$message.error(res.message)
        }
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
      let reg = /^([a-zA-Z]|[0-9])(w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/ // 邮箱验证规则
      //验证邮箱是否正确
      if (!reg.test(this.inf_reg.email)) {
        return this.$message.info('请输入正确的邮箱')
      }
      ApiVerificationCode(this.inf_reg.email).then(() => {
        this.time = 60
        let a = setInterval(() => {
          this.time--
          if (this.time === 1) {
            clearInterval(a)
          }
        }, 1000)
      })
    },
    // 后台管理
    Toadmin () {
      // 获取用户信息
      return ApiInfo()
        .then(res => {
          if (res.content.power !== 0) {
            // 权限不足
            this.$message.error('权限不足')
          }
          // 权限足够
          return this.$router.push('/admin')
        })
        .catch(() => {
          // 权限异常
          this.$message.error('权限异常')
          localStorage.removeItem('token')
          localStorage.removeItem('info')
        })
    }
  }
}
</script>