<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { useScriptTag } from '@vueuse/core'
import { useXmindStore } from './pinia-stores/xmind'

const props = withDefaults(defineProps<{
  width: string
  height: string
  // import fileUrl from '../assets/test.xmind?url';
  // ?url 以url路径的方式导入
  fileUrl: string
  // 根据这个id去store找对应已加载的xmind文件，这样就避免了重复加载节省大量时间
  id: symbol
}>(), {
  width: '100%',
  height: '600px',
})

const { load, unload } = useScriptTag(
    'https://unpkg.com/xmind-embed-viewer@1.2.0/dist/umd/xmind-embed-viewer.js',
    () => {},
    { manual: true },
)

const loading = ref(false)
const xmindRef = shallowRef<HTMLDivElement | null>(null)

const xmindStore = useXmindStore()
const xmindInit = async () => {
  const viewer = new window.XMindEmbedViewer({
    el: xmindRef.value as HTMLDivElement,
    region: 'cn',
    styles: {
      width: props.width,
      height: props.height,
    },
  })

  viewer.addEventListener('map-ready', () => {
    viewer.setZoomScale(100)
    loading.value = false
  })

  if (!xmindStore.viewers[props.id]) {
    const res = await fetch(props.fileUrl)
    xmindStore.viewers[props.id] = await res.arrayBuffer()
  }

  viewer.load(xmindStore.viewers[props.id])
}
onMounted(async () => {
  if (!props.id) {
    return
  }

  loading.value = true

  if (window?.XMindEmbedViewer) {
    await xmindInit()
    return
  }

  await load()
  await xmindInit()
})
</script>

<template>
  <div>
    <p v-if="loading">加载中...</p>

    <div ref="xmindRef"></div>
  </div>
</template>
