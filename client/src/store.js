import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    searchStatus: 0,
    // 0 - not started
    // 1 - in progress
    // 2 - error
    // 3 - received
    id1: "",
    id2: "",
    first_user_link: "",
    second_user_link: "",
    mutualData: {}
  },
  mutations: {
    changeStatus(state, payload) {
      state.searchStatus = payload;
    },
    writeMutualData(state, payload) {
      state.mutualData = payload;
    },
    setFirstId(state, payload) {
      state.id1 = payload;
    },
    setSecondId(state, payload) {
      state.id2 = payload;
    },
    setFirstUserLink(state, payload) {
      state.first_user_link = payload;
    },
    setSecondUserLink(state, payload) {
      state.second_user_link = payload;
    }
  },
  actions: {}
});
