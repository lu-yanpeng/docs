<script setup lang="ts">
import { shallowRef, watchPostEffect } from 'vue'
import { useEcharts } from '../../__hooks/useEcharts'

const emits = defineEmits<{
  ok: []
}>()

const containerRef = shallowRef(null)
const options = shallowRef({
  legend: {},
  tooltip: {},
  grid: {
    top: '20%',
    bottom: '20%'
  }
})

const { echartsInstance } = useEcharts(containerRef, options)

const stop = watchPostEffect(() => {
  if (echartsInstance.value) {
    emits('ok')
    stop()
  }
})

// 暴露chart实例给外部，然后调用 echartsInstance.setOption 就可以渲染出图表了
defineExpose({ echartsInstance })
</script>

<template>
  <div class="container" ref="containerRef"></div>
</template>

<style scoped lang="less">
.container {
  height: 150px;
  border: 2px solid;
}
</style>