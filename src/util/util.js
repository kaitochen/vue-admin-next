import request from "@/util/request";
import { stringToJson, jsonToFormData } from "./operation";
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
        let { body = {}, method = "get", type = "json", ..._params } = params;
        const requestParam = {
          ..._params,
          method: method
        };
        if (method === "get" || method === "GET") {
          requestParam.params = body;
          const _urlArr = requestParam.url.split("?");
          if (_urlArr.length === 2) {
            const query = _urlArr[1];
            requestParam.url = _urlArr[0];
            requestParam.params = [query, requestParam.params].join("&");
          }
          requestParam.url += "?" + requestParam.params;
          delete requestParam.params;
        } else {
          if (type === "formData") {
            requestParam.data = jsonToFormData(body);
          } else {
            requestParam.data = body;
            requestParam.headers = {
              "content-type": "application/x-www-form-urlencoded"
            };
          }
        }
        if (params.export) {
          requestParam.responseType = "blob";
          try {
            request(requestParam)
              .then(res => {
                if (res.code) {
                  if (res.code === 200) {
                    cb && cb(res);
                    if (params.close) {
                      _this.closeDialog(_this.dialogKey());
                    }
                    if (params.refresh) {
                      _this.refresh();
                    }
                    if (params.success) {
                      _this.$message.success(params.success);
                    }
                    if (params.back) {
                      _this.$router.go(-1);
                    }
                  } else {
                    if (params.fail) {
                      _this.$message.error(params.fail);
                    } else {
                      _this.$message.error(res.msg);
                    }
                  }
                } else {
                  try {
                    let a = document.createElement("a");
                    let blob = new Blob([res]);
                    let objectUrl = URL.createObjectURL(blob);
                    a.setAttribute("href", objectUrl);
                    a.setAttribute(
                      "download",
                      params["export-name"] || "download"
                    );
                    a.click();
                    return;
                  } catch (e) {
                    console.log(e);
                  }
                }
              })
              .catch(() => {});
          } catch (e) {
            console.log(e);
          }
        } else {
          request(requestParam).then(res => {
            if (res.code === 200) {
              cb && cb(res);
              if (params.close) {
                _this.closeDialog(_this.dialogKey());
              }
              if (params.refresh) {
                _this.refresh();
              }
              if (params.success) {
                _this.$message.success(params.success);
              }
              if (params.back) {
                _this.$router.go(-1);
              }
            } else {
              if (params.fail) {
                _this.$message.error(params.fail);
              } else {
                _this.$message.error(res.msg);
              }
            }
          });
        }
      })
      .catch(() => {
        _this.$message({
          type: "info",
          message: "已取消操作"
        });
      });
  } else {
    let { body = {}, method = "get", type = "json", ..._params } = params;
    const requestParam = {
      ..._params,
      method: method
    };
    if (method === "get" || method === "GET") {
      requestParam.params = body;
      const _urlArr = requestParam.url.split("?");
      if (_urlArr.length === 2) {
        const query = _urlArr[1];
        requestParam.url = _urlArr[0];
        requestParam.params = [query, requestParam.params].join("&");
      }
      if (typeof requestParam.params === "string") {
        requestParam.url += "?" + requestParam.params;
      }
      delete requestParam.params;
    } else {
      if (type === "formData") {
        requestParam.data = jsonToFormData(body);
      } else {
        requestParam.data = body;
        requestParam.headers = {
          "content-type": "application/x-www-form-urlencoded"
        };
      }
    }
    // return Promise.resolve();
    if (params.export) {
      requestParam.responseType = "blob";
      return request(requestParam).then(res => {
        if (res.code) {
          if (res.code === 200) {
            cb && cb(res);
            if (params.close) {
              _this.closeDialog(_this.dialogKey());
            }
            if (params.refresh) {
              _this.refresh();
            }
            if (params.success) {
              _this.$message.success(params.success);
            }
            if (params.back) {
              _this.$router.go(-1);
            }
          } else {
            if (params.fail) {
              _this.$message.error(params.fail);
            } else {
              _this.$message.error(res.msg);
            }
          }
        } else {
          try {
            let a = document.createElement("a");
            let blob = new Blob([res]);
            let objectUrl = URL.createObjectURL(blob);
            a.setAttribute("href", objectUrl);
            a.setAttribute("download", params["export-name"] || "download");
            a.click();
            return;
          } catch (e) {
            console.log(e);
          }
        }
      });
    } else {
      return request(requestParam).then(res => {
        if (res.code === 200) {
          cb && cb(res);
          if (params.close) {
            _this.closeDialog(_this.dialogKey());
          }
          if (params.refresh) {
            _this.refresh();
          }
          if (params.success) {
            _this.$message.success(params.success);
          }
          if (params.back) {
            _this.$router.go(-1);
          }
        } else {
          if (params.fail) {
            _this.$message.error(params.fail);
          } else {
            _this.$message.error(res.msg);
          }
        }
      });
    }
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
export const _http = (_this, params) => {
  window.open(params.url, "_target");
};
