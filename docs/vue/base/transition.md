# 过渡效果

[参考](https://cn.vuejs.org/guide/built-ins/transition.html)

内置的`<transition>`组件可以实现过渡效果，可以用在动态组件或路由组件上，当路由切换时会触发过渡效果。

```vue
<template>
  <router-view v-slot="{ Component }">
    <!--        注意，开发的时候设置过渡效果，会因为热更新导致页面渲染失败，路由跳转时页面空白，而且没有报错-->
    <!--        打包时可以正常显示过渡效果-->
    <!--        <transition mode="out-in">-->
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<style>
.v-enter-active,
.v-leave-active {
  transition: opacity 150ms ease-out;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
```

目前在开发阶段最好不要设置过渡，组件热更新的时候会有问题。过渡的样式需要设置在全局，否则可能不生效。
