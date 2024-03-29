# props

> props一般被用来做父子组件的通信，也就是父组件给子组件传递数据。

组件可以声明`props`来接收参数，调用组件时传递这些参数，组件就能收到这些数据了。就像定义函数时设置形参一样，调用时需要传递实际的数据

```vue
// my-button.vue
<script setup>
// 接收id和name参数
defineProps(['id', 'name'])
</script>

// 调用时，直接在组件上用键值对的形式传递数据
<mu-button id="123" name="test" />
```


## 定义props

定义`props`就是定义组件要接收的参数。通过`defineProps`来声明要接收的参数，它在`setup`语法中自动可用不需要导入。并且接收到数据自动在模板中可用，
不接收返回值也行。

可以传递一个数组来表示要接收的参数

```js
// 接收id和name
defineProps(['id', 'name'])
```

更推荐以对象形式接收参数，[参考](https://cn.vuejs.org/guide/components/props.html#prop-validation)

```js
// 接收name，并且自动验证
defineProps({
  name: {
    type: String,
    default: '空字符串',
    required: false,
    validator(value) {
      return true
    }
  }
})
```

**注意**：如果数据类型是`object`比如对象和数组，`default`的值必须是一个getter

```js
defineProps({
  name: {
    type: Object,
    // 默认值设置为空对象  
    default: () => ({})
  }
})
```


## 传递数据

在组件上通过键值对的形式就能传递数据了

```vue
// 组件会收到name参数，值为字符串test
<my-button name="test" />
```

普通的键值对只能传递字符串数据，用`v-bind`绑定它就能传递表达式了

```vue
// 绑定属性后它的值自动变成表达式，这样可以传递对象和变量了
<my-button :name="'test'" :obj="{age: 18}" />
```

关于变量名，推荐传递的名称和组件定义的props保持一致，比如

```js
defineProps(['menuList', 'obj-name'])

// 组件怎么定义参数，调用时就怎么传递
<my-button :menuList="[]" obj-name="123" />
```

这样在debug时更方便找到问题，一般推荐全部用驼峰命名。

### 这里有个问题

在模板中使用ref的时候会被自动解包，也就是传递的时候会自动加上`.value`

```ts
const a = ref(0)

// 这里传递a，会被自动解包成a.value
<my-button :a="a" / >
```

像上面这种情况，子组件依然能保持响应式，按理说解包后传递的应该是数字0，不知道为什么还会保持响应式。
猜测应该是子组件的`defineProps()`自动跟这些传入的props保持了关联


## v-bind

可以直接使用`v-bind`不带参数的形式传递props，如果传递一个对象，他会被自动展开

```ts
const config = ref({
  id: 1,
  title: 'test'
})

// 因为顶层ref会被直接解包，所以这相当于 :id="config.id" :title="config.title"
<my-button v-bind="config" />
```

这对于需要一次传递多个props很有用，注意**不要**传递普通对象，因为它不会自动解包

```ts
// v-bind绑定它时里面的属性不会解包，传递的是一个ref对象
const config = {
  id: ref(1),
  title: ref('test')
}

// 子组件这样接收的时候编辑器会报错，因为传递的是一个Ref<number>。但实际上也能正常使用
defineProps<{
  id: number
  title: string
}>()
```


## 使用props

接收到的props可以直接在模板中使用，如果需要在setup里面用，就需要接收它的返回值了

```vue
<script setup>
// 需要接收返回值，一般都用props这个变量接收
const props = defineProps(['id'])
props.id
</script>

<template>
<!--  模板里面可以直接用接收到的值 -->
  <p>{{ id }}</p>
</template>
```

一般我们不会直接使用props，而是把他作为初始值，可以`watchEffect`监听它，用`computed`包装它，但是不要直接修改它的值。

```js
const props = defineProps(['id', 'name'])

watchEffect(() => {
    // 如果收到的数据符合某些条件才执行
    if (props.id) {}
})

// 给name加上前缀
const name = computed(() => {
    return props.name + '后缀'
})
```


## 单向数据流

直接修改props的值无法生效，而且控制台会打印出错误，但是数据是对象类型的话可以修改它内部的属性

```js
const props = defineProps({
    id: String,
    obj: Object
})
props.id = '123'  // 不能修改，控制台报错
props.obj.age = 18  // 可以修改，但是千万不要这么做
```

每个组件应该独立维护自己的状态，也就是子组件不要修改父组件的属性，如果到处乱改在debug的时候会变得非常困难。大多数时候都推荐用`pinia`解决组件通信问题，
也可以用自定义事件或依赖注入解决。
