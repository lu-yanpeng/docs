# 取消请求

调用`useAbortController`返回的ac对象，可以在每次使用的时候都返回一个新的`AbortController`对象，这样在取消一个请求后
可以重复使用这个对象

## 钩子

```ts
import { ref, toRef } from 'vue'

export const useAbortController = () => {
  // 判断是否需要生成新实例，因为一个signal用过一次之后就不能再用了，需要生成新的值，否则请求会直接取消
  const aborted = ref(false)

  const _ctrl = ref(new AbortController())

  const _listen = () => {
    _ctrl.value.signal.addEventListener('abort', () => (aborted.value = true), { once: true })
  }
  _listen()

  const getAc = () => {
    if (aborted.value) {
      _ctrl.value = new AbortController()
      aborted.value = false
      _listen()
      return _ctrl.value
    }

    return _ctrl.value
  }

  // 一个只读的对象，每次访问.value的时候都会执行getAc获取最新的值
  const ac = toRef(() => getAc())

  return {
    ac
  }
}
```

## 使用

应该只在`get`请求中取消请求，因为取消请求实际只是取消浏览器的请求，在控制台可以看到，实际的请求已经发到后端，并且已经被服务器处理
只是返回的数据被浏览器拒绝了。如果在`post`中取消一个请求，可能会照成数据已经被修改，但是前端看不到的请求

```vue
<script setup lang="ts">
  import { useAbortController } from './hooks'
  
  const { ac } = useAbortController()
  const getData = async () => {
    // 每次获取数据前都取消上一个请求，这样可以避免网络延迟而重复取值
    ac.value.abort()
    return await axios.get('...', {
      // 传递一个信号对象
      signal: ac.value.signal
    })
  }
</script>
```

在axios中，通过`signal`手动取消的请求异常code是`ERR_CANCELED`，可以通过它判断是否是手动取消

```ts
try {
  axios.get()
} catch (e: any) {
  if (e?.code === 'ERR_CANCELED') {
    console.log('取消请求')
    return
  }
}
```


## 说明

在之前版本中使用`computed`来创建ac，因为在计算属性中修改了响应式数据的值，导致控制台一直警告。换成新版提供的`toRef`
就不会警告了

::: details 之前的代码
```ts
import { ref, computed } from 'vue'

export const useAbortController = () => {
  // 判断是否需要生成新实例，因为一个signal用过一次之后就不能再用了，需要生成新的值，否则请求会直接取消
  // 外部可以通过这个变量，判断是不是用户手动取消的请求
  const aborted = ref(false)

  // 通过这个对象取消一个请求
  const _ctrl = ref(new AbortController())

  const fn = () => (aborted.value = true)

  const ac = computed(() => {
    if (aborted.value) {
      _ctrl.value = new AbortController()
      aborted.value = false
      _ctrl.value.signal.addEventListener('abort', fn, { once: true })
      return _ctrl.value
    }

    return _ctrl.value
  })

  // 请求被取消时自动触发这个事件，因为signal只能使用一次，所以这里可以设置成一次性事件
  _ctrl.value.signal.addEventListener('abort', fn, { once: true })

  return { ac }
}
```
:::

重新生成ac控制器的原理就是每次调用`.value`的时候都会执行函数进行判断，从而返回新ac。使用`getter`只会在一个函数中被调用一次，
也就是第一次调用`getter`时会执行函数，后续都会直接使用第一次的值，不是每次都执行函数的逻辑。所以它会一直返回同一个被关闭的控制器

只要每次都能返回新控制器就行，所以也可以在外部直接调用`getAc()`获取最新的控制器

```ts
import { ref, toRef } from 'vue'

export const useAbortController = () => {
  // 判断是否需要生成新实例，因为一个signal用过一次之后就不能再用了，需要生成新的值，否则请求会直接取消
  const aborted = shallowRef(false)

  const _ctrl = ref(new AbortController())

  const _listen = () => {
    _ctrl.value.signal.addEventListener('abort', () => (aborted.value = true), { once: true })
  }
  _listen()

  const getAc = () => {
    if (aborted.value) {
      _ctrl.value = new AbortController()
      aborted.value = false
      _listen()
      return _ctrl.value
    }

    return _ctrl.value
  }

  return {
    // 这样一个getter只有第一次取值的时候会调用getAc，后续就只会使用第一次的值
    get ac() {
      return getAc()
    },
    // 外部可以直接使用getAc获取控制区，但是这样不够优雅
    getAc
  }
}
```