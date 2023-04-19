# 展开动画

内容区高度自适应，显示的时候要带有动画效果。[参考](https://zhuanlan.zhihu.com/p/603637422)

因为高度auto是不支持过渡效果的，必须要有一个准确的高度，一种做法是设置`max-height`但是这样如果max-height很大的话，效果会有延迟。
设置`grid-template-rows: 0fr;`这样可以高度自适应，同时也支持过渡效果。

<script setup>
import Fold from '../../../components/frontend/css-demo/Fold.vue'
</script>

<Fold />

::: details 完整代码
```html
<style>
    .container {
        width: 200px;
        border: 2px solid red;
    }
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
    .grid-item {
        min-height: 0;
        overflow: hidden;
    }
</style>

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
```
:::