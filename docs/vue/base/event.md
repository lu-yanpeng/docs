# 事件处理

用`v-on`可以监听一个标签的事件，只需要传递要监听的事件名，并设置处理函数就行了。这里只讲监听html标签事件，监听组件事件看[这里](../component/event)。

```vue
<button @click="count++">{{ count }}</button>
<input type="text" @blur="test">
```

## 处理函数

用来处理事件的函数，一般会以`on`开头，用来和其他方法做区分，如果在模板中没有给他传递参数，它默认会收到`event`作为第一个参数，这个参数是DOM原生事件参数。

```vue
<script setup>
// event会自动传递
const onTest = (event) => {
  // 可以通过event获取到原生的标签对象
  console.log(event.target)
}
</script>

<template>
  <button @click="onTest">按钮</button>
</template>
```

上面只传递了`onTest`函数但是没有调用，vue会在触发事件的时候自动调用并传递`event`作为第一个参数。
不同事件的`event`对象可能不同，这里有一个[参考](https://developer.mozilla.org/zh-CN/docs/Web/API/Event)。最好是打印一下看它都有哪些属性。


### 传递参数

要给处理函数传递参数，可以在模板中手动调用它，并传入参数。如果手动调用的话`event`对象就需要自己传递了

```vue
<script setup>
const onTest = (args, event) => {
  console.log(event.target)
}
</script>

<template>
<!-- $event只在模板中可用，表示当前事件的event对象 -->
  <button @click="onTest('123', $event)">按钮</button>
</template>
```

在括号里面传入参数，如果要传递`event`对象，可以用`$event`这个特殊的属性。


## 事件表达式

有时候要处理的事件比较简单，用一个表达式就能解决

```vue
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
<!-- 记录按钮额点击次数 -->
  <button @click="count++">{{ count }}</button>
</template>
```

对于这样简单的需求可以直接写一个表达式，事件触发的时候vue会自动执行它。


## 修饰符

有时候需要阻止事件冒泡或者标签的默认行为，比如表单自动提交之类的。这时候就可以用修饰符了，这里建议看[官网](https://cn.vuejs.org/guide/essentials/event-handling.html#event-modifiers)

```vue
<button @click.stop="count++">{{ count }}</button>
```
