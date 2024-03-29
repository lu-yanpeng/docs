# 样式

组件样式通过`<style>`标签设置，在这里写样式就和写普通`css`一样。

```html
<style>
.test {font-size: 20px;}
</style>
```


## 作用域 scoped

设置`scoped`属性，这个组件的样式就只会影响它本身，不会影响到其他组件。

```html
<div class="wrap">
    <p class="txt">一段文字</p>
</div>

<style scoped>
.wrap .txt {font-size: 20px;}
</style>
```

上面的代码经过`PostCSS`转换后会自动通过属性选择器设置样式，每个组件的属性各不相同，所以样式只会在当前组件生效。

```html
<div class="wrap" data-v-123>
    <p class="txt" data-v-123>一段文字</p>
</div>

<style scoped>
.wrap .txt[data-v-123] {font-size: 20px;}
</style>
```

`data-v-f5fa9577`就是vue自动加上的随机属性，同一个组件内的这个属性相同，不同组件的都不同。标签只有设置`class`属性的时候才会生成这个属性，不设置就没有。


## 模块 modules

可以给`<style>`标签加上`modules`属性，这个样式会变成一个模块，就像js模块一样，在当前组件中使用的时候需要通过`$style`来调用。这个用法在vue中比较少见，`react`都是这样使用样式的。

```vue
<template>
  <p :class="$style.red"></p>
</template>

<style module>
.red {color: red;}
</style>
```


## 子元素根节点

父组件样式不会影响到子组件内部的样式，但是会影响到根节点，这样方便在父组件调整子组件的布局，比如定位相关的属性。

```vue
// layout.vue
<template>
  <div data-v-123 class="layout">
    <p>父组件</p>
    
    <layout-aside class="test" />
  </div>
</template>

<style scoped>
.layout {}
.test {}
</style>

// layout-aside.vue 根节点会自动设置和父节点相同的data-v属性
<template>
  <div data-v-123 data-v-abc class="layout-aside test">
    <p>子组件</p>
  </div>
</template>

<style scoped>
</style>
```

上面的代码给`layout-aside`组件设置了`class`它会自动把`test`样式合并到子组件的根节点上，并且设置一个和父节点相同的data-v属性。
这样父节点的`test`样式就能作用到根节点上了。因为子组件也设置了`<style scoped>`所以它也有自己的data-v属性，这样就会出现两个data-v的情况。


## 深度选择器 :deep()

想要在父组件修改子组件内部的样式，可以通过`:deep()`来设置。注意：它只在vue3可用

```vue
<!-- 设置子组件内部样式 --> 
<child class="test"/>

<style scoped>
.test .wrap .txt {color: red;}
</style>

<!-- 会转成 -->
<style scoped>
.test .wrap .txt[data-v-123] {color: red;}
</style>
```

因为父组件的data-v和子组件不同，所以这里在父组件设置的样式就不能选中子组件的`.txt`类。可以用`:deep()`来解决

```vue
<!-- 给子组件样式加上:deep -->
<style scoped>
:deep(.test) .wrap .txt {color: red;}
</style>

<!-- 上面代码会转成 -->
<style scoped>
[data-v-123] .test .wrap .txt {color: red;}
</style>
```

加上`:deep()`就不会在最后一个类名上设置属性选择器了，而是在`:deep`前一个类名设置属性选择器，这样就能正常选中子组件下的所有样式了。


## 样式 v-bind()

组件也可以动态修改组件样式

```vue
<script setup>
const color = ref('red')
</script>

<template>
  <p class="title">一段文字</p>
</template>

<style scoped>
.title {
  color: v-bind('color')
}
</style>
```

在setup里面设置的变量可以用到样式里面，通过`v-bind()`调用就行了，注意：需要传入变量的字符串名称。



## 样式不生效？

### 弹窗组件

很多第三方弹窗组件会把弹出来的窗口挂载到`body`下面，这样设置的样式就不能选中它了，一般组件会提供接口可以把它挂载到其他地方，把它挂载到父组件上就能修改样式了。
