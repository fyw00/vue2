import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: JSON.parse(window.localStorage.getItem('lagou-edu-mobile-user') || null)
  },
  mutations: {
    setUser (state, payload) {
      state.user = JSON.parse(payload)
      window.localStorage.setItem('lagou-edu-mobile-user', payload)
    }
  },
  actions: {
  },
  modules: {
  }
})
