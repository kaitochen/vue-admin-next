<template>
  <div class="container">
    <div class="form-container">
      <p class="form-title">欢迎登录</p>

      <el-form :model="user" label-width="70px" style="width: 100%">
        <el-form-item label="登录账号" style="width: 100%">
          <el-input
            v-model.trim="user.userName"
            size="small"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="登录密码">
          <el-input
            type="password"
            v-model.trim="user.password"
            size="small"
            prefix-icon="el-icon-lock"
          />
        </el-form-item>
        <el-button
          type="primary"
          style="width: 100%;margin-top: 44px"
          size="small"
          @click="login"
          >登录</el-button
        >
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      user: {
        userName: "",
        password: ""
      },
      local: false
    };
  },
  methods: {
    login() {
      if (this.user.userName === "") {
        this.$message.error("请填写账号！");
        return;
      }
      if (this.user.password === "") {
        this.$message.error("请填写密码！");
        return;
      }
      this.$store
        .dispatch("user/login", {
          username: this.user.userName,
          password: this.user.password
        })
        .then(() => {
          this.$router.push("/");
        })
        .catch(err => {
          this.$message.error(err.msg);
          console.log(err);
        });
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
.container {
  width: 100%;
  min-height: 100vh;
  background-color: #f8faff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url("~@/assets/image/login.png");
  background-size: 50vh 100%;
  background-repeat: no-repeat;
  background-position: right top;
  padding-right: 50vh;
  box-sizing: border-box;
}
.form-container {
  width: 500px;
  background-color: #ffffff;
  padding: 50px 85px;
  box-sizing: border-box;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  box-shadow: 0px 2px 20px 0px #eeeeee;
}
.form-title {
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 60px;
  margin-top: 10px;
}
</style>
