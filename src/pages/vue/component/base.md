# 组件基础

一个`.vue`文件就是一个组件，这样单独一个文件组成的组件叫[单文件组件](https://cn.vuejs.org/guide/scaling-up/sfc.html)，它由3部分组成
`<template>`、`<script>` 和 `<style>`。特殊情况下`script`和`style`标签可以写多个，比如`setup`语法下就可以再写一个普通的`script`。

组件的好处
- 每个组件都能保存自己的状态，组件的ref和其他组件互不干扰，样式也只会影响本组件。
- 逻辑清晰，不用组件也可以实现功能，但是很多代码都放在一起会显得很乱，一般不建议代码超过500行，代码太多了就可以拆分成组件单独管理。

要注意的地方
- 组件需要编译，拆分很多组件的话会导致加载变慢


## 使用组件

导入一个组件就可以直接用导入名作为标签名使用组件了，`setup`语法下这个导入的组件自动在模板中可用，一般建议用单标签形式使用组件。

要注意导入的文件必须以`.vue`结尾，否则报错找不到文件，因为在js中只有导入js文件可以省略后缀，导入其他文件必须加后缀作为区分

```vue
<script setup>
// 正确的导入
import MyButton from './my-button.vue'

// 错误的导入，会显示找不到文件，必须要以.vue结尾
// import MyButton from './my-button'
</script>

<template>
  <my-button />
</template>
```

全局导入，比较少用。导入后组件在整个应用范围都能直接使用。


关于命名
- 组件文件推荐`-`命名法，这样文件格式更统一。`my-button.vue`
- 导入名推荐驼峰法，并且首字母大写。`import MyButton from './my-button.vue'`
- 模板中使用`-`来调用组件，因为这样更符合html的原生写法。`<my-button />`
