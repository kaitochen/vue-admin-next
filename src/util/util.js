import axios from "axios";
export const page = params => {
  let { body = {}, ..._params } = params;
  return axios({
    ..._params,
    data: body
  });
};

export const request = params => {
  let { body = {}, ..._params } = params;
  console.log("request", params);
  return axios({
    ..._params,
    data: body
  });
};
