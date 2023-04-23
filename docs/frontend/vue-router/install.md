# 安装

这是一个适用vue3版本的路由，[官网](https://router.vuejs.org/zh/)。

## 下载

**npm**

```shell
npm install vue-router@4
```

**pnpm**

```shell
pnpm add vue-router@4
```

## 配置

::: tip 
一般在创建项目的时候最好选择创建路由，让CLI工具自动生成路由文件。当然也可以手动安装。
:::

下载好后还需要进行配置才能用，一般会在`/src/router/index.js`下创建路由配置文件。

创建配置文件，在这里创建路由器对象

```text
- src
-- router
--- index.js
```

写入最基础的配置

```js
// /src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/components/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
```

挂载路由对象

```js
// /src/main.js
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.mount('#app')
```

## 使用

配置好路由后，浏览器访问某个地址就可以看到对应的组件了。每个路由都和一个路由对应。