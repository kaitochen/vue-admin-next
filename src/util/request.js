import axios from "axios";
import { Loading } from "element-ui";
const local = localStorage.getItem("local");
let request = null;
if (local === "true") {
  request = axios.create({
    // baseURL: "https://dev.api.beiru168.com/framework"
    baseURL: "http://localhost:8080"
  });
} else {
  request = axios.create({
    baseURL: "https://dev.api.beiru168.com/graves"
    // baseURL: "http://192.168.2.15:8080"
  });
}

// request.defaults.baseURL = _domain;
let loading;
request.interceptors.request.use(
  function(response) {
    if (sessionStorage.getItem("TOKEN")) {
      response.headers["Authorization"] = sessionStorage.getItem("TOKEN");
    }
    if (!response.config) {
      loading = Loading.service({ background: "rgba(255,255,255,0.3)" });
    }
    return response;
  },
  function(error) {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  function(response) {
    if (loading) {
      loading.close && loading.close();
    }

    return response.data;
  },
  function(error) {
    if (loading) {
      loading.close && loading.close();
    }
    // loading.close && loading.close();
    return Promise.reject(error);
  }
);
export const POST = request.post;
export const GET = request.get;
export const PUT = request.put;
export const DELETE = request.delete;
export default request;
