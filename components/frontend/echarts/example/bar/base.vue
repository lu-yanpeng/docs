<script setup>
import { shallowRef } from 'vue'
import { useEcharts } from '../../../../../hooks/useEcharts'


const containerRef = shallowRef(null)
const options = shallowRef({
  legend: {},
  tooltip: {},
  grid: {
    top: '20%',
    bottom: '20%'
  }
})
const { myChart } = useEcharts(containerRef, options)
// 暴露chart实例给外部，然后调用myChart.setOption就可以渲染出图表了
defineExpose({ myChart })
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