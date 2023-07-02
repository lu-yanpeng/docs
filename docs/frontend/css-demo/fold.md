# 展开动画

内容区高度自适应，显示的时候要带有动画效果。[参考](https://zhuanlan.zhihu.com/p/603637422)

因为高度auto是不支持过渡效果的，必须要有一个准确的高度，一种做法是设置`max-height`但是这样如果max-height很大的话，效果会有延迟。
设置`grid-template-rows: 0fr;`这样可以高度自适应，同时也支持过渡效果。

<script setup>
import Fold from '../../../components/frontend/css-demo/fold/Fold.vue';
import Fold2 from '../../../components/frontend/css-demo/fold/fold2.vue';
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

下面这个示例宽高都有展开动画，并且宽度会随着容器改变。通过设置`grid-template: 0fr/0fr`点击的时候设置成`1fr`就可以实现宽高的过渡了。
内容宽度通过`ResizeObserver`动态跟随容器来设置。

<ClientOnly>
    <Fold2 />
</ClientOnly>


::: details 代码
```vue
<script setup>
import { shallowRef, nextTick } from 'vue'


const fold = shallowRef(false)

const contentWidth = shallowRef('0')
// 设置内容宽度跟随容器改变
nextTick(() => {
  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      contentWidth.value = entry.contentRect.width + 'px'
    }
  })
  observer.observe(document.querySelector('main.main'))
})
</script>

<template>
  <div class="main__container">
    <button class="fold-btn" @click="fold = !fold">展开</button>

    <div class="main__grid" :class="{fold}">
      <div class="main__grid-item">
        <div class="main__grid-content">
          <p v-for="i in 10">{{ i }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.fold-btn {
  width: min-content;
  white-space: nowrap;
}
div.fold {
  grid-template: 1fr / 1fr;
}
.main__container {
  border: 2px solid pink;
  width: fit-content;
}
.main__grid {
  display: grid;
  grid-template: 0fr / 0fr;
  transition: all .5s;
}
.main__grid-item {
  min-width: 0;
  min-height: 0;
  overflow: hidden;
}
.main__grid-content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  /*这里的宽度跟外层的main标签保持一致，也就是文章的宽度*/
  width: v-bind('contentWidth');
}
</style>
```
:::
