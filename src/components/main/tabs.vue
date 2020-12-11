<template>
  <div class="c-tabs">
    <ml-tabs
      class="my-tabs"
      type="border-card"
      v-model="activeRoute"
      @tab-remove="removeTab"
    >
      <template v-for="item in tabRoute">
        <ml-tab-pane
          :key="item.fullPath"
          closable
          :name="item.fullPath"
          :label="tabLabel(item)"
        />
      </template>
    </ml-tabs>
  </div>
</template>
<script>
import path from "path";
export default {
  name: "tabs",
  watch: {
    $route() {
      this.$store.dispatch("routeTab/addTabRoute", this.$route);
    }
  },
  computed: {
    routes() {
      return this.$store.getters.routes;
    },
    tabRoute() {
      return this.$store.state.routeTab.visitedRoutes;
    },
    _tabRoutes() {
      return this.$store.state.routeTab.tabRoutes;
    },
    activeRoute: {
      get: function() {
        return this.$store.state.routeTab.activeRoute.fullPath;
      },
      set: function(tabName) {
        this.$store
          .dispatch("routeTab/setActiveRoute", tabName)
          .then(route => {
            this.$router.push(route);
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  },
  methods: {
    removeTab(tabName) {
      this.$store
        .dispatch("routeTab/deleteRoute", tabName)
        .then(() => {
          this.initTab();
        })
        .catch(err => {
          console.log(err);
        });
    },

    initTab() {
      let affixRoutes = this.filterAffixRoutes(this.routes);
      if (affixRoutes.length > 0) {
        this.$store.dispatch("routeTab/initTabRoutes", affixRoutes);
      }
    },
    filterAffixRoutes(routes, basePath = "/") {
      let tabs = [];
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path);
          tabs.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta },
            query: { ...route.query },
            params: { ...route.params }
          });
        }
        if (route.children) {
          const tempTabs = this.filterAffixRoutes(route.children, route.path);
          if (tempTabs.length >= 1) {
            tabs = [...tabs, ...tempTabs];
          }
        }
      });
      return tabs;
    },
    tabLabel(item) {
      if (
        this._tabRoutes[item.fullPath] &&
        this._tabRoutes[item.fullPath]._params
      ) {
        return (
          this._tabRoutes[item.fullPath]._params.title ||
          item.meta.title ||
          item.name
        );
      } else {
        return item.meta.title || item.name;
      }
    }
  },
  mounted() {
    this.initTab();
  }
};
</script>
<style lang="scss">
.c-tabs {
  width: 100%;
  height: 52px;
  .el-tabs--border-card {
    background: linear-gradient(to right, #0150c3, #348cf8);
    .el-tabs__header {
      background-color: transparent;
      border-bottom: 0;
      padding: 9px 0;
      box-sizing: border-box;
      .el-tabs__nav-wrap.is-scrollable {
        padding: 0 52px;
      }
      .el-tabs__nav-prev {
        width: 52px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-image: url("~@/assets/icon/icon_left1_16_nor@2x.png");
        background-size: 17px 17px;
        background-position: center center;
        background-repeat: no-repeat;
        &:hover {
          background-image: url("~@/assets/icon/icon_left1_16_pre@2x.png");
        }
      }
      .el-tabs__nav-next {
        width: 52px;
        height: 100%;
        display: flex;
        flex-direction: column;
        background-image: url("~@/assets/icon/icon_right1_16_nor@2x.png");
        background-size: 17px 17px;
        background-position: center center;
        background-repeat: no-repeat;
        &:hover {
          background-image: url("~@/assets/icon/icon_right1_16_pre@2x.png");
        }
      }
      .el-tabs__item {
        height: 34px;
        line-height: 34px;
        color: #ffffff;
        font-size: 12px;
        padding: 0 8px !important;
        border-left: 1px solid #0047af;
        border-right: 0;
        background-color: transparent;
        &:hover {
          color: #ffffff !important;
        }
        .el-tabs__item__inner {
          padding: 0 12px;
          border-radius: 4px;
        }
      }
      .el-tabs__item.is-active {
        color: #ffffff;
        background-color: transparent;
        border-left-color: #0047af;
        &:hover {
          color: #ffffff;
        }
        .el-tabs__item__inner {
          background-color: #0047af;
        }
      }
    }
  }
}
.my-tabs {
  flex-shrink: 0;
  height: 100%;
  border: 0 !important;
  box-shadow: none !important;
  user-select: none;
  & > .el-tabs__content {
    padding: 0 !important;
  }
  & > .el-tabs__header {
    border: 0;
  }
  & .el-tabs__nav-prev,
  & .el-tabs__nav-next {
    width: 20px;
    line-height: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}
</style>
