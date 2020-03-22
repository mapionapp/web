import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    location: null,
    selectedPlace: null,
  },
  mutations: {
    setLocation(state, location) {
      state.location = location
    },
    setSelectedPlace(state, selectedPlace) {
      state.selectedPlace = selectedPlace
    },
  },
  actions: {},
  modules: {},
})
