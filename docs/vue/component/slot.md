# 插槽

可以传递一个模板给组件，然后在组件内部渲染它。插槽是一个很实用的功能，比如一个弹框组件，你可以自己传递弹框里面要显示的内容，这就是通过插槽实现的

## 定义插槽

使用`<slot>`标签定义插槽。一个插槽就是一个占位符，它会把传递过来的模板渲染在指定位置

```vue
<!-- my-title.vue -->
<template>
  <p>标题</p>
  <!-- 传递过来的模板会渲染在这个位置 -->
  <slot />
  <p>页脚</p>
</template>
```

## 传递内容

使用组件的时候可以在两个标签中间直接写模板，这些数据会直接传递到组件的`<slot>`位置进行渲染

```vue
<template>
  <my-title>
    <p>正文内容</p>
  </my-title>
</template>
```

## 默认内容

插槽可以设置默认内容，如果调用组件的时候没有传递内容，插槽的默认内容就会显示。如果调用的时候传递了内容，插槽的默认内容不会显示

```vue
<template>
  <slot>
    <p>调用时没有传递内容，这里就会显示</p>
  </slot>
</template>
```


## 具名插槽

组件可以设置多个插槽，这时候就需要给每个`<slot>`设置名字了。用`name`属性给每个`<slot>`设置名称，没有设置名称的会默认设置`default`作为名称，
表示它是默认的插槽。

```vue
<!-- my-title.vue -->
<template>
  <slot name="title" />
  <!-- 传递过来的模板会渲染在这个位置 -->
  <slot />
  <slot name="footer" />
</template>
```

使用的时候需要用`<template>`的`v-slot`指令指定要插入的位置

```vue
<template>
  <my-title>
    <template v-slot:title>标题</template>
    <!-- 没有指定要使用的插槽，会默认插入到 default 插槽的位置 -->
    <template>内容</template>
    <!-- v-slot的简写是 # -->
    <template #footer>页脚</template>
  </my-title>
</template>
```


## 作用域插槽

可以给`<slot>`传递一些数据，父组件在调用的时候就可以使用这些数据了，这就是作用域插槽

```vue
<!-- my-title.vue -->
<script setup>
const x = 10
const s = '测试'
const user = {name: 'zs', age: 18}
</script>

<template>
  <slot name="title" :x="x" :s="s" />
  <!-- 传递过来的模板会渲染在这个位置 -->
  <slot msg="测试数据" />
  <slot name="footer" :user="user" />
</template>
```

注意：`name`属性作为`<slot>`自带的属性，不会传递给外部

使用的时候只需要在`v-slot`后面用一个变量接收就行了，也可以解构它。这些数据都是从组件内部传递过来的

```vue
<template>
  <my-title>
    <template v-slot:title="{ x, s }">
      {{ x }} - {{ s }}
    </template>
    
    <template v-slot="msg">
      {{ msg.msg }}
    </template>
    
    <template v-slot:footer="{ user }">
      {{ user.name }} - {{ user.age }}
    </template>
  </my-title>
</template>
```
