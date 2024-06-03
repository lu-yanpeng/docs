# 滚动条相关

嵌套在盒子里面的滚动条

<script setup>
import AutoScroll from '@/components/frontend/css-demo/scroll/index.vue';
</script>

<auto-scroll />

::: details 代码
```vue
<template>
  <div class="auto-scroll">
    <div class="main">
      <ul>
        <li v-for="i in 20" :key="i">{{ i }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
  .auto-scroll {
    margin-top: 20px;
    width: 300px;
    height: 200px;
    border: 1px solid;
    resize: vertical;
    overflow: auto;
    padding: 20px;

    .main {
      overflow-y: scroll;
      height: 100%;

      ul {
        margin: 0;
      }
    }
  }
</style>
```
:::
