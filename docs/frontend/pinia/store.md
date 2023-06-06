# store 仓库

使用pinia的第一步是定义一个store，在这里创建要管理的属性和方法，并导出这个对象。这里全部使用setup语法，其他用法可以看官网




## 定义一个store

一般会在`@/store`目录下统一定义store

```js
// menu.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    const menuList = ref([])
    
    // 这里必须返回一个对象，否则报错
    return { menuList }
})
```

`defineStore`第一个参数是一个字符串id，它在整个pinia中必须是**唯一**的，也就是其他的store里的id都不能重复。
第二个参数是一个函数，它必须返回一个**对象**，里面是外部可以访问到的数据。

为了统一规范，store的名称一般以`use`开头，`Store`结尾，大多数时候都应该遵循这个规范。并且为了开发工具的检测，最好一个js文件只定义一个store。

`pinia`会自动为返回的属性分类，其中：
- `ref()` 就是 `state` 属性
- `computed()` 就是 `getters`
- `function()` 就是 `actions`
- 不同类型的属性可以使用一些特殊的方法

```js
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
    // 自动分类为state
    const name = ref('zs')
    // getters
    const info = computed(() => {name: name.value})
    // actions
    const getAddr = () => {}
    
    // 这里必须返回一个对象，否则报错
    return { name, info, getAddr }
})
```


## 使用

`store`在实例化之后就可以使用它里面返回的这些数据了，并且`store`实例是经过`reactive`包装的，在使用的时候不需要加`.value`

store是单例的，在不同的组件中调用useStore创建的都是同一个对象，这样就保证了数据的一致性。

```js
import { useMenuStore } from '@/store/menu'

const menuStore = useMenuStore()
// 这样就可以直接使用store里面定义的ref了，不需要.value
menuStore.menuList
```

`store`实例在使用计算属性和ref时都不需要`.value`，不过在store内部还是需要正常的`.value`

```js
export const useMenuStore = defineStore('menu', () => {
    menuList = ref([])
    
    const addRoute = () => {
        // 在这里使用ref需要.value
        menuList.value
    }
    
    return { menuList, addRoute }
})
```

## 不要直接解构store

虽然store返回了一个对象，但是如果直接解构的话会丢失响应式（除了函数）

```js
// menuList的值不会变，因为它丢失了响应式
const { menuList } = menuStore
```

如果需要解构并且保持响应式，可以用`storeToRefs`store

```js
import { storeToRefs } from 'pinia'

// 这样可以保持响应式
const { menuList } = storeToRefs(menuStore)
// 函数可以直接解构，因为它不需要响应式
const { addRoute } = menuStore
```