<template>
  <div class="home">
    <div class="container">1111</div>
    <van-button type="primary">主要按钮</van-button>
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o">标签</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// @ is an alias to /src
import md5 from "js-md5";
export default {
  name: "Home",
  data() {
    return {
      active: 0
    };
  },
  created() {
    this.qa.v(this);
    let req = {
      name: "admin01",
      password: md5("123456")
    };
    this.qa.login.home({
      data: req,
      success(res) {
        console.log(1, res);
      }
    });
  }
};
</script>
<style lang="less">
.container {
  height: 20px;
  background: @theme-color;
}
</style>
