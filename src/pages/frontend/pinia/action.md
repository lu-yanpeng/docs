# action 方法

一个函数就是一个action，尽量用箭头函数，因为这样可以正常访问到外部的其他数据。一般会在这里做一些业务逻辑处理，比如发请求获取用户信息之类的。

```js
import { defineStore } from 'pinia'

export const useTestStore = defineStore('test', () => {
    const name = ref('test')

    // 函数就是action
    const getRouter = () => {
        console.log('action', name.value)
    }

    return { getRouter, name }
})
```

函数可以正常被解构，因为它不是响应式数据

```js
const testStore = useTestStore()
const { getRouter } = testStore
// 可以正常访问到
getRouter()
```

## $onAction() 待补充...

参考：[官网](https://pinia.vuejs.org/zh/core-concepts/actions.html#subscribing-to-actions)  [API](https://pinia.vuejs.org/zh/api/interfaces/pinia._StoreWithState.html#onaction)

一个函数被调用时这个方法会自动触发

```js
testStore.$onAction(() => {
  console.log('函数更新')
})
```