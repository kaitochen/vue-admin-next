import layout from "../layout/index";
const asyncRoutes = [
  {
    path: "/system",
    name: "System",
    component: layout,
    meta: { title: "系统管理" },
    icon: "system",
    title: "系统管理",
    local: true,
    children: []
  }
];
export default asyncRoutes;
