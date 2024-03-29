# 绑定样式

可以用`v-bind`指令给标签或组件绑定样式，这样可以动态设置样式，在符合条件时才设置样式，还可以同时设置多个样式。比如点击的时候给元素设置激活样式`.active`

## 绑定 class

绑定的`:class`会和元素本身的class合并在一起

### 对象写法

给class绑定一个对象，只要对象的某个属性值为`true`这个属性名就会变成类名加到`class`里面。属性值变化的时候`class`也会动态的变化

```vue
<script setup>
import { ref } from 'vue'
const flag = ref(true)
</script>

<template>
  <p class="txt" :class="{active: flag}"></p>
</template>
```

上面的代码，会渲染出这样的标签`<p class="txt active"></p>`，如果`flag`变成`false`了class也会自动更新，也就是变成这样`class="txt"`

如果需要使用`-`短横线的写法设置类名，可以把对象属性名放在`''`里面，或者首字母大写也可以

```html
<p :class="{'text-color': true}"></p>
<p :class="{textColor: true}"></p>
```

也可以通过计算属性返回一个样式对象。


### 数组写法

也可以是一个都是类名的数组，数组里面放对象的话会自动解包

```vue
<script setup>
import { ref } from 'vue'
// 数组里面可以放对象和字符串
const testClass = ref([{active: true, textColor: true}, 'demo'])
</script>

<template>
  <p :class="testClass"></p>
</template>
```

上面的代码会渲染成`<p class="active text-color demo"></p>`


## 组件绑定 class

也可以给一个组件绑定class，但是要注意，他只会绑定到根标签上，也就是无法修改组件内部的代码


```vue
<my-button class="demo" :class="{active: true}" />
```

上面给`<my-button />`组件设置了`demo active`类，不过只会在根元素上生效，修改内部样式需要用到`:deep()`


## 绑定 style

绑定`style`和绑定class类似，不同的是它需要直接指定某个样式的值，而不是设置类名

### 对象写法

```vue
<script setup>
// 设置元素的color和font-size样式
const myStyle = {
  color: 'red',
  fontSize: '20px'
}
</script>
<template>
  <p :style="myStyle"></p>
  <p :style="{position: 'relative', 'line-height': 1.2}"></p>
</template>
```

数组写法和class相同
