import { defineConfig } from 'vitepress'
import { navConfig } from '../../config/navConfig'

export default defineConfig({
  title: 'ly的笔记',
  description: '各种大杂烩笔记',
  lang: 'zh-CN',
  base: '/docs/',
  cleanUrls: true,
  lastUpdated: true,
  appearance: false,
  head: [
      ['link', { rel: 'icon', href: '/favicon.ico' }]
  ],
  themeConfig: {
    ...navConfig,
    logo: 'favicon.ico',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      text: '在 GitHub 上查看',
      pattern: 'https://github.com/lu-yanpeng/docs/tree/master/docs/:path'
    },
    outlineTitle: '目录',
    socialLinks: [
      {icon: 'github', link: 'https://github.com/lu-yanpeng/docs'}
    ],
    lastUpdatedText: '最后更新'
  }
})