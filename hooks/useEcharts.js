import {onMounted, onUnmounted, shallowRef, ref} from 'vue';
import * as echarts from 'echarts';

export const useEcharts = (chartRef, option) => {
  const myCharts = shallowRef(null);
  const observe = ref(null);

  onMounted(() => {
    // 初始化
    myCharts.value = echarts.init(chartRef.value);
    myCharts.value.setOption(option);

    // 窗口变化时，重置图表大小
    observe.value = new ResizeObserver(() => {
      myCharts.value.resize();
    });
    observe.value.observe(chartRef.value);
  });

  onUnmounted(() => {
    console.log('卸载')
    myCharts.value.dispose();
  });

  return { myCharts };
};