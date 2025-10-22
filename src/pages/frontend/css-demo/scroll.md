# 滚动条相关

嵌套在盒子里面的滚动条

<script setup>
import AutoScroll from '@/components/frontend/css-demo/scroll/index.vue';
import ScrollOverflow from '@/components/frontend/css-demo/scroll/overflow.vue';
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

<ScrollOverflow />

::: details 代码
```vue
<template>
  <div class="nav-bar _mask-img">
    <div class="scroll-container">
      <ul>
        <li class="" v-for="i in 12" :key="i">--{{ i }}--</li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="less">
  ._container {
    border: 1px solid red;
    
    ._mask-img {
      mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
    }

    .scroll-none {
      scrollbar-width: none;
    }

    .nav-bar {
      overflow-x: auto;
      padding-inline: 30px;

      .scroll-container {
        width: max-content;
        border: 1px solid tan;

        ul {
          display: flex;
        }
      }
    }
  }
</style>
```