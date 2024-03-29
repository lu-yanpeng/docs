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


## :is()

如果参数参数里面的条件，就会被选中。当多个子元素有同一个父类时可以简化代码。

```html
<div class="container">
    <p class="a">123</p>
    <p class="b">123</p>
    <p class="c">123</p>
</div>

<style>
.container :is(.a, .b, .c) {
    color: green;
}
</style>
```

上面的`p`标签都有同一个父类，这样可以用`:is`来简化。正常写的话就是这样

```css
.container .a, .container .b, .container .c {
    color: green;
}
```

