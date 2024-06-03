<template>
  <div>
    <div class="column-grid">
      <div class="header">这是头部，固定高度44px</div>
      <div class="main">高度100%</div>
    </div>
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