import { queryToString } from "@/util/operation";
const state = {
  activeRoute: {},
  visitedRoutes: [],
  excludeRoutes: [],
  tabRoutes: {}
};
const mutations = {
  INIT_TAB_ROUTES: (state, routes) => {
    state.visitedRoutes = routes;
  },
  ADD_TAB_ROUTE: (state, route) => {
    state.visitedRoutes.push(route);
  },
  SET_ACTIVE_ROUTE: (state, route) => {
    state.activeRoute = route;
  },
  DELETE_TAB_ROUTE: (state, routeIndex) => {
    return new Promise(resolve => {
      state.visitedRoutes.splice(routeIndex, 1);
      resolve();
    });
  },
  ADD_EXCLUDE_ROUTE: (state, route) => {
    state.excludeRoutes.push(route);
  },
  DELETE_EXCLUDE_ROUTE: (state, routeIndex) => {
    state.excludeRoutes.splice(routeIndex, 1);
  },
  PUSH_ROUTE: (state, location) => {
    let { path, fullPath, query } = location;
    console.log(location);
    let _path = "";
    if (fullPath) {
      _path = fullPath;
    } else {
      _path = path + queryToString(query);
    }
    if (!state.tabRoutes[_path]) {
      state.tabRoutes[_path] = location;
    }
  },
  DELETE_ROUTE: (state, path) => {
    delete state.tabRoutes[path];
  }
};
const actions = {
  initTabRoutes: ({ commit }, routes) => {
    commit("INIT_TAB_ROUTES", routes);
    commit("SET_ACTIVE_ROUTE", routes[0]);
  },
  addTabRoute: ({ state, commit, dispatch }, route) => {
    if (!state.visitedRoutes.some(v => v.fullPath === route.fullPath)) {
      commit("ADD_TAB_ROUTE", {
        fullPath: route.fullPath,
        path: route.path,
        name: route.name,
        meta: { ...route.meta },
        query: { ...route.query },
        params: { ...route.params }
      });
      dispatch("addExcludeRoute", route.fullPath);
    }
    commit("SET_ACTIVE_ROUTE", route);
  },
  setActiveRoute: ({ commit }, tabName) => {
    return new Promise((resolve, reject) => {
      let matchedRoute = state.visitedRoutes.filter(
        route => route.fullPath === tabName
      );
      if (matchedRoute.length > 0) {
        commit("SET_ACTIVE_ROUTE", matchedRoute[0]);
        resolve(matchedRoute[0]);
      } else {
        reject();
      }
    });
  },
  deleteRoute: ({ state, commit, dispatch }, tabName) => {
    return new Promise(resolve => {
      let matchedRouteIndex = -1;
      state.visitedRoutes.forEach((route, index) => {
        if (route.fullPath === tabName) {
          matchedRouteIndex = index;
        }
      });
      if (matchedRouteIndex < 0) {
        return;
      }
      commit("DELETE_ROUTE", tabName);
      dispatch("deleteExcludeRoute", tabName);
      if (tabName !== state.activeRoute.fullPath) {
        commit("DELETE_TAB_ROUTE", matchedRouteIndex);
        return;
      }
      let _activeRoute;
      if (state.visitedRoutes[matchedRouteIndex - 1]) {
        _activeRoute = state.visitedRoutes[matchedRouteIndex - 1];
      } else if (state.visitedRoutes[matchedRouteIndex + 1]) {
        _activeRoute = state.visitedRoutes[matchedRouteIndex + 1];
      } else {
        _activeRoute = null;
      }
      commit("DELETE_TAB_ROUTE", matchedRouteIndex);
      if (_activeRoute !== null) {
        commit("SET_ACTIVE_ROUTE", _activeRoute);
      } else {
        resolve();
      }
    });
  },
  addExcludeRoute: ({ commit }, route) => {
    commit("ADD_EXCLUDE_ROUTE", route);
  },
  deleteExcludeRoute: ({ state, commit }, tabName) => {
    let matchedRouteIndex = -1;
    state.excludeRoutes.forEach((route, index) => {
      if (route === tabName) {
        matchedRouteIndex = index;
      }
    });
    if (matchedRouteIndex > -1) {
      commit("DELETE_EXCLUDE_ROUTE", matchedRouteIndex);
    }
  },
  push: ({ commit }, location) => {
    if (typeof location === "string") {
      commit("PUSH_ROUTE", { path: location });
    } else {
      commit("PUSH_ROUTE", location);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
