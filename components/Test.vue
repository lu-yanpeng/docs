<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useEcharts } from '../hooks/useEcharts'

const chartRef = ref(null)
const option = {
  tooltip: {},
  dataset: {
    source: [
      ['语文', 100],
      ['数学', 90]
    ]
  },
  series: [
    {
      type: 'pie',
    }
  ]
}
useEcharts(chartRef, option)
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>