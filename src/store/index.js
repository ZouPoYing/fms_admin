import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      userId: '',
      userName: '',
      name: '',
      password: '',
      telephone: '',
      email: '',
      userType: '',
      question: '',
      answer: '',
      createTime: '',
      updateTime: ''
    }
  },
  mutations: {
    getUserId(state,userId) {
      state.user.userId = userId
    },
    getUserName(state,userName) {
      state.user.userName = userName
    },
    clearUserCache(state) {
      state.user.userId = '',
      state.user.userName = '',
      state.user.name = '',
      state.user.password = '',
      state.user.telephone = '',
      state.user.email = '',
      state.user.userType = '',
      state.user.question = '',
      state.user.answer = '',
      state.user.createTime = '',
      state.user.updateTime = ''
    }
  },
  actions: {

  },
  getters: {

  },
  modules: {

  }
})

export default store
