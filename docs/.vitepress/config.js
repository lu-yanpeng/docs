import { defineConfig } from 'vitepress'
import { navConfig } from '../../config/navConfig'

export default defineConfig({
  title: 'ly的笔记',
  description: '各种大杂烩笔记',
  lang: 'zh-CN',
  base: '/docs/',
  cleanUrls: true,
  themeConfig: {
    logo: 'public/favicon.ico',
    ...navConfig
  }
})