# 监听器

参考：[教程](https://cn.vuejs.org/guide/essentials/watchers.html) [API](https://cn.vuejs.org/api/reactivity-core.html#watch)

监听器可以监听一个响应式数据，它的值变化时，会自动执行一个回调函数。比如在请求数据服务器获取到数据之后，就可以用watch监听返回的数据，
它的值有变化就可以执行后续操作


## watch()

### 语法

```js
watch(响应式数据, 回调函数, 选项)
```
- 第一个参数可以是ref对象、一个列表里面是ref。但是更建议用箭头函数返回要监听的值
  - 响应式数据可以是`ref`、`reactive`、计算属性，或者pinia的store
- 回调函数，这个回调可以接收3个值
  - newValue 新值, oldValue 旧值, onCleanup 清理函数，一般用不到
- 选项，这里列出常用的，更多配置在官网查看
  - immediate：在侦听器创建时立即触发回调。第一次调用时旧值是 undefined。
  - deep：如果源是对象，强制深度遍历，以便在深层级变更时触发回调。可以用来深度监听对象或数组的变化
  - flush：调整回调函数执行的实际，默认会在DOM更新前执行，设置`{flush: 'post'}`可以在DOM变化后执行回调。


### watch的正确用法

应该用箭头函数显示的返回要监听的值，避免深度监听整个ref。只要函数的返回值改变了，就会触发watch

```js
// 正确做法
const name = ref('zs')
watch(() => name.value, () => {})

const user = ref({name: 'zs'})
watch(() => user.value.name, () => {})


// 不要这样做
watch(user, () => {}, {deep: true})
```

### 立即执行监听 immediate

有时候我们需要创建好watch后立即执行，比如监听父组件传递的props，根据props初始值做一些事

```js
const props = defineProps(['name'])

watch(() => props.name, () => {
    console.log(props)
}, {immediate: true})
```

如果不加`immediate`，那么只有props发生变化时才能监听到，也就没办法在初始化的时候监听了


### 需要注意的地方

需要监听响应式数据，通过`.value`获取到的是实际的值，监听`.value`不会有结果，下面这些示例都不会触发watch

```js
const name = ref('zs')
watch(name.value, () => {})

const user = ref({name: 'zs'})
watch(user.value.name, () => {})

const menuList = ref([1, 2, 3])
watch(menuList.value, () => {})
```


## watchEffect()

立即执行回调函数，并且回调函数里面用到的响应式数据有变化，回调就会触发，就像计算属性一样。如果需要监听大量响应式数据
用这个方法写起来比较简单，只要回调里面用到的数据都会被监听。

### 语法

```js
watchEffect(回调函数, 选项)
```

- 回调函数里面用到的响应式数据变化时，触发回调
- 选项：`{flush: 'post'}`指定回调在DOM更新之后执行


下面的示例虽然只是简单的打印了数据，但是它用到的数据就会被监听

```js
const props = defineProps(['name'])

watchEffect(() => {
    // 立即触发回调，在props改变时再次触发
    console.log(props.name)    
})

const name = ref('test')
const user = ref({name: 'zs'})
watchEffect(() => {
  // 可以正常监听
  console.log(name.value)
  console.log(user.value.name)
})
```

watchEffect是同步执行的，只有在第一个`await`之前的代码会被监听到，后面的数据变化了也监听不到

```js
const name = ref('')
const info = ref('')
        
watchEffect(async () => {
    name.value = 'test'  // 正常监听
    const response = await fetch()
    info.value = 'test'  // 监听不到
})
```


## 应该用哪个？

`watch`和`watchEffect`都能监听数据的变化
- `watch`一般用来显示监听单个值，只有某个值变化时才执行回调
- `watchEffect`回调里面用到的时候都会自动监听，适合监听大量数据的情况




## 示例

### 普通ref

值是普通类型的响应式数据

```js
const name = ref('zs')
watch(() => name.value, () => {
  console.log(name.value)
})
```

### 对象ref

```js
const user = ref({name: 'zs'})
// 监听单个属性，只有修改name或替换整个对象时会触发
watch(() => user.value.name, () => {
    console.log(user.value)
})

// 监听整个对象，添加或替换user都会触发，开销很大要注意
watch(user, () => {
    console.log(user.value)
}, {deep: true})
```

### 数组ref

```js
const menuList = ref([1, 2, 3])
// 添加或者替换数组时都会触发，深层监听可能会开销很大，建议用下面中方法
watch(menuList, () => {
    console.log(menuList.value)
}, {deep: true})

// 只有添加或删除元素时触发
watch(() => menuList.value.length, () => {
    console.log(menuList.value)
})
```