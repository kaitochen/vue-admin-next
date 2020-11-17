<template>
  <div>
    <generate-view :data.sync="pageData" :dragData="pageConfig"></generate-view>
  </div>
</template>
<script>
import { getPageInfo } from "@/api/role";
import GenerateView from "admin-page-generator/components/GenerateView";
import { configToData } from "admin-page-generator/util/transform";
export default {
  name: "generator",
  components: {
    GenerateView
  },
  data() {
    return {
      pageConfig: {
        columns: []
      },
      pageContext: null,
      pageData: {},
      routeContext: {}
    };
  },
  computed: {
    userRole() {
      return this.$store.state.permission.role;
    }
  },
  methods: {
    getConfig(type) {
      getPageInfo(type).then(res => {
        if (res.code === 200) {
          const { content } = res.data;
          const { page, config } = JSON.parse(content);
          this.pageConfig.columns = page;
          this.pageContext = config;
          this.pageData = configToData(page[0]);
        }
      });
    }
  },
  mounted() {
    const { type, data = {} } = this.$route.params;
    this.getConfig(type);
    this.routeContext = data;
  }
};
</script>
