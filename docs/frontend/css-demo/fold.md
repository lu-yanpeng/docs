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
<template>
    <div class="fold">
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

        <div class="wrap">
            <button>hover me</button>

            <div class="pop">
                <div class="grid-item">
                    <!--          要显示的内容放在content里面-->
                    <div class="content">
                        <p>一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本一段长文本</p>
                    </div>
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

       .grid-item {
           min-height: 0;
           overflow: hidden;
       }
    }



    .wrap {
        width: fit-content;
        position: relative;
        margin: 20px auto 100px;

        button:hover ~ .pop, .pop:has(.content:hover) {
            grid-template-rows: 1fr;
        }
    
        button {
            padding-inline: 20px;
            background-color: #10b981;
        }
    
        .pop {
            width: max-content;
            position: absolute;
            z-index: 9999;
            transform: translateX(-50%);
            left: 50%;
    
            display: grid;
            grid-template-rows: 0fr;
            transition: all 0.5s;
        }
    
        .grid-item {
            min-height: 0;
            overflow: hidden;
        }
        div.content {
            width: 200px;
            border: 2px solid pink;
        }
    }
</style>
```
:::