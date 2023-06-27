# 过渡效果

::: tip
注意：当前版本开发模式下设置过渡效果`<transition mode="out-in">`会导出路由组件加载不出来而且没有报错，路由跳转的时候会
显示空白页面。请看：[7121](https://github.com/vuejs/core/issues/7121) [108](https://github.com/HalseySpicy/Geeker-Admin/issues/108)。

原因就是开发时候组件重新渲染导致这个问题，比如异步加载渲染页面。打包之后可以正常显示过渡，建议开发时候先不要设置过渡。
:::


```vue
<template>
  <router-view v-slot="{ Component }">
    <!--        注意，开发的时候设置过渡效果，会因为热更新导致页面渲染失败，路由跳转时页面空白，而且没有报错-->
    <!--        打包时可以正常显示过渡效果，必须要设置mode，不然上个组件还没消失就出现下一个组件了，他们会叠在一起-->
    <transition mode="out-in">
      <!--        <transition>-->
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>
```

```css
.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}
.v-enter-from,
.v-leave-to {
  opacity: 0;
}
```