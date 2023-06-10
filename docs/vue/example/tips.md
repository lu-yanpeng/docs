# 小技巧


## 根据字符串获取全局组件

方法就是把`app`应用挂载到依赖项上，在需要的通过`inject`获取`app`然后`app.component`就能获取到已经注册的全局组件了。

```js
// main.js 把应用实例挂载到依赖项上
import ArcoVueIcon from '@arco-design/web-vue/es/icon' 
const app = createApp(App)
app.use(ArcoVueIcon)  // 全局注册icon组件
app.provide('app', app)  // 挂载app

// 组件中使用
const app = inject('app')
// 具体组件的名称可以打开源码查看
const icon = app.component('IconSettings')  // 可以返回已经注册的组件  
```