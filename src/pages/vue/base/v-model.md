# 双向绑定 v-model

双向绑定可以用来绑定`input`标签的value值，这样在input输入的时候就会同步修改绑定的值。

一个组件也可以用`v-model`。子组件创建一个`props`用来接收`v-model`传入的值。然后在需要的时候通过`emits`抛出`update:`事件，
父组件的v-model会自动更新绑定的这个值。这样其实就是子组件修改父组件的值的一种方式


## 原理

`v-model`就是一个语法糖，手动监听事件并更新绑定的值，也可以实现相同的功能。

父组件

```vue
<script setup lang="ts">
import { ref } from 'vue'
import Child from './child.vue'

const n = ref(0)

// 使用v-model的时候，vue就是在update:n的时候给绑定的值赋值的
const onUpdate = (v: number) => {
  n.value = v
}
</script>

<template>
<!--  <child v-model:n="n" />-->
  <child @update:n="onUpdate" :n="n" />
</template>
```

子组件`child.vue`。要注意，事件名必须是`update:`开头，否则父组件的`v-model`不会生效，因为它就是监听的`update:`+`v-model`的参数，
也就是监听`update:n`。

```vue
<script setup lang="ts">
import { ref } from 'vue'

withDefaults(
  defineProps<{
    n: number
  }>(),
  { n: 0 }
)
const emits = defineEmits<{
  // 这里的事件必须以update:开头，否则v-model不生效
  'update': [n: number]
}>()

const inputVal = ref(0)
const onChange = () => {
  emits('update:n', Number(inputVal.value))
}
</script>

<template>
  <div>
    <p>父组件 - {{ n }}</p>
    <input @change="onChange" v-model.number="inputVal" />
  </div>
</template>
```

## defineModel

3.4版本提供了更简单的`v-model`方法

```vue
<script setup lang="ts">
const show = defineModel('visible', { default: false })
</script>

<template>
  <a-modal v-model:visible="show"></a-modal>
</template>
```

这样只要`show`改变了它会自动改变父组件的值，这相当于之前的用法：

```vue
<script setup lang="ts">
  import { ref, watchPostEffect } from 'vue'

  const props = withDefaults(
      defineProps<{
        visible: boolean
      }>(),
      {
        visible: false
      }
  )
  const emits = defineEmits<{
    'update:visible': [visible: false]
  }>()
  
  const show = ref(props.visible)
  watchPostEffect(() => {
    // 打开对话框
    if (props.visible) {
      show.value = props.visible
    }
  })
  watchPostEffect(() => {
    // 关闭对话框
    if (!show.value) {
      emits('update:visible', false)
    }
  })
</script>

<template>
  <a-modal v-model:visible="show"> </a-modal>
</template>
```

可以看到确实省了很多代码