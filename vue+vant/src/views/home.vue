<template>
  <div class="container">
    <van-button plain type="primary" @click="colseWin">朴素按钮</van-button>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import {closeWin} from "@/utils/utils"
export default {
  name: 'Home',
  data() {
    return {}
  },
  created() {},
  methods: {
    colseWin() {
      closeWin();
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  font-size: 7.5px;
}
</style>
