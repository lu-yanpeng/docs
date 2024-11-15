import { defineComponent, unref, ref, shallowRef, toRaw, onMounted } from 'vue'
import type { MaybeRef } from 'vue'
import type { FormOptions } from './types'
import MyForm from './my-form.vue'
import { cloneDeep } from 'lodash-es'

export const useForm = (formOptions: MaybeRef<FormOptions>) => {
  const formKey = ref(false)
  const __formOptions = shallowRef<FormOptions>(unref(formOptions))
  const __formData = ref<Record<string, any>>({})

  // 解构schema
  const initForm = (options: MaybeRef<FormOptions>) => {
    __formOptions.value = unref(options)
    // 获取schema中字段的初始值
    const defaultValues: Record<string, any> = {}
    __formOptions.value.schema.forEach(formItem => {
      defaultValues[formItem.fieldName] = toRaw(formItem?.defaultValue)
    })
    __formData.value = defaultValues
  }
  onMounted(() => {
    initForm(formOptions)
  })

  const Form = defineComponent(() => {
    const update = (data: Record<string, any>) => {
      __formData.value = data
    }
    return () => (
      <>
        <MyForm
          key={formKey.value as boolean}
          {...__formOptions.value}
          modelValue={__formData.value}
          onUpdate:modelValue={update}
        />
      </>
    )
  })

  const formApi = {
    setState: (options: MaybeRef<FormOptions>) => {
      initForm(options)
      // 确保form组件重新渲染
      formKey.value = !formKey.value
    },
    getValues: <T extends Record<string, any>>(): T => {
      return cloneDeep(toRaw(__formData.value)) as T
    },
    setValues: (value: MaybeRef<Record<string, any>>) => {
      __formData.value = cloneDeep(toRaw(unref(value)))
    },
  }

  return [Form, formApi] as const
}
