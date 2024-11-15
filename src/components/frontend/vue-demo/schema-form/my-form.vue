<script setup lang="ts">
import { onMounted } from 'vue'
import type { FormOptions } from './types'
import { globalState } from './global-state'

defineProps<FormOptions>()
const formData = defineModel<Record<string, any>>()
onMounted(() => {
  console.log('重新渲染')
})
</script>

<template>
  <a-form v-model:model="formData">
    <template v-for="(item, key) in schema" :key="key">
      <a-form-item :label="item.label" :name="item.fieldName">
        <component
            :is="globalState.getComponents(item.component)"
            v-model:value="formData[item.fieldName]"
        />
      </a-form-item>
    </template>
  </a-form>
</template>
