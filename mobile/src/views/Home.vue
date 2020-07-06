<template>
  <div class="home">
    <router-view />

    <van-tabbar route>
      <van-tabbar-item replace to="/index" icon="home-o">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/lists" icon="search">
        列表
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
// import md5 from "js-md5";
export default {
  name: "Home",
  data() {
    return {
      active: 0
    };
  },
  created() {
    // this.qa.v(this);
    // let req = {
    //   name: "admin01",
    //   password: md5("123456")
    // };
    // this.$api.login.home({
    //   data: req,
    //   success(res) {
    //     console.log(1, res);
    //   }
    // });
  }
};
</script>
<style lang="less">
.container {
  height: 20px;
  background: @theme-color;
}
</style>
