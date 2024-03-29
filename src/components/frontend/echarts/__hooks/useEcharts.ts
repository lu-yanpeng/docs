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
