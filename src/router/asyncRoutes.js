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
  },
  {
    path: "/generator",
    name: "Generator-form",
    component: () => import("@/views/Generator/generator.vue")
  }
];
export default asyncRoutes;
