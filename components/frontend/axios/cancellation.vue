<script setup>
import { useAbortController } from '../../../hooks/abort'


const { ac } = useAbortController()
const onFetch = async () => {
  try {
    console.log('正在发送请求1')
    const response = await fetch('https://myapi-1-a0235410.deta.app/api/test/timeout-error-30s', {
      method: 'get',
      signal: ac.value.signal
    })
    const { data } = await response.json()
    console.log('请求1数据', data)
  } catch (e) {
    console.log('取消请求1', e)
  }
}
const onCancel = () => {
  ac.value.abort()
}



const { ac: ac2 } = useAbortController()

const onFetch2 = async () => {
  try {
    console.log('正在发送请求2')
    const response = await fetch('https://myapi-1-a0235410.deta.app/api/test/timeout-error-30s', {
      method: 'get',
      signal: ac2.value.signal
    })
    const { data } = await response.json()
    console.log('请求2数据', data)
  } catch (e) {
    console.log('取消请求2', e)
  }
}
const onCancel2 = () => {
  ac2.value.abort()
}
</script>

<template>
  <div class="wrap">
    <button @click="onFetch">请求1</button>
    <button @click="onCancel">取消1</button>
    <br>
    <br>

    <button @click="onFetch2">请求2</button>
    <button @click="onCancel2">取消2</button>
  </div>
</template>

<style scoped lang="less">
.wrap {
  border: 2px solid;
  padding: 20px 0;

  button {
    background-color: #10b981;
    margin-inline: 10px;
    padding: 5px 10px;
  }
}
</style>