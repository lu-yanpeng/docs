# 指令

**语法**：`指令:参数.修饰符="表达式"`

```vue
// 比如
<p v-on.stop="onClick"></p>
```

## v-bind

可以绑定标签原生属性或组件的props，动态修改他们的值，比如动态的给元素设置样式，给组件传递props。它的缩写是`:`它是最常用的写法，
只要加上`v-bingd`这个属性的值就可以写成一个表达式了，这样可以设置更丰富的值。

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



## v-if

`v-if`根据表达式的值动态渲染这块内容，在渲染前这块内容都不会出现在页面上，也就是在调试页面上找不到这块内容，它还没生成，表达式为true才会插入这块内容。

这个指令一般用在只渲染一次的情况，也就是只需要显示一次，如果需要经常切换显示隐藏，你可能需要`v-show`

```vue
<!-- show为true才会渲染这个div以及它里面的其他元素 -->
<div v-if="show"></div>
```

`v-if`可以和`v-else-if`和`v-else`一起用，就像普通的if语句一样

```vue
<div v-if="show"></div>
<div v-else-if="name === 'test'"></div>
<div v-else></div>
```

`v-if`可以用在`<template>`上，表示动态渲染`<template>`里面的内容但是`<template>`本身不会生成一个标签，这样做不会显示多余的标签

```vue
<template v-if="show">
</template>
```

组件上也可以设置`v-if`，如果你需要这样做，你可能真正需要的是动态组件`<component>`

```vue
<my-button v-if="show" />
```


## v-show

动态显示一块内容，表达式为`false`时，会给元素设置`style="display: none;"`，需要频繁显示或隐藏元素就用这个指令。

```vue
<div v-show="show"></div>
```

它不能设置在`template`标签上，因为它不能设置样式，只能设置在确切的html标签上。



## v-on

给元素或组件绑定事件监听器，简写`@`。它的参数是要监听的事件名称，值是处理这个事件的函数或表达式。所有可监听的标签事件在[这里](https://developer.mozilla.org/zh-CN/docs/Web/API/Element)（向下滑找到事件菜单）
也可以搜索这个标签看看有哪些事件可以监听

```vue
<template>
  <button @click="count++"></button>
  <input @blur="test"/>
  <layout-aside @change-header="test" />
</template>
```

事件监听可能会用到一些事件修饰符，具体可以在[官网](https://cn.vuejs.org/api/built-in-directives.html#v-on)查看

更多用法请看标签[事件处理](./event)，[自定义事件](../component/event)



