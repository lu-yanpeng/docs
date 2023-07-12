import { shallowRef, onUnmounted, watchPostEffect } from 'vue';
import * as echarts from 'echarts';



export const useEcharts = (containerRef, options) => {
  const myChart = shallowRef(null);
  const observe = shallowRef(null)

  watchPostEffect(() => {
    if (containerRef.value && (typeof options.value === 'object' && options.value !== null)) {
      // 初始化myChart并且监听容器大小自动resize
      if (myChart.value === null) {
        myChart.value = echarts.init(containerRef.value);
        observe.value = new ResizeObserver(() => myChart.value.resize());
        observe.value.observe(containerRef.value);
      }
      myChart.value.setOption(options.value);
    }
  });

  onUnmounted(() => {
    if (myChart.value) {
      myChart.value.dispose();
      observe.value.disconnect();
    }
  });

  return { myChart };
};