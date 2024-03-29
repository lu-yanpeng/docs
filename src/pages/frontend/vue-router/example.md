# 示例

博客的路由设计

```js
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/index.vue')
    },
    {
      path: '/post',
      name: 'post',
      redirect: {name: 'postList'},
      component: () => import('@/views/post/index.vue'),
      children: [
        {
          path: '',
          name: 'postList',
          component: () => import('@/views/post/list.vue'),
        },
        {
          path: ':id(\\d+)',
          name: 'articleDetail',
          component: () => import('@/views/post/article.vue'),
          props: true
        }
      ]
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/index.vue')
    }
  ]
})

export default router
```

路由组件缓存

```vue
<template>
  <!--        注意，开发的时候设置过渡效果，会因为热更新导致页面渲染失败，路由跳转时页面空白，而且没有报错-->
  <!--        打包时可以正常显示过渡效果-->
  <!--        <transition mode="out-in">-->
  <router-view v-slot="{ Component }">
    <transition>
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<!-- 过渡效果，这里不能设置scoped否则不生效 -->
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