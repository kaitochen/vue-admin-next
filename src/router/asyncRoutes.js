import layout from "../layout/index";
const asyncRoutes = [
  {
    path: "/role",
    name: "Role",
    component: layout,
    icon: "menu",
    children: [
      {
        path: "/menuManager",
        name: "MenuManager",
        component: () => import("@/views/Menu/menuManager")
      },
      {
        path: "/pageManager",
        name: "PageManager",
        component: () => import("@/views/Menu/pageManager")
      }
    ]
  }
];
export default asyncRoutes;
