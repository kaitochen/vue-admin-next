import { matchRoutes } from "./routes";
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
