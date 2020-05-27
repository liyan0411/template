<template>
  <div>
    我是首页
    <van-skeleton title avatar :row="3" :loading="loading">
      <div>实际内容</div>
    </van-skeleton>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    let self = this;
    setTimeout(() => {
      self.loading = false;
    }, 2000);
  }
};
</script>
