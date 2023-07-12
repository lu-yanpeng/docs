<script setup>
import { shallowRef, onMounted } from 'vue'
import BarBase from './base.vue'


const container = shallowRef(null)
onMounted(() => {
  const { myChart } = container.value
  myChart.setOption({
    xAxis: {type: 'category'},
    yAxis: {},
    dataset: {
      source: [
        ['科目', '张三', '李四', '王五'],
        ['语文', 100, 80, 72],
        ['数学', 92, 60, 62],
        ['英语', 77, 92, 88],
      ]
    },
    series: [
      {type: 'bar'},
      {type: 'bar'},
      {type: 'bar'},
    ]
  })
})
</script>

<template>
  <bar-base ref="container" />
</template>
