import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Generator from "admin-page-generator";
import elementUI from "element-ui";
import MlTabs from "element-tabs";
import KeepActive from "vue-keep-active";
import "./router/permission";
import "./element.scss";
import { _page, _request, _route } from "@/util/util.js";
import { aliUpload } from "@/util/upload.js";
Vue.config.productionTip = false;
Vue.use(elementUI, { size: "small" });
Vue.use(MlTabs);
Vue.use(KeepActive);
Vue.use(Generator, {
  navigator: {
    page: _page,
    route: _route,
    request: _request,
    http: 444
  },
  upload: aliUpload
});
import "./api/mock";
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
