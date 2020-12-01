import Request from "../util/request";
import { jsonToFormData } from "../util/operation";
export const getMenuList = () => {
  return Request({
    url: "/admin/access/v1/cms-menu/list",
    method: "GET"
  });
};
export const addMenu = data => {
  return Request({
    url: "/admin/access/v1/cms-menu/add",
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const editMenu = (id, data) => {
  return Request({
    url: "/admin/access/v1/cms-menu/update/" + id,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const deleteMenu = id => {
  return Request({
    url: "/admin/access/v1/cms-menu/del/" + id,
    method: "DELETE"
  });
};
export const addSubMenu = data => {
  return Request({
    url: "/admin/access/v1/cms-menu-sub/add",
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const editSubMenu = (id, data) => {
  return Request({
    url: "/admin/access/v1/cms-menu-sub/update/" + id,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const deleteSubMenu = id => {
  return Request({
    url: "/admin/access/v1/cms-menu-sub/del/" + id,
    method: "DELETE"
  });
};
export const addAction = data => {
  return Request({
    url: "/admin/access/v1/cms-menu-fun/add",
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const editAction = (id, data) => {
  return Request({
    url: "/admin/access/v1/cms-menu-fun/update/" + id,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const deleteAction = id => {
  return Request({
    url: "/admin/access/v1/cms-menu-fun/del/" + id,
    method: "DELETE"
  });
};
export const getPageList = () => {
  return Request({
    url: "/admin/access/v1/cms-page-group/list",
    method: "GET"
  });
};
export const addPageGroup = data => {
  return Request({
    url: "/admin/access/v1/cms-page-group/add",
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const editPageGroup = (id, data) => {
  return Request({
    url: "/admin/access/v1/cms-page-group/update/" + id,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const deletePageGroup = id => {
  return Request({
    url: "/admin/access/v1/cms-page-group/del/" + id,
    method: "DELETE"
  });
};
export const addPage = data => {
  return Request({
    url: "/admin/access/v1/cms-page/add",
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const editPage = (id, data) => {
  return Request({
    url: "/admin/access/v1/cms-page/update/" + id,
    method: "POST",
    data: jsonToFormData(data)
  });
};
export const deletePage = id => {
  return Request({
    url: "/admin/access/v1/cms-page/del/" + id,
    method: "DELETE"
  });
};

export const importPageConfig = () => {
  return Request({
    url: "http://localhost:8080/mockApi/importConfig",
    method: "POST"
  });
};
export const savePageConfig = data => {
  return Request({
    url: "http://localhost:8080/mockApi/saveConfig",
    method: "POST",
    data: jsonToFormData(data)
  });
};

export const getPageHistory = id => {
  return Request({
    url: "/admin/access/v1/cms-page-version/list/" + id,
    method: "GET"
  });
};

export const addPageHistory = data => {
  return Request({
    url: "/admin/access/v1/cms-page-version/add",
    method: "POST",
    data: jsonToFormData(data)
  });
};

export const pageHistoryDetail = id => {
  return Request({
    url: "/admin/access/v1/cms-page-version/details/" + id,
    method: "GET"
  });
};

export const deleteHistory = id => {
  return Request({
    url: "/admin/access/v1/cms-page-version/del/" + id,
    method: "DELETE"
  });
};

export const getPageInfo = type => {
  return Request({
    url: "/admin/access/v1/cms-page/details/route-name/" + type,
    method: "GET"
  });
};
