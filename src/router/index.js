import Vue from "vue";
import VueRouter from "vue-router";
import login from "../layout/login.vue";
import setting from "@/views/setting";
import layout from "../layout/index";
import store from "../store/index";
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  store.dispatch("routeTab/push", location);
  return VueRouterPush.call(this, location).catch(err => console.warn(err));
};

Vue.use(VueRouter);
export const baseRoutes = [
  {
    path: "/login",
    name: "Login",
    component: login,
    hidden: true
  },
  {
    path: "/setting",
    name: "Setting",
    component: setting,
    hidden: true
  },
  {
    path: "/",
    component: layout,
    redirect: "/dashboard",
    hidden: true,
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard"),
        name: "Dashboard",
        meta: { title: "工作台", icon: "dashboard", affix: true }
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/layout/404.vue"),
    hidden: true
  },
  {
    path: "/generate",
    component: layout,
    children: [
      {
        path: "page/:routeName",
        component: () => import("@/views/generator.vue"),
        name: "Generator"
      }
    ]
  }
];

const router = new VueRouter({
  routes: baseRoutes
});

export default router;
