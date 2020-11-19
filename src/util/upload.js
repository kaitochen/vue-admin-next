import OSS from "ali-oss";
import { getUuid, getAliUploadSts } from "@/api/upload";

export const aliUpload = file => {
  return new Promise((resolve, reject) => {
    getUuid().then(res => {
      if (res.code === 200) {
        const uuid = res.data;
        getAliUploadSts().then(res => {
          if (res.code === 200) {
            const name = res.data.prefix + "/" + uuid + "/" + file.name;
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
      }
    });
  });
};
