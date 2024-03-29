# 概念

## 快速示例

需要先初始化一个chart实例，然后用这个实例渲染出一个图表

::: details 示例
```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>ECharts</title>
    <!-- 引入 ECharts 文件 -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/echarts/5.4.2/echarts.min.js"></script>
  </head>
  <body>
    <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
    <div id="main" style="width: 600px;height:400px;"></div>
    <script type="text/javascript">
      // 基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    </script>
  </body>
</html>
```
:::


## 容器大小

应该给图表容器设置确切的大小，不然初始化的时候会有问题

```html
<div class="container" style="width: 100%; height: 600px;"></div>
```

## 图表自适应

在容器大小发生变化的时候，图表可以调用`resize()`方法自动调整大小

```vue
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  const myChart = echarts.init(container)
  // 通过ResizeObserver监听容器大小的变化，并调用resize方法调整图表大小
  const observer = new ResizeObserver(() => myChart.resize())
  observer.observe(container)
})
</script>

<template>
  <div class="container"></div>
</template>
```

## 销毁实例

在vue中如果一个组件被卸载了，应该把上面的所有图表一起卸载。调用`dispose()`销毁图表实例，避免多个图表实例造成内存泄漏

```vue
<script setup>
import { onUnmounted } from 'vue'

onUnmounted(() => {
  myChart.dispose()
})
</script>
```


## useEcharts

这里用CDN的方式加载`echarts`


```ts
import { shallowRef, onUnmounted, onMounted, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'
import { useScriptTag } from '@vueuse/core'
import type { ECharts } from 'echarts'


export const useEcharts = (
    containerRef: MaybeRefOrGetter<HTMLDivElement | null>,
    option: MaybeRefOrGetter<Record<string, any>>
) => {
  const echartsInstance = shallowRef<ECharts | null>(null)
  const observe = shallowRef(null)

  const { load } = useScriptTag(
      'https://cdn.bootcdn.net/ajax/libs/echarts/5.4.3/echarts.min.js',
      () => {},
      { manual: true }
  )

  onMounted(async () => {
    if (!window?.echarts) {
      await load()
    }

    const container = toValue(containerRef)
    if (container && window?.echarts) {
      echartsInstance.value = echarts.init(container as HTMLDivElement)
      echartsInstance.value.setOption(toValue(option))

      observe.value = new ResizeObserver(() => echartsInstance.value.resize())
      observe.value.observe(container)
    } else {
      console.log('加载echarts失败')
    }
  })

  onUnmounted(() => {
    if (echartsInstance.value) {
      echartsInstance.value.dispose()
      observe.value.disconnect()
    }
  })

  return { echartsInstance }
};

```


## 基础组件

```vue
<script setup lang="ts">
import { shallowRef, watchPostEffect } from 'vue'
import { useEcharts } from './useEcharts'

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

// 因为通过cdn加载echarts会出现比较高的延迟，所以这里在加载完成后触发一个事件告诉调用的组件
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
```

