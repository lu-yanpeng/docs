# 嵌套路由

一个组件里面可以通过`<router-view />`来显示其他组件，可以通过不同的url显示不同的内容。一个组件嵌套另一个组件还可以通过路由来导航，这就是嵌套路由。

这两个路径`/user/id`和`/user/name`，user路径下又有其他路径，他们相同的部分放在`User.vue`组件里面，不同的部分通过`<router-view />`分别显示。

路由：

```js
const routes = [
  {
    path: '/user',
    component: User,
    children: [
      { path: 'id', component: Id },
      { path: 'name', component: Name },
    ]
  }
]
```

`User.vue`

```vue
<template>
  <div>
    <p>这是user组件的内容</p>
    <router-view />
  </div>
</template>
```

匹配到这个路由时`/user/id`会先显示`User.vue`然后再显示它里面的`<router-view />`，也就是`Id.vue`

上面的路由有一个问题，直接访问`/user`的时候只会显示`User.vue`的内容，因为没有合适的子路由匹配到，如果想在空路径下也显示一些内容，可以这样做：

```js
const routes = [
  {
    path: '/user',
    component: User,
    children: [
      // ...其他路由
      { path: '', component: Cmp }
    ]
  }
]
```

这样直接访问`/user`的时候就会匹配到`path: ''`就可以显示`Cmp`组件里面的内容了。