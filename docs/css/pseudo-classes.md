# 伪类

全部[伪类](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes)

## :has()

检查参数中的选择器是否存在，某一条参数存在，当前元素就会被选中。可以用它来**选中父元素**

```html
<div class="wrap">
    <p class="txt">一段文字</p>
    <p class="txt2">另一段文字</p>
</div>

<style>
/* txt或txt2 hover的时候，wrap会被选中 */
.wrap:has(.txt:hover, .txt2:hover) {}
</style>
```

