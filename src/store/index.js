import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    location: null
  },
  mutations: {
    setLocation(state, location) {
      state.location = location
    }
  },
  actions: {},
  modules: {}
})
