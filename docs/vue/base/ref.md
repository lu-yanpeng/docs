# 响应式

一个响应式数据在它发生改变的时候，所有引用它的地方都会跟着变，比如一个`ref`它的值变了，模板中的值就会跟着变。

一般认为修改变量值之后，所有用到这个变量的地方都会跟着变，这个变量就是响应式的，它改变值的这个行为可以被捕获，比如`watch`就可以捕获响应式数据的状态。
常见的响应式数据有
- ref
- reactive
- computed
- pinia的store



## ref()

`ref()`可以包装任意类型的数据，让他们变成响应式的，通过返回值`.value`来访问到原始值。推荐所有响应式数据都用`ref`来定义，因为它需要通过`.value`来取值
这样可以很明确的知道它是响应式数据。

```js
import { ref } from 'vue'

const count = ref(0)
count.value += 1

// 可以包装任意类型数据
const user = ref({
    name: 'zs'
})
const menuList = ref([1, 2, 3])
```

响应式数据底层是通过`Proxy`实现的，打印响应式数据，如果值是对象会显示一个被代理的对象，普通类型的值会直接返回

```js
const user = ref({name: 'zs'})
const count = ref(0)

console.log(user.value)  // 打印 Proxy(Object) {name: 'zs'}
console.log(count.value)  // 打印 0
```


## 深层响应

响应式数据默认是深层代理的，一个对象里面套装一个对象，或则多维数组，他们的值发生改变时都能检测到

```js
const user = ref({
    addr: [1, 2, 3],
    profile: {
        phone: 123
    }
})

// 因为深层代理，对象的任何属性有改变都会触发响应式
user.value.addr.push(0)
user.value.profile.phone = 234
```

深层代理可能对性能有损耗，特别是代理一个很大的对象的时候，他会遍历所有属性挨个添加响应式。
特殊情况可以用浅层代理[shallowRef](https://cn.vuejs.org/api/reactivity-advanced.html#shallowref)，它只有替换`.value`值的时候才会触发响应式。

```js
import { shallowRef } from 'vue'

const user = shallowRef({
    name: 'zs',
    addr: [1,2,3],
    profile: {
        phone: 123
    }
})
// 虽然user.value的值变了，但是不会触发响应式
user.value.name = 'test'
user.value.addr.push(0)
user.value.profile.phone = 234

// 替换整个值才会触发响应式
user.value = {test: 'abc'}
```



## 解构

如果你希望解构一个响应式数据，那就要重新设计一下了

```js
const user = {
    name: ref('zs'),
    age: ref(18)
}

// 这样解包是响应式的
const {name, age} = user
name.value
age.value
```

创建一个普通对象，它里面的属性是ref，这样它被解构的时候返回的属性也是ref。这样的用法被用在组合式函数和`pinia`中

不要直接解构一个ref

```js
const user = ref({
    name: 'zs',
    age: 18
})

// 这里不是响应式的，name和age都是普通数据，不是ref
const {name, age} = user.value
```



## 模板中解包

ref对象在`<template>`里面会被自动解包，使用的时候不需要`.value`

```vue
<script setup>
const name = ref('zs')
</script>

<template>
  <!-- 可以直接获取到值，不需要.value -->
  <p>{{ name }}</p>
</template>
```

注意，只有数据顶层是ref才能自动解包，如果是这种形式还是需要.value

```js
<script setup>
const info = { name: ref('zs') }
</script>

<template>
  <!-- info是普通对象，但是它的name是ref，这里就需要.value -->
  <p>{{ info.name.value }}</p>
</template>
```

只有一个对象本身就是ref才会解包，它是普通对象，属性是ref就不会解包


## 注意

只有在`<script setup>`模块顶层定义的ref才能被模板使用，在函数或生命周期函数里面定义ref，模板访问不到

```vue
<script setup>
import { ref, onMounted } from 'vue'

const name = ref('zs')

onMounted(() => {
  // 模板中访问不到info
  const info = ref('haha')
})
</script>
```

`<script setup>`是一个语法糖，在它里面定义的代码会跟`<template>`保持在同一个作用域，在函数作用域里面定义的变量就不能被模板访问到，
就像全局作用域访问不到一个函数里面定义的变量一样。

::: details setup语法
setup语法其实是选项式写法中`setup()`函数的简化，它会自动吧所有顶层变量暴露给模板

在`setup()`中返回的变量可以在模板中直接使用

```js
import { ref } from 'vue'

export default {
  // `setup` 是一个专门用于组合式 API 的特殊钩子函数
  setup() {
    const state = ref({ count: 0 })

    // 暴露 state 到模板
    return {
      state
    }
  }
}
```

setup语法的写法就简单很多

```vue
<script setup>
import { ref } from 'vue'

// 这里vue帮我们把state自动暴露给模板了
const state = ref({ count: 0 })
</script>
```
:::


## reactive

用这个可以给对象类型的数据创建响应式，普通类型不适用，比如字符串或数字。用它创建的响应式数据不需要`.value`

ref的.value值如果是对象类型就会用reactive包装形成响应式

::: tip
这个少用，增加心智负担，建议全部使用`ref`
:::


## 正确用法

### 不要改变数据的类型

创建ref时需要设置初始值，这个值一般就是它的类型，在后续使用时不要修改它的类型，这样在别的地方使用的时候可能会出问题

```js
const name = ref('zs')
const age = ref(18)

// 类型变了，不要这样做！
name.value = 123
age.value = 'test'
```

如果不确定的话可以设置为null，`const obj = ref(null)`，在使用时判断一下


### 替换一个对象要考虑好

虽然定义一个对象类型的响应式数据，整个替换掉也会触发响应式，但是最好不要这么做，如果新对象没有原来的属性，在别的地方用的时候可能会访问不到属性报错。

```js
const user = ref({
    name: 'zs',
    age: 18,
    profile: {
        phone: 123
    }
})

// 没有原来对象上的属性了
user = {
    test: 'abc'
}
```
