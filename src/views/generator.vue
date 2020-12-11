<template>
  <div>
    <generate-view
      :data.sync="pageData"
      :dragData="pageConfig"
      @search="search"
    ></generate-view>
    <template v-for="item in dialogArr">
      <el-dialog
        :key="item.key"
        :title="item.title"
        :visible.sync="item.visible"
        width="1000px"
        :destroy-on-close="false"
        :close-on-click-modal="false"
        class="page-dialog"
      >
        <generator
          v-if="item.visible"
          :mdKey="item.key"
          :routeName="item.url"
          :query="item.query"
          type="dialog"
        ></generator>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import md5 from "md5";
import { getPageInfo } from "@/api/role";
import GenerateView from "admin-page-generator/components/GenerateView";
import { configToData, dataToJson } from "admin-page-generator/util/transform";
import generator from "@/views/generator";
import {
  protocolMatchData,
  protocolConverter
} from "admin-page-generator/util/converter";
import { stringToJson } from "@/util/operation";
import request from "@/util/request";
export default {
  name: "generator",
  components: {
    GenerateView,
    generator
  },
  props: {
    type: {
      type: String,
      default: "page"
    },
    routeName: {
      type: String,
      default: ""
    },
    query: {
      type: Object,
      default: () => {}
    },
    mdKey: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      pageConfig: {
        columns: []
      },
      pageContextUrl: null,
      pageData: {},
      routeContext: {},
      pageSize: 10,
      pageIndex: 1,
      pageTotal: 0,
      pageType: "",
      dialogArr: [],
      pageContext: {}
    };
  },
  computed: {
    userRole() {
      return this.$store.state.permission.role;
    },
    dialogMd5() {
      return this.dialogArr.map(item => item.key);
    }
  },
  provide() {
    return {
      getData: (index = this.pageIndex, size = this.pageSize) => {
        this.search(index, size);
        return false;
      },
      pageSize: () => {
        return this.pageSize;
      },
      pageIndex: () => {
        return this.pageIndex;
      },
      pageTotal: () => {
        return this.pageTotal;
      },
      insertDialog: config => {
        this.insertDialog(config);
        return false;
      },
      closeDialog: key => {
        this._closeDialog(key);
        return false;
      },
      dialogKey: () => {
        return this.mdKey;
      },
      refresh: () => {
        this._refresh();
        return false;
      },
      pageContext: () => {
        return this.pageContext;
      },
      setPageContext: obj => {
        this._setPageContext(obj);
        return false;
      },
      routeContext: () => {
        return this.routeContext;
      },
      globalRole: () => {
        return this.userRole;
      }
    };
  },
  methods: {
    getConfig(type) {
      getPageInfo(type).then(res => {
        if (res.code === 200) {
          try {
            const { content } = res.data;
            const { page, config } = JSON.parse(content);
            this.pageConfig.columns = page;
            this.pageContextUrl = config.context;
            this.pageData = configToData(page[0]);
            this.pageType = page[0].type;
            if (this.pageContextUrl && this.pageContextUrl.length > 0) {
              this.search();
            }
          } catch (e) {
            console.error(e);
          }
        }
      });
    },
    _refresh() {
      let _this;
      if (this.type === "dialog" && this.pageType === "form") {
        _this = this.$parent.$parent;
      } else {
        _this = this;
      }
      _this.search();
    },
    getData(index, size) {
      console.log(this.pageContextUrl);
      for (let i = 0; i < this.pageContextUrl.length; i++) {
        const pageContextUrl = this.pageContextUrl[i];
        const _request = protocolConverter(
          protocolMatchData(
            pageContextUrl,
            [this.pageData, this.routeContext],
            ""
          )
        );
        console.log(_request);
        let params = {
          url: _request.data.url,
          method: _request.data.method
        };
        if (_request.data.method === "GET") {
          params.params = _request.data.body;
          const _urlArr = params.url.split("?");
          if (_urlArr.length === 2) {
            const query = _urlArr[1];
            params.url = _urlArr[0];
            params.params = [query, params.params].join("&");
          }
          if (this.pageType === "list") {
            params.params = [
              params.params,
              `pageSize=${size}&pageIndex=${index}`
            ].join("&");
            // params.params["pageSize"] = size;
            // params.params["pageIndex"] = index;
          }
          params.url += "?" + params.params;
          delete params.params;
        } else {
          params.data = _request.data.body;
          params.headers = {
            "content-type": "application/x-www-form-urlencoded"
          };
        }
        request(params)
          .then(res => {
            if (res.code === 200) {
              let _context = _request.data.context;
              let __params = {};
              if (_context) {
                let _p = _context.split("&");
                if (_p.length > 0) {
                  _p.forEach(item => {
                    let key = item.split("=")[0];
                    let value = item.split("=")[1];
                    let _value = value.split(".");
                    value = res;
                    _value.forEach(v => {
                      value = value[v];
                    });
                    __params[key] = value;
                  });
                }
              }
              if (this.pageType === "list") {
                this.pageData = Object.assign(this.pageData, __params);
                if (__params.pageIndex) {
                  this.pageIndex = __params.pageIndex;
                }
                if (__params.pageSize) {
                  this.pageSize = __params.pageSize;
                }
                if (__params.total) {
                  this.pageTotal = __params.total;
                }
                // this.pageData.table = res.data.list;
                // this.pageIndex = res.data.pageIndex;
                // this.pageSize = res.data.pageSize;
                // this.pageTotal = res.data.total;
              } else if (this.pageType === "form") {
                this.pageData = Object.assign(
                  this.pageData,
                  __params,
                  dataToJson(res.data)
                );
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    search(index = this.pageIndex, size = this.pageSize) {
      this.pageIndex = index;
      this.pageSize = size;
      this.getData(index, size);
    },
    insertDialog(config) {
      const fullPath = config.url + "?" + config.body;
      const _md5 = md5(fullPath);
      const index = this.dialogMd5.indexOf(_md5);
      if (index >= 0) {
        this.dialogArr[index].visible = true;
      } else {
        this.dialogArr.push({
          ...config,
          query: config.body ? stringToJson(config.body) : {},
          visible: true,
          key: _md5
        });
      }
    },
    _closeDialog(key) {
      let _this = this.$parent.$parent;
      const index = _this.dialogMd5.indexOf(key);
      if (index >= 0) {
        _this.dialogArr[index].visible = false;
      }
    },
    _setPageContext(obj) {
      this.pageContext = Object.assign(this.pageContext, obj);
    }
  },
  activated() {
    const len = this.pageConfig.columns.length;
    if (
      this.type === "page" &&
      len > 0 &&
      this.pageConfig.columns[0].type === "list"
    ) {
      console.log("activated search");
      this.search();
    }
  },
  mounted() {
    if (this.type === "dialog") {
      const routeName = this.routeName;
      const query = this.query;
      this.getConfig(routeName);
      this.routeContext = query;
    } else {
      const { routeName } = this.$route.params;
      const { query } = this.$route;
      this.getConfig(routeName);
      this.routeContext = query;
    }
  }
};
</script>
<style lang="scss">
.page-dialog {
  .el-dialog__body {
    padding: 0 12px 20px;
  }
}
</style>
