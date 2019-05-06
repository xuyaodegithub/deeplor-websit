import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import servers from './moudle'

Vue.use(Vuex)

const store = new Vuex.Store({
  namespaced: true,//命名空间模块
  state,
  mutations,
  actions,
  getters,
  modules: {
    servers : servers
  }
})

export default store
