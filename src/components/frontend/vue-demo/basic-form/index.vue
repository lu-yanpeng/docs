<script setup lang="ts">
import { ref, computed, useTemplateRef } from 'vue'
import MyForm from './my-form.vue'
import type { FormData } from './types'

const showForm = ref(false)
const btnText = computed(() => {
  return showForm.value ? '隐藏' : '显示'
})

const _data = ref({
  username: '测试用户',
  password: '123',
})
const getData = async () => {
  await new Promise(resolve => {
    setTimeout(() => {
      resolve(true)
    }, 1000)
  })
  return _data.value
}

const switchForm = async () => {
  if (!showForm.value) {
    await openForm()
  } else {
    closeForm()
  }
}
const openForm = async () => {
  if (!myFormRef.value) { return }
  const data = await getData()
  // 从外部获取数据并赋值给表单
  await myFormRef.value.setValues(data)
  showForm.value = true
}
const closeForm = () => {
  showForm.value = false
}

const myFormRef = useTemplateRef<InstanceType<typeof MyForm> | null>('myFormRef')
const onSubmit = async () => {
  if (!myFormRef.value) { return }
  const data = await myFormRef.value.submit<FormData>()
  alert(`表单数据：${JSON.stringify(data)}`)
}
</script>

<template>
  <div>
    <div style="border: 1px solid green">
      <p>在这里为表单输入默认值</p>
      <div>
        <span>username: </span>
        <input v-model="_data.username" />
      </div>
      <div>
        <span>password: </span>
        <input v-model="_data.password" />
      </div>
    </div>

    <br />

    <div style="border: 1px solid red;">
      <button @click="switchForm">{{ btnText }}表单</button>

      <div v-show="showForm">
        <my-form ref="myFormRef"/>
        <button @click="onSubmit">提交</button>
      </div>
    </div>
  </div>
</template>
