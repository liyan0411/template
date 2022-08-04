<template>
  <div class="container">
    <p>{{text}}</p>
  </div>
</template>
<script>
/**
 * status:  状态编码
 * 目前只有无数据的：默认显示
 * 后续有其他状态图 根据此字段添加逻辑
 */
export default {
  name: "Status",
  props: {
    status: {
      type: String,
      default: function() {
        return "";
      }
    },
    text: {
      type: String,
      default: function() {
        return "暂无数据~~";
      }
    }
  }
};
</script>
