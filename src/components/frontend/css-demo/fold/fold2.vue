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