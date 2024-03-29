# 计算属性 computed

计算属性`computed()`通过传递一个`getter`函数返回一个值，这个值会自动包装成`ref`类型，只要getter函数里面用到的响应式数据有变化，计算属性就会跟着变。

下面这段代码，只要`name`或者`age`发生变化，`userinfo`的值就会跟着变。

```js
import { computed, ref } from 'vue'

const name = ref('zs')
const age = ref(18)
const userinfo = computed(() => {
    return {name: name.value, age: age.value}
})
console.log(userinfo.value)
```

::: tip
计算`computed`属性返回`ref`类型的数据，需要`.value`来取值。
:::


## 缓存

计算属性的值会被缓存，如果它依赖的响应式数据没变，不管运行多少次他的返回值都是一样的。即使页面重新渲染了他也会使用缓存的值。


## 可写的计算属性

参考[官网](https://cn.vuejs.org/guide/essentials/computed.html#writable-computed)



## 注意

不要在计算属性里面执行有副作用的操作，比如发送请求或操作DOM，如果你想这么做，可能你需要的是`watch`或者一个普通函数。
计算属性的职责就是返回一个值，不要做过多操作。
