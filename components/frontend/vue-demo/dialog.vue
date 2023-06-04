<script setup>
import {ref, watchEffect} from 'vue'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['update:modelValue'])

const dialog = ref(null)
watchEffect(() => {
  props.modelValue?
      dialog.value.showModal():
      dialog.value.close()
}, {flush: 'post'})

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
          <!--关闭按钮的图标需要自己导入-->
            x
          </div>
        </div>
      </slot>

      <slot name="body">
        <p>样式可以完全自定义的对话框组件</p>
        <p>按esc键也可以关闭</p>
        <p>在里面提交表单的时候会自动关闭对话框 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/dialog#%E4%BD%BF%E7%94%A8%E8%AF%B4%E6%98%8E">点击这里查看原因</a></p>
        <p>dialog::backdrop 设置遮罩层颜色</p>
      </slot>
    </slot>
  </dialog>
</template>

<style scoped lang="less">
.my-dialog {
  border: 0;
  padding: 20px;
  border-radius: 4px;
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