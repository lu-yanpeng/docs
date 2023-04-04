<template>
    <label class="switch">
        <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        >
        <span class="slider"></span>
    </label>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})
defineEmits(['update:modelValue'])

</script>

<style scoped lang="less">
/* 开关——滑块周围的盒子 */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;
}

/* 隐藏默认HTML复选框 */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* 滑块 */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: space-around;
}

.slider:before {
  position: absolute;
  content: "";
  display: flex;
  height: 1.4em;
  width: 1.4em;
  border-radius: 20px;
  left: 0.3em;
  bottom: 0.3em;
  background-color: white;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  transform: translateX(1.5em);
}
</style>