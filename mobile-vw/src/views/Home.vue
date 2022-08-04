<template>
  <div class="home">
      <div class="test-viewport">测试转换</div>
      <van-button type="primary">主要按钮</van-button>
  </div>
</template>

<script>
// @ is an alias to /src
// import md5 from "js-md5";
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {}
}
</script>
<style lang="less" scoped>
.test-viewport {
  width: 750px;
  height: 100px;
  font-size: 40px;
  text-align: center;
  line-height: 100px;
  background: #13b5b1;
}
</style>
