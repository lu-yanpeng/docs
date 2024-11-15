<script setup lang="ts">
import { ref, toRaw } from 'vue'
import type { FormData } from './types'
import { cloneDeep } from 'lodash-es'

const formData = ref<FormData>({
  username: '',
  password: ''
})

defineExpose({
  submit: async <T>(): Promise<T> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(formData.value as T)
      }, 1000)
    })
  },
  setValues: async (data: FormData) => {
    formData.value = cloneDeep(toRaw(data))
  }
})
</script>

<template>
  <div>
    <form>
      <div>
        <span>用户名：</span>
        <input v-model="formData.username" />
      </div>
      <div>
        <span>密码：</span>
        <input v-model="formData.password" />
      </div>
    </form>
  </div>
</template>
