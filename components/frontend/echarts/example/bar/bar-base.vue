<script setup>
import { shallowRef, onMounted } from 'vue'
import BarBase from './base.vue'


const container = shallowRef(null)
onMounted(() => {
  // 从组件获取返回的chart实例
  const { myChart } = container.value
  myChart.setOption({
    xAxis: {type: 'category'},
    yAxis: {},
    dataset: {
      source: [
        ['科目', '张三'],
        ['语文', 100],
        ['数学', 80],
        ['英语', 90],
      ]
    },
    series: [
      {type: 'bar'}
    ]
  })
})
</script>

<template>
  <bar-base ref="container" />
</template>