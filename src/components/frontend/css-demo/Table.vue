<template>
    <div class="container">
        <input class="btn1" type="radio" id="a" name="btn" checked>
        <input class="btn2" type="radio" id="b" name="btn">

        <div class="nav">
            <label for="a">按钮1</label>
            <label for="b">按钮2</label>
        </div>

        <div class="content">
            <div class="item1">内容1</div>
            <div class="item2">内容2</div>
        </div>
    </div>
</template>


<style scoped lang="less">
.container {
  border: 1px solid #10b981;
  width: max-content;

  .btn1, .btn2 {
    display: none;
  }
  .content > div {
    display: none;
  }

  //  点击按钮的时候显示按钮对应的内容
  .btn1:checked ~ .content .item1 {
    display: block;
  }
  .btn2:checked ~ .content .item2 {
    display: block;
  }

  //  选中的时候给当前导航添加背景
  .btn1:checked ~ .nav label[for="a"] {
    background: gray;
  }
  .btn2:checked ~ .nav label[for="b"] {
    background: gray;
  }
}
</style>