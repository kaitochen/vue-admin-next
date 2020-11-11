<template>
  <div>404</div>
</template>
<script>
export default {
  name: "404",
  mounted() {
    setTimeout(() => {
      this.$router.replace("/login");
    }, 3000);
  }
};
</script>
