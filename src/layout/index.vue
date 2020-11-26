<template>
  <div class="container">
    <navBar />
    <div class="inner-container">
      <Menu />
      <section class="view">
        <tabs />
        <div class="router-container">
          <keep-active :include="excludeRoutes">
            <router-view :key="$route.fullPath" :route="$route.path" />
          </keep-active>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import navBar from "@/components/main/nav-bar";
import Menu from "@/components/main/Menu";
import tabs from "@/components/main/tabs";
export default {
  name: "home",
  components: {
    navBar,
    Menu,
    tabs
  },
  computed: {
    excludeRoutes() {
      return this.$store.state.routeTab.excludeRoutes;
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.inner-container {
  width: 100%;
  height: calc(100vh - 60px);
  display: flex;
  flex-direction: row;
}
.view {
  width: calc(100vw - 220px);
  height: 100%;
  display: flex;
  flex-direction: column;
}
.router-container {
  background: rgba(248, 250, 255, 1);
  flex: 1;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #f8faff;
}
</style>
