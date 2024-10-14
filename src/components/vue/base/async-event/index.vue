<script setup lang="ts">
import ChildComps from './child.vue'

const onSubmit = (resolve: (v: boolean) => boolean) => {
  const text = confirm('关闭后子组件会得到这次弹窗的结果')
  resolve(text)
}
</script>

<template>
  <div>
    <p>父组件调用confirm触发弹窗，处理完之后调用resolve传递结果</p>
    <child-comps @submit="onSubmit" />
  </div>
</template>
