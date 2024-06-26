# 常用布局

## grid布局

> [!NOTE]
> [参考](https://www.bilibili.com/video/BV1nQ4y1V77U/?spm_id_from=333.999.0.0&vd_source=386916773b6f7371457f378bd0577b35)。
> grid实现元素自动居中，这个布局两侧自动设置宽度，中间设置一个最大宽度，小于这个宽度就会自适应。

<script setup>
import LayoutGrid from '@/components/frontend/css-demo/layout/layout-grid.vue';
import AutoHeight from '@/components/frontend/css-demo/layout/auto-height.vue';
</script>

<layout-grid />


::: details 代码
```vue
<template>
  <div class="layout-grid">
    <div class="aside-demo">
      grid-column: content;
    </div>

    <div class="aside-demo full-width">
      grid-column: full-width;
    </div>

    <div class="aside-demo custom-width">
      grid-column: content-start / full-width-end;
    </div>
  </div>
</template>

<style scoped lang="less">
  .layout-grid {
    display: grid;
    border: 2px solid green;

    /*通过设置网格开始线和结束线来定位元素，打开调试工具可以查看网格线*/
    /*这里为了方便演示，把minmax调到30px，正常设置12px就好*/
    grid-template-columns:
    [full-width-start] minmax(30px, 1fr) [content-start] minmax(100% - 60px, 1200px) [content-end] minmax(
        30px,
        1fr
    )
    [full-width-end];

    /*默认居中*/
    & > * {
      grid-column: content;
    }

    .aside-demo {
      width: 100%;
      height: 30px;
      border: 2px solid #ccc;
      text-align: center;
      margin: 10px 0;
    }

    /*全屏*/
    .full-width {
      grid-column: full-width;
    }

    /*设置起始位置和结束位置实现布局*/
    .custom-width {
      grid-column: content-start / full-width-end;
    }
  }
</style>
```
:::

纵向布局，`grid-template-rows: auto 1fr;`一个区域有固定高度，另一个用`1fr`自动填充

<auto-height />

::: details 代码
```vue
<template>
  <div class="column-grid">
    <div class="header">这是头部</div>
    <div class="main">高度100%</div>
  </div>
</template>

<style scoped lang="less">
  .column-grid {
    display: grid;
    grid-template-rows: auto 1fr;
    width: 300px;
    height: 200px;
    border: 1px solid red;
    resize: both;
    overflow: auto;

    .header {
      height: 44px;
      background-color: #38bdf8;
    }
    .main {
      height: 100%;
      background-color: #00b42a;
    }
  }
</style>
```
:::
