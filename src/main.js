import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Generator from "admin-page-generator";
import elementUI from "element-ui";
import MlTabs from "element-tabs";
import KeepActive from "vue-keep-active";
import "./element.scss";
import { page, request } from "@/util/util.js";
Vue.config.productionTip = false;
Vue.use(elementUI, { size: "small" });
Vue.use(MlTabs);
Vue.use(KeepActive);
Vue.use(Generator, { page: page, route: 222, request: request, http: 444 });

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
