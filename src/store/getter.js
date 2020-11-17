const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
  menu: state => state.permission.menu
};
export default getters;
