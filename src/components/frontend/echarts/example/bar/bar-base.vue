<script setup lang="ts">
import { shallowRef } from 'vue'
import BarBase from './base.vue'

const barBaseRef = shallowRef<InstanceType<typeof BarBase> | null>(null)

const onOk = () => {
  if (barBaseRef.value) {
    // 从组件获取返回的chart实例
    barBaseRef.value.echartsInstance.setOption({
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
  }
}
</script>

<template>
  <bar-base ref="barBaseRef" @ok="onOk" />
</template>