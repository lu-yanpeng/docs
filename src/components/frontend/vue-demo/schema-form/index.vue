<script setup lang="ts">
import { ref } from 'vue'
import type { FormOptions } from './types'
import { useForm } from './use-form'

const formProps: FormOptions = {
  schema: [
    {
      component: 'Input',
      label: '用户名',
      fieldName: 'username',
      defaultValue: '测试'
    }
  ]
}

const [MyForm, formApi] = useForm(formProps)
const reset = () => {
  formApi.setState({
    schema: [
      {
        component: 'Input',
        label: '重新渲染',
        fieldName: 'username',
        defaultValue: '11111111111111'
      }
    ]
  })
}
const text = ref('')
const update = () => {
  formApi.setValues({
    username: text.value
  })
}

const getValue = () => {
  const value = formApi.getValues<{
    username: string
  }>()
  console.log('获取到的值', value)
  value.username = '看看是否影响原表单'
}
</script>

<template>
  <div>
    复杂表单
    <a-button @click="reset">重新渲染</a-button>
    <div>
      <a-input v-model:value="text" />
      <a-button @click="update">修改表单值</a-button>
    </div>
    <a-button @click="getValue">获取值</a-button>

    <MyForm />
  </div>
</template>
