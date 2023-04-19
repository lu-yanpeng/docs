<template>
    <div class="container">
        <div class="item">
            <div class="btn">一个按钮</div>
            <div class="content">
                <div class="grid-item">
                    <p>内容</p>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="btn">一个按钮</div>
            <div class="content">
                <div class="grid-item">
                    <p>内容</p>
                </div>
            </div>
        </div>
        <div class="item">
            <div class="btn">一个按钮</div>
            <div class="content">
                <div class="grid-item">
                    <p>内容</p>
                </div>
            </div>
        </div>
    </div>
</template>


<style scoped lang="less">
.container {
  width: 200px;
  border: 2px solid red;

  .item {
    border: 2px solid palegoldenrod;
  }
  .item:hover .content {
    grid-template-rows: 1fr;
  }
  .content {
    display: grid;
    grid-template-rows: 0fr;
    transition: all 0.5s;
  }
  //  因为一个网格项目最小的高度是min-content，也就是内容的宽高
  //  所以这里要手动设置最小高度为0，让内容隐藏
  //  当grid-template-rows: 1fr的时候他会根据内容自动撑开
  .grid-item {
    min-height: 0;
    overflow: hidden;
  }
}
</style>