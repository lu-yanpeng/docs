# 插件

参考：[官网](https://pinia.vuejs.org/zh/core-concepts/plugins.html)

可以把一些属性通过插件的形式添加到所有的store实例上，也可以添加新的方法，这些属性和方法在所有的store实例上都可以直接调用。

::: tip
通过插件添加的属性只能在store实例中访问，在`defineStore`中是访问不到的
:::

通过插件直接返回一个对象，这个对象上的属性可以在浏览器vue开发者工具直接看到属性，如果是手动添加的可以[这样做](https://pinia.vuejs.org/zh/core-concepts/plugins.html#augmenting-a-store)

```js
pinia.use(({store}) => {
    store.router = markRaw(router)
    // 添加到_customProperties属性上，这样开发者工具中就能看到router属性了
    store._customProperties.add('router')
})
```

## 示例

```js
// 添加属性
const pinia = createPinia()

pinia.use(() => ({msg: 'ok'}))

// 使用
const userStore = useUserStore()
// 这里编辑器虽然没有提示，但是通过console.log(userStore)可以看到确实由msg属性
userStore.msg
```
