import OSS from "ali-oss";
import { getAliUploadSts, serverUpload } from "@/api/upload";

export const _aliUpload = file => {
  return new Promise((resolve, reject) => {
    getAliUploadSts().then(res => {
      if (res.code === 200) {
        const name = res.data.prefix + "/" + file.name;
        const client = new OSS({
          accessKeyId: res.data.sts.accessKeyId,
          accessKeySecret: res.data.sts.accessKeySecret,
          stsToken: res.data.sts.securityToken,
          region: "oss-cn-hangzhou",
          bucket: res.data.bucket
        });
        client
          .put(name, file)
          .then(response => {
            resolve({ ...response });
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  });
};
export const _serverUpload = file => {
  const formData = new FormData();
  formData.append("file", file);
  return serverUpload(formData).then(res => {
    return res.data;
  });
};
