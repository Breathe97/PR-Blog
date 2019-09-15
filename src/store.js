import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    userCenter: false,
    info: null
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    USER_CENTER_TRUE(state, val) {
      state.userCenter = val
    },
    SET_INFO(state, info) {
      state.info = info
    }
  },
  actions: {}
})
