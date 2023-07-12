<template>
  <div class="chart-container" ref="chartRef"></div>
</template>

<script setup>
import { ref } from 'vue'
import { useEcharts } from '../hooks/useEcharts'

const chartRef = ref(null)
const option = ref({
  tooltip: {},
  dataset: {
    source: [
      ['语文', 80],
      ['数学', 95]
    ]
  },
  series: [
    {
      type: 'pie',
    }
  ]
})
useEcharts(chartRef, option)
</script>

<style scoped>
.chart-container {
  width: 100%;
  height: 300px;
}
</style>