import { defineConfig } from 'vitepress'
import { navConfig } from '../nav-config'
import { fileURLToPath, URL } from 'node:url'

const BASE = '/docs/'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'ly的笔记',
  description: '各种大杂烩笔记',
  lang: 'zh-CN',
  base: BASE,
  srcDir: './pages',
  cleanUrls: true,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', href: `${BASE}favicon.ico` }]
  ],
  themeConfig: {
    ...navConfig,

    logo: '/favicon.ico',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    editLink: {
      text: '在 GitHub 上查看',
      pattern: 'https://github.com/lu-yanpeng/docs/tree/master/docs/:path'
    },
    socialLinks: [
      {icon: 'github', link: 'https://github.com/lu-yanpeng'}
    ],
    lastUpdated: {
      text: '最后更新'
    },
    outline: {
      label: '目录'
    },
    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '深色模式'
  },
  vite: {
    resolve: {
      alias: {
        // @ts-ignore
        '@': fileURLToPath(new URL('..', import.meta.url))
      }
    }
  },
  markdown: {
    image: {
      lazyLoading: true
    },
    theme: 'one-dark-pro',
  }
})
