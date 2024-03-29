# 常见错误

## 在vue-router中使用

不能在router初始化的使用store，因为这时候pinia还没被创建。应该在router的生命周期函数中调用，store是单例的，
多次调用生成的也是同一个对象，所以不用担心数据问题。

```js
import { createRouter } from 'vue-router'
const router = createRouter({})

// 在这里实例化store会报错，因为router初始化的时候pinia还没创建
const store = useStore()

router.beforeEach((to) => {
  // 在这里可以正常使用，因为beforeEach调用的时候，pinia已经创建好了
  const store = useStore()
})
```

## store中使用vue-router

在store中无法使用`useRouter()`获取路由器对象，尝试这样做将会得到一个`undefined`，因为`useRouter()`只能在`setup`语法的**组件**中使用，
普通组件或者一个普通js文件无法通过这个方法获取路由器对象。[参考](https://github.com/vuejs/pinia/discussions/951)

```js
import { useRouter } from 'vue-router'

const useMenuStore = defineStore('menu', () => {
    // 这里router是undefined
    const router = useRouter()
})
```

一般的做法是直接从`router.js`文件里面导入router对象，另外一个比较麻烦的方法是使用[插件](https://pinia.vuejs.org/zh/core-concepts/plugins.html#adding-new-external-properties)

```js
// 从初始化router的文件里面直接导入router对象
import router from '@/router'

const useMenuStore = defineStore('menu', () => {
    // 这样可以正常使用
    router.push('/login')
})
```