# 模板

模板是最终呈现在页面上的内容，模板怎么写页面就怎么显示在组件里面模板就是写在`<template>`标签里面的内容，写起来就像写普通的html一样，
并且可以用响应式数据让页面动态变化，也可以用vue指令执行一些特殊操作，比如给元素绑定事件。

模板有一些特殊语法，下面开始介绍


## 插值语法

在<span v-pre>`{{ }}`</span>双花括号里面写入一个表达式，它的值会变成字符串渲染出来，下面的内容就会变成`p`标签包括`msg`的值。

```vue
<template>
  <p>{{ msg }}</p>
</template>
```

::: details 什么是表达式
有返回值的操作语句就是表达式，比如

```js
// 三元运行
age? 0: 1
// 调用一个函数
fn()

if (flag) {
    // if语句没有返回值，它就不是表达式
}
// 赋值语句也不是
const a = 0
```
:::

表达式会经过`toString()`方法的转化，所以最终显示的都是字符串，下面的代码直接渲染一个函数，显示的就是函数本身的代码。

```vue
<script setup>
const fn = () => {
  return 123
}
</script>

<template>
  <!-- 会显示 () => { return 123 } -->
  <p>{{ fn }}</p>
</template>
```

在插值语法中有一些全局函数是可以直接调用的，具体有哪些可以看[这里](https://cn.vuejs.org/guide/essentials/template-syntax.html#using-javascript-expressions)

```vue
<template>
  <!-- 可以直接使用全局函数Math，不需要额外操作 -->
  <p>{{ Math.random() }}</p>
</template>
```


## 指令

模板中可以使用vue指令，下面的代码用`v-on`指令给`p`标签绑定了点击事件

```vue
<template>
  <p @click="onClick">{{ msg }}</p>
</template>
```


## 组件调用

导入组件之后可以在模板中通过导入名调用组件，会在当前位置生成组件对应的模板

```vue
<script setup>
import Login from '@/views/login.vue'
</script>

<template>
  <login />
</template>
```
