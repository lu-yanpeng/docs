# 按钮组

点击一个按钮会设置高亮样式，取消其他按钮高亮。[参考](https://zh.javascript.info/event-delegation)

<script setup>
import ButtonGroup from '../../../components/frontend/vue-demo/button-group.vue'
</script>

<button-group />


::: details 代码
```vue
<script setup>
import { ref } from 'vue'

// 原生写法
const currentBtn = ref(null)
const onClick = (e) => {
  if (e.target.tagName !== 'BUTTON') return

  if (currentBtn.value) {
    currentBtn.value.classList.toggle('active')
  }
  currentBtn.value = e.target
  // 如果有active这个类就移除，没有就添加
  currentBtn.value.classList.toggle('active')
}


// vue写法
const current = ref('A')
const btnGroup = ['A', 'B', 'C']
</script>

<template>
  <!--  原生写法-->
  <!--  <div @click="onClick">-->
  <!--    <button class="active" ref="currentBtn">A</button>-->
  <!--    <button>B</button>-->
  <!--    <button>C</button>-->
  <!--  </div>-->

  <div>
    <button
        v-for="value in btnGroup"
        :key="value"
        @click="current = value"
        :class="{active: current === value}">
      {{ value }}
    </button>
  </div>
</template>

<style scoped>
button {
  margin-inline: 20px;
  padding-inline: 10px;
}
.active {
  background-color: darkseagreen;
}
</style>
```
:::
