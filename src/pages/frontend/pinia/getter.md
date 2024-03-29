# getter 计算属性

一个计算属性就是一个`getter`

```js
import { ref, computed } from 'vue'

export const useTestStore = defineStore('test', () => {
    const info = computed(() => {
        return {name: 'zs', addr: 'abc'}
    })
    
    return { info }
})
```

外部可以直接访问，就像访问state一样，也是不需要加`.value`

```js
testStore.info
```