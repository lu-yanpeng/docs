# 模板引用

可以通过特殊的`ref`属性获得一个元素或组件的实例，通过这个实例可以完全控制组件。

## 获取实例

为组件或普通元素设置`ref`属性，然后定义一个**同名**的ref，这样在元素被挂载的时候，这个ref会自动赋值成元素的实例。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import MyButton from './my-button.vue'

// 元素被挂载后，这里就能访问到实例了
const divRef = ref<HTMLDivElement | null>(null)
const buttonRef = ref<InstanceType<typeof MyButton> | null>(null)
</script>

<template>
  <div ref="divRef"></div>
  <my-button ref="buttonRef">按钮</my-button>
</template>
```

在vue3.5中，可以用`useTemplateRef`来获取组件实例

```vue
<script setup lang="ts">
import { useTemplateRef } from 'vue'
import MyButton from './my-button.vue'

const myButtonRef = useTemplateRef<InstanceType<typeof MyButton> | null>('myButtonRef')
</script>

<template>
  <my-button ref="myButtonRef">按钮</my-button>
</template>
```

## 导出属性

在`setup`定义的组件中，如果不手动导出属性，组件实例上就访问不到任何属性，通过`defineExpose`来导出外部可以使用的属性

```vue
<script setup lang="ts">
import { ref } from 'vue'

const name = ref('zs')
const open = () => {}
// 只有在这里导出的属性，外部才能访问
defineExpose({
  name,
  open
})
</script>
```

## v-if

要注意，在使用`v-if`的时候，只要条件不成立，实例会被赋值成null，即使组件被缓存也不行。

只有当调成成立，并且组件被挂载之后才能获取到组件实例。

```vue
<script setup lang="ts">
import { inject, ref, watch } from 'vue'
import type { Ref } from 'vue'
import MyForm from './my-form.vue'

const actionsType = inject('actionsType') as Ref<'add' | null>

const myFormRef = ref<InstanceType<typeof MyForm> | null>(null)
const myFormRef2 = ref<InstanceType<typeof MyForm> | null>(null)

watch(() => myFormRef.value, () => {
  console.log('表单实例', myFormRef.value, myFormRef2.value,)
})

const comps = {
  add: MyForm,
}
</script>

<template>
<!-- 这里必须要条件成立，组件被挂载后才能访问到实例，否则会一直是null -->
  <keep-alive>
    <component ref="myFormRef2" :is="comps[actionsType] ?? null" />
  </keep-alive>
  
  <keep-alive>
    <my-form ref="myFormRef" v-if="actionsType === 'add'" />
  </keep-alive>
</template>
```

## 类型标注

因为导入一个组件其实就是导入一个对象，可以用`typeof`获取到组件的类型，在`InstanceType`就能获取到他的实例了。很多第三方组件库
都有现成的组件实例，直接导入就能用。

要定义普通元素的类型，可以到[MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Element/div)查询这个元素继承的哪个DOM接口，
写上对应的接口就行。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import MyForm from './my-form.vue'

const myFormRef = ref<InstanceType<typeof MyForm> | null>(null)
const divRef = ref<HTMLDivElement | null>(null)
</script>

<template>
  <my-form ref="myFormRef" />
  <div ref="divRef"></div>
</template>
```