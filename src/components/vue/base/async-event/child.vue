<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  submit: [resolve: (value: boolean | PromiseLike<boolean | null> | null) => void]
}>()

const result = ref<boolean | null>(null)
const onClick = async () => {
  // 等待这个promise完成
  result.value = await new Promise((resolve) => {
    emits('submit', resolve)
  })
  // 父组件调用resolve之后才会继续执行后续的代码
  console.log('执行完毕')
}
</script>

<template>
  <div class="child">
    <p>这里显示结果 <span>{{ result }}</span></p>
    <div class="btn" @click="onClick">点击发起事件</div>
  </div>
</template>

<style scoped lang="less">
.child {
  border: 1px solid darkgreen;
  display: grid;
  justify-items: center;

  span {
    color: red;
  }

  .btn {
    width: fit-content;
    border: 1px solid;
    padding: 10px;
  }
}
</style>