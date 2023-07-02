# 路由传参

在路由跳转时可以给路由组件传递一些参数，用的比较多的方法时路径参数和查询参数。

## 路径参数

路由组件可以接收url路径参数，只需要设置`props: true`

```js
const route = {
  // 因为path必须是一个字符串不能输入正则字符串，所以这里的\d要转义成普通字符串
  path: '/:id(\\d+)',
  name: 'articleDetail',
  component: () => import('@/views/post/article.vue'),
  props: true
}
```

上面设置了`props: true`组件就会收到同名的props，所以要在组件里面接收这个值

```js
// 接收路由传递过来的路径参数，这里必须和url上的参数同名
defineProps(['id'])
```

如果要根据路径参数做出响应，可以用`watchEffect`监听props

```js
watchEffect(async () => {
  // 这里会自动监听props.id
  const { data } = await getOneArticle(props.id)
})
```

`onBeforeRouteUpdate()`钩子只能在相同路由下跳转时候才能触发，比如从`/post/1`跳转到`/post/2`他是从`article.vue`跳转到`article.vue`，
用的是同一个组件会触发这个钩子。如果是从`/post`跳转到`/post/1`就是从`post.vue`跳转到`article.vue`是从一个组件跳转到另一个组件，这样就不会触发`onBeforeRouteUpdate`


## 查询参数

路由跳转的时候可以传递查询参数`query`

```js
router.push({name: 'post', query: {a: '123'}})
```

组件通过`route`对象可以获取到`query`的数据

```js
import { useRoute } from 'vue-router'

const route = useRoute()
// 这样可以获取到当前路由的查询参数
route.query
```


## 元数据

在创建路由的时候可以传递`meta`字段，在里面写入一些数据。这个参数一般会用在导航守卫上，比如根据meta判断一个路由是否需要登录才能访问。

```js
const route = {
  path: '/',
  component: () => import('@/views/home.vue'), 
  meta: {required: true}
}
```

通过`route`对象可以访问这个数据

```js
import { useRoute } from 'vue-router'

const route = useRoute()
// 这样可以获取到当前路由的查询参数
route.meta
```

它只能在创建路由的时候传递，不能在路由跳转的时候传递

```js
// 这样传递meta，在路由组件里面收到不数据
router.push({name: 'home', meta: {test: '123'}})
```
