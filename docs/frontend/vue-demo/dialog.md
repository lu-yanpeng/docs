# 对话框

通过html原生`<dialog>`标签封装的对话框组件。[参考](https://blog.webdevsimplified.com/2023-04/html-dialog/)


dialog有最顶层的渲染能力(top-layer)，其他元素即使设置了`z-index`也不能在dialog上显示。比如全局的Message消息
它也只能在dialog下面渲染，很多第三方组件有挂载到指定元素的功能，这时候最好把他挂载到dialog上，比如日期选择器。


<script setup>
import { ref } from 'vue';
import MyDialog from '../../../components/frontend/vue-demo/dialog.vue';
const show = ref(false);
</script>

<MyDialog v-model="show" />

<div><button @click="show = true" style="color: red;">点击打开对话框</button></div>

::: details 代码
```vue
<script setup>
import {ref, watch} from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const dialog = ref(null)
watch(() => props.modelValue, (value) => {
  if (value) {
    return dialog.value.showModal()
  }
  dialog.value.close()
})

const closeDialog = () => {
  dialog.value.close()
  emit('update:modelValue', false)
}
// 点击对话框外面的区域，关闭对话框
const onClick = (e) => {
  const dialogDimensions = dialog.value.getBoundingClientRect()
  if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
  ) {
    closeDialog()
  }
}
</script>

<template>
  <dialog ref="dialog" class="my-dialog" @click="onClick" @cancel="closeDialog">
    <slot>
      <slot name="title">
        <div class="my-dialog-title">
          <p class="my-dialog-title_text"><slot name="title-text">标题文字</slot></p>
          <div class="my-dialog-close" @click.stop="closeDialog">
            x
          </div>
        </div>
      </slot>

      <slot name="body">
        内容区
      </slot>
    </slot>
  </dialog>
</template>

<style scoped lang="less">
.my-dialog {
  border: 0;
  padding: 20px;
  border-radius: 4px;
  // 如果不设置这个属性，元素超出dialog范围会被隐藏
  overflow: visible;

  .my-dialog-title {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 20px;

    .my-dialog-title_text {
      font-size: 16px;
      font-weight: 600;
    }

    .my-dialog-close:hover {
      cursor: pointer;
      background-color: #f3f3f3;
    }
  }
}
</style>
```
:::
