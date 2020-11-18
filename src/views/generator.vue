<template>
  <div>
    <generate-view
      :data.sync="pageData"
      :dragData="pageConfig"
      @search="search"
    ></generate-view>
    <template v-for="(item, index) in dialogArr">
      <el-dialog
        :key="index"
        :title="item.title"
        :visible.sync="item.visible"
        width="1000px"
        :destroy-on-close="true"
        :close-on-click-modal="false"
        class="page-dialog"
      >
        <generator
          :routeName="item.url"
          :query="item.query"
          type="dialog"
        ></generator>
      </el-dialog>
    </template>
  </div>
</template>
<script>
import { getPageInfo } from "@/api/role";
import GenerateView from "admin-page-generator/components/GenerateView";
import { configToData } from "admin-page-generator/util/transform";
import generator from "@/views/Generator/generator";
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
    }
  },
  data() {
    return {
      pageConfig: {
        columns: []
      },
      pageContext: null,
      pageData: {},
      routeContext: {},
      pageSize: 10,
      pageIndex: 1,
      pageTotal: 0,
      pageType: "",
      dialogArr: []
    };
  },
  computed: {
    userRole() {
      return this.$store.state.permission.role;
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
      }
    };
  },
  methods: {
    getConfig(type) {
      getPageInfo(type).then(res => {
        if (res.code === 200) {
          console.log(res);
          const { content } = res.data;
          const { page, config } = JSON.parse(content);
          this.pageConfig.columns = page;
          this.pageContext = config.context;
          this.pageData = configToData(page[0]);
          this.pageType = page[0].type;
          if (this.pageContext) {
            this.search();
          }
        }
      });
    },
    getData(index, size) {
      const _request = protocolConverter(
        protocolMatchData(
          this.pageContext,
          [this.pageData, this.routeContext],
          ""
        )
      );
      let params = {
        url: _request.data.url,
        method: _request.data.method
      };
      if (_request.data.method === "GET") {
        params.params = _request.data.body;
        if (this.pageType === "list") {
          params.params["pageSize"] = size;
          params.params["pageIndex"] = index;
        }
      } else {
        params.data = _request.data.body;
      }
      request(params)
        .then(res => {
          if (res.code === 200) {
            if (this.pageType === "list") {
              this.pageData.table = res.data.list;
              this.pageIndex = res.data.pageIndex;
              this.pageSize = res.data.pageSize;
              this.pageTotal = res.data.total;
            } else if (this.pageType === "form") {
              this.pageData = res.data;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    search(index = this.pageIndex, size = this.pageSize) {
      this.pageIndex = index;
      this.pageSize = size;
      this.getData(index, size);
    },
    insertDialog(config) {
      console.log(config);
      this.dialogArr.push({
        ...config,
        query: config.body ? stringToJson(config.body) : {},
        visible: true
      });
    }
  },
  mounted() {
    console.log(this.type);
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
