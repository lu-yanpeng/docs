# state 响应式数据

参考：[官网](https://pinia.vuejs.org/zh/core-concepts/state.html) [API](https://pinia.vuejs.org/zh/api/interfaces/pinia._StoreWithState.html)

`state`就是由`ref()`和`reactive()`定义的响应式数据，下面这个store里面的`count`和`name`就是state，他们会被pinia自动放到$state属性里面。

```js
import { ref } from 'vue'
import { defineStore } from 'pinia'

const useTestStore = defineStore('tst', () => {
    // 这两个属性就是state
    const count = ref(0)
    const user = reactive({ name: 'test' })
    
    return { name, user }
})
```

state都是响应式的，可以直接修改他们。在外部使用不需要加`.value`，因为store实例已经被`reactive()`包装过了。

```js
const testStore = useTestStore()
// 这样就可以直接访问state了
testStore.count += 1
```

## $state

可以通过`store.$state`访问到定义的所有state

```js
const testStore = useTestStore()
// testStore上的所有state都能访问到
testStore.$state.count
```

通过$state也可以修改属性，但是**不要**直接替换整个对象，这样会丢失响应式

```js
// 直接给$state赋值会丢失响应式
testStore.$state = {test: '123'}
// 访问不到test属性，会返回undefined
testStore.$state.test
// 不过原有的state还是能正常访问
testStore.$state.count
```


## $patch()

可以用这个方法**批量**修改数据，如果通过这种方法添加了一个不存在的值，那么它将不是响应式的

```js
// 如果test存在会修改tset的值，name不存在会添加name属性，但是不是响应式的
// 并且store上也不能直接访问，只能通过$state访问到
testStore.$patch({test: '123', name: 'admin'})
```

上面通过字面量的方式修改复杂数据很麻烦，比如修改一个数据。这样可以用函数来修改

```js
// 这里的state就是$state，可以访问到所有属性，在这个函数里面修改数据
testStore.$patch((state) => {
    state.addr.push('123')
  })
```



## 重置

[$reset()](https://pinia.vuejs.org/zh/api/interfaces/pinia._StoreWithState.html#reset) 可以把state重置成初始值，**注意**这个方法只有在选项式的store里面才能用，setup语法创建的store没有这个方法


## 监听

`$patch()`方法在state发生改变的时候会自动调用，它默认是深层检测的，也就是一个数组或对象有变化这个方法都会触发。
关于回调的[参数](https://pinia.vuejs.org/zh/api/interfaces/pinia.SubscriptionCallbackMutationDirect.html)

```js
// 只要$state有变化，这个方法就会触发
testStore.$subscribe((mutation, state) => {
  console.log('$patch', mutation, state)
})
```

`watch()`监听，目前感觉这种方法更好一些，可以自由选择监听的属性

```js
import { watch } from 'vue'

watch(testStore.$state , () => {
    // 监听整个$state的变化，对象或数组也能监听到
})
```



## 示例

### 访问数据

```js
// 直接访问
testStore.count
// $state属性访问所有数据
testStore.$state
```

### 修改数据

```js
// 直接修改
testStore.count += 1
// 访问$state修改
testStore.$state.count += 1
// $patch()方法更新
testStore.$patch((state) => {
    state.count += 1
})
```
