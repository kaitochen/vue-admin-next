import Request from "../util/request";
import { jsonToFormData } from "../util/operation";
export const login = data => {
  return Request({
    url: "/admin/v1/login",
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const getRole = () => {
  return Request({
    url: "/admin/access/v1/function/role",
    method: "GET"
  });
};
export const getRoleList = params => {
  return Request({
    url: "/admin/access/v1/sys-role/list",
    method: "GET",
    params: params
  });
};
export const deleteRole = id => {
  return Request({
    url: `/admin/access/v1/sys-role`,
    method: "DELETE",
    params: {
      ids: id
    }
  });
};
export const addRole = data => {
  return Request({
    url: "/admin/access/v1/sys-role",
    method: "PUT",
    data: jsonToFormData(data)
  });
};
//获取后台用户信息
export const getUserInfo = () => {
  return Request({
    url: `/admin/access/v1/user/info`,
    method: "GET"
  });
};
export const editRole = (id, data) => {
  return Request({
    url: `/admin/access/v1/sys-role/${id}`,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const getRoleData = id => {
  return Request({
    url: `/admin/access/v1/sys-role/${id}`,
    method: "GET"
  });
};
export const getAllPermission = () => {
  return Request({
    url: "/admin/v1/all-role",
    method: "GET"
  });
};
export const getUserList = params => {
  return Request({
    url: "/admin/access/v1/sys-user/list",
    method: "GET",
    params: params
  });
};
export const addUser = data => {
  return Request({
    url: "/admin/access/v1/sys-user",
    method: "PUT",
    data: jsonToFormData(data)
  });
};
export const editUser = (id, data) => {
  return Request({
    url: "/admin/access/v1/sys-user/" + id,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const getUserData = id => {
  return Request({
    url: `/admin/access/v1/sys-user/${id}`,
    method: "GET"
  });
};
export const deleteUser = params => {
  return Request({
    url: `/admin/access/v1/sys-user`,
    method: "DELETE",
    params
  });
};
export const editUserPassword = (id, data) => {
  return Request({
    url: `/admin/access/v1/sys-user/${id}/password`,
    method: "POST",
    data: jsonToFormData(data)
  });
};
//获取工作台信息
export const getTool = params => {
  return Request({
    url: `/admin/access/v1/tool-table/info`,
    method: "GET",
    params
  });
};

//app用户管理

// 添加
export const addApp = data => {
  return Request({
    url: "/admin/access/v1/user/member/add",
    method: "PUT",
    data: jsonToFormData(data)
  });
};

//获取app用户列表
export const appList = params => {
  return Request({
    url: "/admin/access/v1/user/member/page",
    method: "GET",
    params
  });
};

//获取所有角色 和对应的账号 /admin/access/v1/selector/select/{optionsMappingContext}/{key}
export const getUser = data => {
  return Request({
    url: `/admin/access/v1/selector/select/${data.type}/${data.key}`,
    method: "GET"
  });
};

//禁用app用户
export const disableApp = id => {
  return Request({
    url: `/admin/access/v1/user/member/disable/${id}`,
    method: "DELETE"
  });
};

//删除app用户
export const deleteApp = params => {
  return Request({
    url: `/admin/access/v1/user/member/delete`,
    method: "DELETE",
    params
  });
};

//解禁app用户
export const enableApp = id => {
  return Request({
    url: `/admin/access/v1/user/member/enable/${id}`,
    method: "POST"
  });
};
