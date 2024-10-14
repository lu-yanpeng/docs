# 自定义事件

组件可以定义自己的事件，父组件可以监听这个事件来做一些事。比如当组件被点击了偶数次，就触发自定义事件，父组件监听它就知道组件被点了偶数次了。
自定义事件一般用来做组件通信的，也就是子传父的通信。

普通标签的事件是浏览器定义好的不能修改，只能监听。组件我们可以定义自己的事件，名字尽量不要和原生事件相同，父组件只要监听这个名字就行了。


## 定义要触发的事件

第一步是定义自己要触发的事件，用`defineEmits()`来定义要触发的事件，它是特殊的函数，不需要导入就能直接使用。
`defineEmits`参数是一个数组，里面是要触发的事件名称，可以定义多个要触发的事件。

```vue
<script setup>
import { ref } from 'vue'

const emits = defineEmits(['changeNum'])
const count = ref(0)
const onClick = () => {
  count.value += 1
  // 在偶数次的时候触发事件
  if (!(count.value % 2)) {
    emits('changeNum', count.value)
  }
}
</script>

<template>
  <button @click="onClick">{{ count }}</button>
</template>
```

上面用`defineEmits`声明要触发`changeNum`事件，因为我们要在`setup`里面触发事件，所以用`emits`接收返回值并触发这个事件，传递`count`作为事件的参数。


## 触发事件

第二步触发事件，在需要的时候就可以触发事件通知父组件了。比如上面的示例就会在`count`等于偶数的时候触发事件。

在setup中想要触发事件需要接收`defineEmits`的返回值来触发，模板中可以用`$emit`触发。

```vue
<script setup>
// setup里面需要接收defineEmits的返回值来触发事件
const emit = defineEmits(['changeNum', 'test'])
emit('changeNum', 123, 'abc')
</script>

<template>
  <button @click="$event('test')"></button>
</template>
```

调用`emit`第一个参数传入要触发的事件，也就是`defineEmits`里面定义的事件，后面传入的其他参数都会传递父组件定义的事件监听器。


## 监听事件

第三步父组件监听事件，这里就和监听普通的标签事件一样。监听事件然后用事件处理函数处理它就行了。

```vue
<template>
  <div>
    <child @change-num="onChangeNum" @test="onTest" />
  </div>
</template>
```

要注意接收事件传递的参数，在处理函数中使用接收并使用他们。


## 关于用法

如果定义的组件需要给很多人用，建议用自定义事件来通信。如果组件只有自己用的话，可以用依赖注入或者props传入函数来通信。


## 异步事件

很多时候组件抛出事件之后需要等待父组件处理完毕，然后根据结果执行下一步操作，这种需要等待的事件就可以用异步事件

子组件定义事件的时候，通过`Promise`传递`resolve`函数，等待这个`Promise`完成，就可以实现异步的功能

<script setup>
import AsyncEvent from '@/components/vue/base/async-event/index.vue'
</script>

<async-event />

::: details 源码
子组件
```vue
<script setup lang="ts">
import { ref } from 'vue'

const emits = defineEmits<{
  submit: [resolve: (value: boolean | PromiseLike<boolean | null> | null) => void]
}>()

const result = ref<boolean | null>(null)
const onClick = async () => {
  // 等待这个promise完成
  result.value = await new Promise((resolve) => {
    emits('submit', resolve)
  })
  // 父组件调用resolve之后才会继续执行后续的代码
  console.log('执行完毕')
}
</script>
```

父组件
```vue
<script setup lang="ts">
import ChildComps from './child.vue'

const onSubmit = (resolve: (v: boolean) => boolean) => {
  const text = confirm('关闭后子组件会得到这次弹窗的结果')
  resolve(text)
}
</script>
```
:::

弹窗表单一般在保存的时候需要先校验数据并发送保存请求，这样就可以用异步事件，先发送请求再根据结果
判断是否要关闭弹窗
