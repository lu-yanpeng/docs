import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { createPinia } from 'pinia'
// 只有把css文件放到这个位置才能导入，否者报错
import '../../nav-config/reset.css'

const pinia = createPinia()

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    // 这里相当于vue项目的main.js
    app.use(pinia)
  }
} satisfies Theme