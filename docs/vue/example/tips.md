# 小技巧


## 根据字符串获取全局组件

```js
// main.js 把应用实例挂载到依赖项上
import ArcoVueIcon from '@arco-design/web-vue/es/icon' 
const app = createApp(App)
app.use(ArcoVueIcon)  // 全局注册icon组件
app.provide('app', app)

// 组件中使用
const app = inject('app')
// 具体组件的名称可以打开源码查看
const icon = app.component('IconSettings')  
```