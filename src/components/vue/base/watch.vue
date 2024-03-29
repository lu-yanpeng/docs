<script setup>
import { ref, watchEffect } from 'vue'

const count1 = ref(0)
const count2 = ref(0)

watchEffect(() => {
  console.log('监听')
  if (count1.value % 2 === 1) {
    console.log('c1', count1.value)
    return
  }
  if (count2.value % 2 === 0) {
    console.log('c2', count2.value)
  }
})
</script>

<template>
  <div>
    <p>打开控制台，点击下面数字观察控制台输出</p>
    <p @click="count1+=1">c1 奇数：{{ count1 }}</p>
    <p @click="count2+=1">c2 偶数：{{ count2 }}</p>
  </div>
</template>