import { createStore } from "vuex";

export default createStore({
  state: {
    user: null,
    isLoggedIn: false,
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
      if (user) {
        state.isLoggedIn = true;
      } else {
        state.isLoggedIn = false;
      }
    },
    unsetUser(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit("setUser", user);
    },
    unsetUser({ commit }) {
      commit("unsetUser");
    },
  },
  modules: {},
});
