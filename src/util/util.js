import request from "@/util/request";
import { stringToJson } from "./operation";
export const _page = params => {
  let { body = {}, ..._params } = params;
  return request({
    ..._params,
    data: body
  });
};

export const _request = (_this, params, cb) => {
  if (params.alert) {
    return _this
      .$confirm(params.alert, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      .then(() => {
        let { body = {}, ..._params } = params;
        request({
          ..._params,
          data: body
        }).then(res => {
          if (res.code === 200) {
            console.log();
            cb && cb(res);
            if (params.refresh) {
              _this.refresh();
            }
            if (params.success) {
              _this.$message.success(params.success);
            }
          } else {
            if (params.fail) {
              _this.$message.error(params.fail);
            }
          }
        });
      })
      .catch(() => {
        _this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  } else {
    // let { body = {}, ..._params } = params;
    return Promise.resolve();
    // return request({
    //   ..._params,
    //   data: body
    // }).then(res => {
    //   if (res.code === 200) {
    //     cb && cb(res);
    //     if (params.close) {
    //       _this.closeDialog(_this.dialogKey());
    //     }
    //     if (params.refresh) {
    //       _this.refresh();
    //     }
    //     if (params.success) {
    //       _this.$message.success(params.success);
    //     }
    //     if (params.back) {
    //       _this.$router.go(-1);
    //     }
    //   } else {
    //     if (params.fail) {
    //       _this.$message.error(params.fail);
    //     }
    //   }
    // });
  }
};

export const _route = (_this, params) => {
  if (params.dialog) {
    _this.insertDialog(params);
  } else {
    if (params.dynamic) {
      _this.$router.push({
        path: "/generate/page/" + params.url,
        query: params.body ? stringToJson(params.body) : {},
        _params: {
          title: params.title || ""
        }
      });
    } else if (params.static) {
      _this.$router.push({
        path: "/" + params.url
      });
    }
  }
};
