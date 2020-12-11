<template>
  <div class="container">
    <h4 style="margin-bottom: 20px">本地设置</h4>
    <el-form ref="form" label-width="200px">
      <el-form-item label="是否开启本地调试">
        <el-radio-group v-model="local">
          <el-radio :label="true">是</el-radio>
          <el-radio :label="false">否</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button type="primary" size="small" @click="into">进入</el-button>
  </div>
</template>
<script>
export default {
  name: "Setting",
  data() {
    return {
      local: false
    };
  },
  methods: {
    into() {
      localStorage.setItem("local", this.local);
      setTimeout(() => {
        this.$router.replace("/login");
        window.location.reload();
      }, 500);
    }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
