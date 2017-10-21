import Vue from 'vue'
import Vuex from 'vuex'
import { SET_INFO, SET_EVENT } from '../common/mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    info: {},
    event: null
  },
  mutations: {
    [SET_INFO] (state, newInfo) {
      state.info = newInfo
    },
    [SET_EVENT] (state, newEvent) {
      state.event = newEvent
    }
  }
})

export default store
