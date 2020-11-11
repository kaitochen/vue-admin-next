<template>
  <nav class="nav-bar">
    <div class="header">
      <span class="logo"></span>
      <!-- <bread-crumb style="margin-left: 24px"></bread-crumb> -->
      <div class="black-box" @click="$router.push('/')">
        <i class="icon_goback"></i>
        <span class="black">返回工作台</span>
      </div>
    </div>
    <div class="tool">
      <el-dropdown trigger="click">
        <div class="user">
          <p class="userName">{{ userName }}</p>
          <span class="down"></span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <span @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </nav>
</template>
<script>
// import { getUserInfo } from "@/request/user";
export default {
  name: "nav-bar",
  components: {},
  data() {
    return {
      userName: "admin"
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.push("/login");
    },
    getData() {
      // getUserInfo().then(res => {
      //   // console.log(res);
      //   if (res.code === 200) {
      //     console.log(res, "信息");
      //     this.$store.commit("user/SET_USER_INFO", res.data);
      //     this.userName = res.data.nickname;
      //   }
      // });
    }
  },
  created() {
    this.getData();
  }
};
</script>

<style scoped lang="scss">
.nav-bar {
  width: 100%;
  height: 60px;
  background-color: #ffffff;
  min-width: 960px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  box-sizing: border-box;
}
.header {
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
}
.logo {
  // width: 100px;
  width: 300px;
  height: 100%;
  background-image: url("~@/assets/image/logo.png");
  background-size: 180px;
  background-repeat: no-repeat;
  background-position: left center;
}
.tool {
  // max-width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 22px;
}
.head {
  width: 30px;
  height: 30px;
  background-image: url("~@/assets/image/icon_headprotrait.png");
  background-size: 100% 100%;
}
.user {
  color: #20212a;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  margin-left: 40px;
}
.userName {
  margin: 0 8px;
}
.down {
  width: 16px;
  height: 16px;
  background-image: url("~@/assets/image/icon_pulldownmenu_black.png");
  background-size: 100% 100%;
}
.black-box {
  cursor: pointer;
  vertical-align: middle;
}
.icon_goback {
  margin-right: 2px;
  vertical-align: middle;
}
.black {
  width: 70px;
  height: 19px;
  font-size: 14px;
  color: rgba(102, 102, 102, 1);
  line-height: 16px;
}
</style>
