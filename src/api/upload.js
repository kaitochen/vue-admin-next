import Request from "../util/request";
export const getUuid = () => {
  return Request({
    url: "/oss/v1/uuid",
    method: "GET"
  });
};
export const getAliUploadSts = () => {
  return Request({
    url: "/admin/access/v1/sts",
    method: "GET"
  });
};
