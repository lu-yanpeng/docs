# 取消请求

::: warning
这是过时的文档，点击查看[最新文档](../vue-demo/cancellation.md)
:::

可以通过`signal`选项取消一个已发送的请求。要注意的是请求实际上已经发出，而且服务器也收到了请求，只是在服务器还没返回的时候
前端把请求取消了。这样可能会导致后端数据修改了但用户不知道，所以取消操作不要用在修改数据的接口上。

下面是一个示例，打开控制台发送请求后点击取消就会看到一个请求被取消了。

<script setup>
import Cancellation from '../../../components/frontend/axios/cancellation.vue'
</script>

<Cancellation />


axios请求可以传递一个配置项`signal`，它接收一个信号对象`AbortSignal`，调用控制器的`abort()`方法时，这个信号对象就会
取消当前的请求，如果下次请求还用这个信号会继续报错。

```js
const ac = new AbortController()

await axios.get('...', {
    // 传递一个信号对象
    signal: ac.signal
})
// 调用控制器的方法取消信号所在的请求
ac.abort()
```

调用`abort()`方法以后信号对象就会变成取消状态了，这时候再用他来发请求就会直接报错。使用的时候应该监听`signal`对象的`abort`事件，
当请求被取消应该生成新的控制器

下面这个钩子函数返回一个响应式的控制器，每次在请求被取消后就会生成新的控制器，可以在组件中反复取消请求

```js
import { ref, watchEffect } from 'vue'

// 用来取消一个请求
export const useAbortController = () => {
    // 判断是否需要生成新实例，因为一个signal用过一次之后就不能再用了，需要生成新的值，否则请求会直接取消
    const aborted = ref(false)
    // 保存AbortController的实例
    const ac = ref(new AbortController())
    
    // 触发abort事件时调用的回调
    const fn = () => aborted.value = true
    watchEffect(() => {
        if (aborted.value) {
            // 需要重新生成AbortController实例
            ac.value = new AbortController()
            aborted.value = false
            ac.value.signal.addEventListener('abort', fn, {once: true})
            return ac.value
        }
        return ac.value
    })
    
    // 请求被取消时自动触发这个事件，因为signal只能使用一次，所以这里可以设置成一次性事件
    ac.value.signal.addEventListener('abort', fn, {once: true})
    return { ac }
}
```

## AbortController

参考：[MDN](https://developer.mozilla.org/zh-CN/docs/Web/API/AbortController)

可以用`AbortController`的实例来取消fetch请求或移除绑定的事件。只要请求传递`signal`配置项并且设置成控制器的`signal`属性，
在其他地方只要调用控制器的`abort()`方法，绑定了它的信号的请求就会被自动取消

```js
// 实例化控制器
const ac = new AbortController()

// 在请求的配置项里面传入这个信号对象
await fetch('...', {signal: ac.signal})
await fetch('...', {signal: ac.signal})

// 取消请求，上面这两个请求都会取消。只要是绑定了它的信号的请求都会取消
ac.abort()
```

事件也可以传递`signal`来[取消](https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener)
