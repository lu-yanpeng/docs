# 指令

**语法**：`指令:参数.修饰符="表达式"`

```vue
// 比如
<p v-on.stop="onClick"></p>
```

## v-bind

可以绑定标签原生属性或组件的props，动态修改他们的值，比如动态的给元素设置样式，给组件传递props。它的缩写是`:`它是最常用的写法

```vue
<script setup>
import { ref } from 'vue'
const test = ref('1')
</script>

<template>
<!-- 动态绑定id的值 -->
  <p :id="test"></p>
<!-- 给组件传递name参数 -->
  <my-button :name="'test'" / >
</template>
```

如果不传递要绑定的属性，就可以绑定一个对象上的所有属性

```vue
<!-- 对象所有属性都会绑定到p标签上 -->
<p v-bind="{id: '1', style: {color: 'red'}}"></p>
```

动态绑定属性，可以用一个变量动态设置要绑定的属性

```vue
<!-- 要绑定的属性根据key来改变 -->
<p :[key]="test"></p>
```


## v-html

可以把变量渲染成html标签

```vue
<script setup>
const raw = '<p>txt</p>'
</script>

<template>
  <div v-html="raw"></div>
<!--  会渲染成下面这样-->
  <div>
    <p>txt</p>
  </div>
</template>
```
