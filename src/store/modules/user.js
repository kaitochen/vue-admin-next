import { getToken, clearToken, setToken } from "../../util/auth";
import { login, getRole } from "@/api/user";
const state = {
  token: getToken(),
  roles: []
};
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token;
  },
  REMOVE_TOKEN: state => {
    state.token = null;
  },
  SET_ROLE: (state, role) => {
    state.roles = role;
  },
  REMOVE_ROLE: state => {
    state.roles = [];
  }
};

const actions = {
  login({ commit }, loginData) {
    const { username, password } = loginData;
    return new Promise((resolve, reject) => {
      login({
        username,
        password
      })
        .then(res => {
          if (res.code === 200) {
            commit("SET_TOKEN", res.data.token);
            setToken(res.data.token);
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  },
  logout({ commit }) {
    commit("REMOVE_TOKEN");
    commit("REMOVE_ROLE");
    clearToken();
  },
  getRole({ commit }) {
    return new Promise((resolve, reject) => {
      getRole()
        .then(res => {
          if (res.code === 200) {
            commit("SET_ROLE", res.data);
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch(err => {
          reject(err);
        });
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
