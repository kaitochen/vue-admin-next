<template>
  <div class="menu">
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="menu-list"
        default-active
        background-color="#2c3e50"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <el-submenu
          v-for="(item, index) in routes"
          :index="index.toString()"
          :key="item.path + '_' + index"
        >
          <template slot="title">
            <!-- <i class="el-icon-location" /> -->
            <i :class="'icon_' + item.icon"></i>
            <span style="margin-left: 12px">{{
              item.meta.title || item.name
            }}</span>
          </template>
          <el-menu-item
            v-for="route in item.children"
            :key="route.path"
            :index="resolvePath(item.path, route.path)"
            @click="gotoRoute(item, route)"
            >{{ route.meta.title || route.name }}</el-menu-item
          >
        </el-submenu>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import path from "path";
// import elMenu from "@/el-components/menu/index";
// import elSubmenu from "@/el-components/submenu/index";
// import elMenuItem from "@/el-components/menu-item/index";
export default {
  name: "Menu",
  // components: { elMenu, elSubmenu},
  computed: {
    routes: function() {
      return this.filterHiddenRoute(this.$store.getters.routes);
    }
  },
  methods: {
    resolvePath(basePath, routePath) {
      return path.resolve(basePath, routePath);
    },
    filterHiddenRoute(routes) {
      if (!routes || routes.length <= 0) {
        return [];
      }
      return routes
        .filter(item => {
          return !item.hidden;
        })
        .map(item => {
          return {
            ...item,
            children: this.filterHiddenRoute(item.children)
          };
        });
    },
    gotoRoute(route, _route) {
      this.$router.push({
        path: path.resolve(route.path, _route.path),
        _params: {
          title: _route.meta.title
        }
      });
    }
  }
};
</script>

<style scoped lang="scss">
.menu {
  width: 220px;
  height: calc(100vh - 60px);
  overflow: hidden;
  flex-shrink: 0;
  background-color: rgba(40, 53, 76, 1);
  & .el-scrollbar {
    height: 100%;
  }
}
.menu-list {
  width: 220px;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
  border: 0;
}
.menu-list .icon {
  display: inline-block;
  background: url("../../assets/icon/icon_titleicon_10@2x.png") no-repeat;
  background-size: 100% 100%;
  width: 16px;
  height: 16px;
  line-height: 16px;
}
.menu-list .el-menu-item {
  background-color: rgba(28, 39, 56, 1) !important;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 20px;
}
.menu-list .is-active {
  position: relative;
  color: rgba(229, 229, 229, 1) !important;
  background: linear-gradient(
    90deg,
    rgba(1, 80, 195, 1) 0%,
    rgba(53, 142, 249, 0) 100%
  ) !important;
}
.menu-list .is-active::after {
  position: absolute;
  content: "";
  width: 6px;
  height: 100%;
  left: 0;
  background: rgba(45, 133, 241, 1);
}
</style>
<style lang="scss">
.scrollbar-wrapper {
  overflow-x: hidden !important;
}
</style>
