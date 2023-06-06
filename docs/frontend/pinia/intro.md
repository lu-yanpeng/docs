# 介绍

[pinia](https://pinia.vuejs.org/zh/introduction.html) 可以跨组件通信，在组件内只要导入store就能修改他的状态。可以用来发起异步请求，保存用户数据。


## 安装

推荐在创建项目的时候选择自动安装pinia，当然手动安装也可以

```shell
pnpm add pinia
# 或者使用 npm
npm install pinia
```

配置，打开`main.js`

```js {2,5,8}
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.mount('#app')
```


## 概念

### store

通过`defineStore`创建的对象，通过`store()`来创建一个store实例，它可以访问到具体的属性

```js
// useUserStore是store对象
export const useUserStore = defineStore('user', () => {})

// userStore是store实例
const userStore = useUserStore()
```

### state

类似组件的data，在pinia里面表现为一个ref，在外部使用时不需要加`.value`

### getter

相当于计算属性，在内部也是通过`computed`来定义的，在外部使用时不需要加`.value`

### action

相当于方法，在内部变现为一个函数，一般会用箭头函数来定义



## 示例

创建`/store/user.js`

```js
import { defineStore } from 'pinia'
import { ref } from 'vue'

// 创建store对象
export const useUserStore = defineStore('menu', () => {
    const userinfo = ref({})

    const addRoute = async () => {
        // 添加路由的方法
    }

    // 用到的属性需要统一返回
    return { addRoute, userinfo }
})
```

在组件中使用

```js
import { useUserStore } from '@/store/user'

// 创建store实例
const userStore = useUserStore()
// 使用它上面的属性
userStore.userinfo
```