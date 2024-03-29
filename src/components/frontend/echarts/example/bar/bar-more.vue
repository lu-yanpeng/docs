<script setup lang="ts">
import { shallowRef } from 'vue'
import BarBase from './base.vue'


const barBaseRef = shallowRef<InstanceType<typeof BarBase> | null>(null)

const onOk = () => {
  if (barBaseRef.value) {
    barBaseRef.value.echartsInstance.setOption({
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
  }
}
</script>

<template>
  <bar-base ref="barBaseRef" @ok="onOk" />
</template>
