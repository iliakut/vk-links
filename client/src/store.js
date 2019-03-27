import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchStatus: 0
    // 0 - not started
    // 1 - in progress
    // 2 - error
    // 3 - received
  },
  mutations: {
    changeStatus(state, payload) {
      state.searchStatus = payload;
    }
  },
  actions: {}
});
