# 定位 position

定位可以用来调整元素的位置，比如让元素固定在页头，或者一个元素定位在父元素的某个位置。在没有`flex`和`grid`之前，经常用定位来实现布局。

相关属性
- z-index
- overflow


## 相对定位 relative

`position: relative;` 元素保留它在文档流中的位置，然后通过定位属性调整位置，它会相对于原本的位置进行调整。

它保留了原来的位置，并且会撑开父元素，但是使用定位属性的时候不会影响到其他元素，也就是定位时候不会推开其他元素。
因为它不会影响到其他元素，所以很多时候会给父元素设置相对定位，让它作为子元素的定位容器。

<div :class="$style.container">
    <div :class="$style.relative">
<pre>
position: relative;
top: -20px;
right: -20px;
</pre>
    </div>
</div>



## 绝对定位 absolute

`position: absolute;` 绝对定位会使元素脱离文档流，然后相对于最近的定位元素进行定位。

绝对定位会相对于最近的定位元素定位（设置了`position`属性的元素），一般在使用的时候会直接给父元素设置`position: relative;`让绝对定位相对于它来定位，
如果父元素没有定位属性，它会相对与`body`标签定位。比如下面这个示例父元素就设置了`relative`相对定位。

因为绝对定位脱离了文档流，所以它不会撑开父元素，用的时候父元素需要单独设置宽高。要注意绝对定位经常会遮挡其他元素，需要合理设置`z-index`。

<div :class="[$style.container, $style.absoluteContainer]">
    position: relative;
    <div :class="$style.absolute">
<pre>
position: absolute;
top: 20px;
right: 20px;
width: 100%;
height: 100%;
</pre>
    </div>
</div>



## 固定定位 fixed


`position: fixed;` 元素脱离文档流，并且相对于视口进行定位，一般会用作页头导航栏。

当元素祖先的 transform、perspective、filter 或 backdrop-filter 属性非 none 时，容器由视口改为该祖先。

<div :class="[$style.container, $style.fixed]">
<pre>
position: fixed;
width: 200px;
height: 60px;
right: 0;
bottom: 0;
z-index: 999;
</pre>
</div>



## 粘性定位 sticky

[待补充](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position)


## 静态定位 static

`position: static;` 元素按文档流定位，默认就是这个定位。



## 定位属性

- top
- bottom
- left
- right

技巧：一般只需要两个属性就能定位一个元素，比如要设置在容器的右下角只需要设置`bottom:0; right:0;`。


<style module>
.container {
    border: 2px solid pink;
    width: min-content;
}
.relative {
    position: relative;
    width: 200px;
    height: 100px;
    top: -20px;
    right: -20px;
    background-color: palegoldenrod;
}

.absoluteContainer {
    position: relative;
    width: 200px;
    height: 100px;
}
.absolute {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 100%;
    height: 100%;
    background-color: palegoldenrod;
}

.fixed {
    position: fixed;
    width: 200px;
    height: 180px;
    right: 0;
    bottom: 0;
    z-index: 999;
}
</style>

