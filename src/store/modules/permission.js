import { baseRoutes } from "../../router";
import { matchRoleToRouter } from "../../util/auth";
const state = {
  routes: []
};

const mutations = {
  SET_ROUTES: (state, route) => {
    state.routes = baseRoutes.concat(route);
  }
};
const actions = {
  generateRoutes({ commit }, role) {
    return new Promise(resolve => {
      let routes = matchRoleToRouter(role);
      commit("SET_ROUTES", routes);
      resolve(routes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
