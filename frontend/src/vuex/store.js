import Vue from 'vue'
import Vuex from 'vuex'
import { SET_INFO, SET_EVENT, SET_FILTERS } from '../common/mutation-types'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    info: null,
    event: null,
    filters: null
  },
  mutations: {
    [SET_INFO] (state, newInfo) {
      state.info = newInfo
    },
    [SET_EVENT] (state, newEvent) {
      if (state.info === null) {
        state.event = newEvent
      }
    },
    [SET_FILTERS] (state, newFilters) {
      state.filters = newFilters
    }
  }
})

export default store
