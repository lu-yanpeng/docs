# css实现table

纯CSS实现table，[参考](https://www.bilibili.com/video/BV1uK411c7VW/)；这样做起来比较麻烦，用vue实现会简单很多。

<script setup>
import Table from '../../../components/frontend/css-demo/Table.vue'
</script>

<Table />

## 说明

::: tip
按钮需要和内容一一对应，也就是点击按钮的时候需要通过选择器显示正确的内容
:::

**思路**

初始的时候把所有内容都隐藏，点击按钮的时候，通过`:checked`选中点击的按钮，设置对应的内容区显示就行了。

**结构**

```html
<div class="container">
    <!--    按钮-->

    <div class="nav">
        <!--    lable标签-->
    </div>

    <div class="content">
        <!--    内容区-->
    </div>
</div>
```

按钮不要包裹在div下，应该和内容区平级，不然选不中内容。

label标签通过`for`属性和按钮关联，这样点击label的时候就可以直接选中对应的按钮。

内容初始全部设置`display: none;`。

**关键代码**

点击按钮的时候通过:checked伪类选中这个**按钮对应**的内容显示，这里`btn1`对应的内容就是`item1`。

```css
.btn1:checked ~ .content .item1 {
    display: block;
}
```

点击按钮的时候把标题设置一个背景

```css
.btn1:checked ~ .nav label[for="a"] {
    background: gray;
  }
```

::: details 完整代码
```html
<style>
    .container {
        border: 1px solid green;
        max-width: fit-content;
    }
    .btn1, .btn2 {
        display: none;
    }
    .content > div {
        display: none;
    }


    .btn1:checked ~ .content .item1 {
        display: block;
    }
    .btn2:checked ~ .content .item2 {
        display: block;
    }

    .btn1:checked ~ .nav label[for="a"] {
        background: gray;
    }
    .btn2:checked ~ .nav label[for="b"] {
        background: gray;
    }
</style>

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
```
:::