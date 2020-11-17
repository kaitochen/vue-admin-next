import { matchRoutes, matchMenu } from "./routes";
export const getToken = () => {
  let token = sessionStorage.getItem("TOKEN");
  return token || null;
};
export const hadToken = () => {
  let token = sessionStorage.getItem("TOKEN");
  return token ? true : false;
};
export const clearToken = () => {
  sessionStorage.removeItem("TOKEN");
};
export const setToken = token => {
  sessionStorage.setItem("TOKEN", token);
};
export const matchRoleToRouter = role => {
  let accessRoutes = matchRoutes(role);
  return accessRoutes;
};
export const matchRoleToMenu = role => {
  const actualMenu = matchMenu(role);
  return actualMenu;
};
export const getAllRole = role => {
  let _role = {};
  dealRole(role, _role);
  return _role;
};
const dealRole = (role, result) => {
  role.forEach(_role => {
    if (_role.role) {
      result[_role.role] = 1;
    }
    if (_role.children && _role.children.length > 0) {
      dealRole(_role.children, result);
    }
  });
};
