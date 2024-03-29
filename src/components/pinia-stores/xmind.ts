import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useXmindStore = defineStore('xmind', () => {
  // 保存已加载的xmind文件，避免路由切换的时候重新加载
  const viewers = ref<Record<string, any>>({})

  return {
    viewers
  }
})