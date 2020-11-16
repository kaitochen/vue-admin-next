import layout from "../layout/index";
const asyncRoutes = [
  {
    path: "/role",
    name: "Role",
    component: layout,
    meta: { title: "权限管理" },
    icon: "menu",
    title: "权限管理",
    local: true,
    children: [
      {
        path: "/menuManager",
        name: "MenuManager",
        component: () => import("@/views/Menu/menuManager"),
        meta: { title: "菜单管理" },
        local: true
      },
      {
        path: "/pageManager",
        name: "PageManager",
        component: () => import("@/views/Menu/pageManager"),
        meta: { title: "页面管理" },
        local: true
      }
    ]
  }
];
export default asyncRoutes;
