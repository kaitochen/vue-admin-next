import { baseRoutes } from "../../router";
import { matchRoleToMenu, getAllRole } from "../../util/auth";
const state = {
  routes: [],
  menu: [],
  role: {}
};

const mutations = {
  SET_ROUTES: (state, route) => {
    state.routes = baseRoutes.concat(route);
  },
  SET_MENU: (state, menu) => {
    state.menu = menu;
  },
  SET_ROLE: (state, role) => {
    state.role = role;
  }
};
const actions = {
  generateRoutes({ commit }, routes) {
    return new Promise(resolve => {
      // let routes = matchRoleToRouter(role);
      commit("SET_ROUTES", routes);
      resolve(routes);
    });
  },
  generateMenu({ commit }, role) {
    return new Promise(resolve => {
      let menu = matchRoleToMenu(role);
      commit("SET_MENU", menu);
      resolve(menu);
    });
  },
  generateRole({ commit }, role) {
    let _role = getAllRole(role);
    commit("SET_ROLE", _role);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
