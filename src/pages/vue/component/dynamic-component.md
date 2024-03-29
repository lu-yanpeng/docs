# 动态组件 component

可以动态设置要显示的组件，可以用`<keep-alive>`缓存组件，这样每个组件都能保存自己的状态了。一般用来实现tab标签功能。

<script setup>
import DynamicComponent from '@/components/vue/component/dynamic-component/index.vue'
</script>

<DynamicComponent />


## component

`<component>`是vue提供的一个内置标签，传递`is`属性可以显示对应组件或html元素

要使用动态组件，需要先导入组件才行，导入后设置为`is`的值就能显示它了。

```vue
<script setup>
// 需要先导入要显示的组件
import MyButton from './my-button'
</script>

<template>
  <keep-alive>
<!--   这里会显示MyButton组件 -->
    <component :is="MyButton" />
  </keep-alive>
</template>
```

更常见的做法是通过一个对象的属性显示不同组件

```vue
<script setup>
import { ref } from 'vue' 
import A from './a.vue'
import B from './b.vue'
import C from './c.vue'

// 修改currentComp的值就能显示对应的组件
const currentComp = ref('A')
const comps = {A, B, C}
</script>

<template>
  <keep-alive>
    <component :is="comps[currentComp]" />
  </keep-alive>
</template>
```

字符串形式，传递一个html标签名，可以创建这个标签，比较少用。

```vue
<template>   
<!--  创建一个p标签 -->
  <component is="p" />
</template>
```

在选项式API里面注册过的组件可以通过传递组件名来显示，也就是传递字符串显示对应组件。这只有选项式API才支持，setup语法需要直接传递组件实例。
