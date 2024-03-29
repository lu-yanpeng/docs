# ResizeObserver 监听元素改变

使用`ResizeObserver`可以在元素大小改变时执行一些动作

<script setup>
import ResizeObserver from '@/components/frontend/vue-demo/resize-observer.vue'
</script>

<ResizeObserver />

::: details 源码
```vue
<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'

const top = ref(0)
const bottom = ref(0)

onMounted(() => {
  // 组件卸载的时候应该取消监视器
  nextTick(() => {
    const dialog = document.querySelector('div.test')

    // 创建一个监视器，元素大小发生改变时会执行回调函数
    const to = new ResizeObserver((entries) => {
      console.log('元素大小改变时出发')
      // entries是一个数组，遍历后取得想要监听的元素
      for (const el of entries) {
        const target = el.target as Element
        if (target === dialog) {
          // 相对于最近的，有定位属性的父元素的距离
          console.log(target.offsetTop)
          // 相对于视口的距离，可以通过这个属性来判断阅读一篇文章时当前章节是否读完
          const p = target.getBoundingClientRect()
          top.value = p.top
          bottom.value = p.bottom
          console.log(p)
        }
      }
    })

    // 需要监听的元素
    to.observe(dialog as Element)
  })
})
</script>

<template>
  <div class="test">
    <p>点击右下角拖动</p>
    <p>top: {{ top }}</p>
    <p>bottom: {{ bottom }}</p>
  </div>
</template>

<style scoped lang="less">
.test {
  width: 200px;
  height: 200px;
  border: 2px solid green;
  resize: both;
  overflow: auto;
}
</style>
```
:::