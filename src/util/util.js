import router from "@/router/index";
import request from "@/util/request";
export const _page = params => {
  let { body = {}, ..._params } = params;
  return request({
    ..._params,
    data: body
  });
};

export const _request = params => {
  let { body = {}, ..._params } = params;
  return request({
    ..._params,
    data: body
  });
};

export const _route = params => {
  if (params.dynamic) {
    router.push({
      path: "/generate/page/" + params.url
    });
  } else if (params.static) {
    router.push({
      path: "/" + params.url
    });
  }
};
