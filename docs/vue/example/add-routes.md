# 动态路由

这里用vue3和vite来实现动态路由，点击这里查看[效果](https://stackblitz.com/github/lu-yanpeng/vue-demo/tree/master/%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1?file=src%2Fcomponents%2Flayout.vue) [源码](https://github.com/lu-yanpeng/vue-demo/tree/master/%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1)


## 使用场景

在后台管理系统，可以根据登录用户的不同返回不同路由，页面也会根据这些路由生成对应的菜单。这样通过服务器就能控制一个用户可以访问的内容了。

比如管理员可以看到服务器日志，可以进行系统设置，普通用户就访问不了这些页面。



## 步骤

### 定义基础路由表

有一些路由不需要登录也能访问的，比如login和404页面，这些路由要提前在写好并加入到router中。

### 编写路由组件

所有的路由组件都要提前写好放到`/views`目录下

### 添加路由

定义`addRoute()`方法，在登录后获取服务器路由通过这个方法添加路由

### 生成菜单

路由的`meta`字段可以添加一些菜单相关的信息，比如菜单名、icon、排序之类的。遍历路由列表，根据meta的信息就能生成对应的菜单了



## 代码


### 服务器路由数据

这里模拟服务器返回的数据，为了方便只写了一条路由，看[源码](https://github.com/lu-yanpeng/vue-demo/blob/master/%E5%8A%A8%E6%80%81%E8%B7%AF%E7%94%B1/src/router/server_route.js)有更多示例。
meta的数据是自己定的，一定要跟后端对接好。

```js
[
    {
        path: '/user',
        component: 'DEFAULT_LAYOUT',
        meta: {menuName: '用户', order: 1},
        children: [
            {
                path: 'info',
                name: 'userInfo',
                component: 'user/info',
                meta: {menuName: '个人中心'}
            }
        ]
    }
]
```

**注意**
- 只支持二级路由，也就是子路由下**不能**再有子路由
- 每个一级路由至少有一个子路由，即使你只想展示一个菜单。因为父路由需要显示布局组件，子路由才是真正显示内容的地方。
- `component: 'DEFAULT_LAYOUT'`表示这个路由要使用的布局组件，需要提前定义好。
- `meta: {menuName: '用户', order: 1}`menuName表示这个菜单的名称，order表示菜单的排序，还可以添加其他内容，比如
只有一个子路由不想生成二级菜单，就可以设置`single: true`
- 子路由的`name`，必须设置这个字段，而且整个路由中不能重复，点击一个菜单时需要用它来导航
- 子路由的`component`表示路由组件的位置，需要提前在`/views`目录下把所有路由组件都写好。比如这里的`user/info`
实际会导入`import('@/views/user/info.vue')`。注意：路径之间必须用`/`隔开
- `meta: {menuName: '个人中心'}`子路由必须定义menuName，因为子路由会生成用户可以点击的菜单，没有名称的话就不会显示了


### 添加路由

假设现在登录成功，开始调用`addRoute()`方法添加路由，这个方法根据情况放在自己需要的地方，这里为了演示都放在一起了。

```js
// /components/layout.vue
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// 这个布局组件需要自己提前定义好
import DEFAULT_LAYOUT from '@/components/layout.vue'

const server_route = ref([])

const addRoute = async () => {
    // 如果本地没有路由信息，就从服务器获取
    if (!server_route.value.length) {
        // 这里模拟从服务器获取数据，实际需要从后端获取数据
        const { default: routes = [] } = await import('@/router/server_route')
        server_route.value = routes
    }

    // 把路由表的component字段转成真实的路由
    server_route.value.map((_route) => {
        if (_route.component === 'DEFAULT_LAYOUT') {
            _route.component = DEFAULT_LAYOUT
        }
        const children = _route.children
        // 根据字符串动态导入路由组件
        if (Array.isArray(children) && children?.length > 0) {
            children.map((childRoute) => {
                const path = childRoute.component.split('/')
                if (path.length === 1) {
                    childRoute.component = () => import(`@/views/${path}.vue`)
                } else {
                    childRoute.component = () => import(`@/views/${path[0]}/${path[1]}.vue`)
                }
            })
        }
    })

    // 排序
    server_route.value.sort((a, b) => (a?.meta?.order ?? 0) - (b?.meta?.order ?? 0))

    // 循环添加路由
    server_route.value.map((route) => router.addRoute(route))
}
```

从服务器获取到的数据会保存到`server_route`里面，实际开发应该保存到本地`localStorage`，否则刷新所有路由消失。

获取到数据还不能用，因为`component`字段还是字符串，要转成懒加载的形式导入组件才行。

```js
server_route.value.map((_route) => {
        if (_route.component === 'DEFAULT_LAYOUT') {
            _route.component = DEFAULT_LAYOUT
        }
        const children = _route.children
        // 根据字符串动态导入路由组件
        if (Array.isArray(children) && children?.length > 0) {
            children.map((childRoute) => {
                const path = childRoute.component.split('/')
                if (path.length === 1) {
                    childRoute.component = () => import(`@/views/${path[0]}.vue`)
                } else {
                    childRoute.component = () => import(`@/views/${path[0]}/${path[1]}.vue`)
                }
            })
        }
    })
```

因为父组件的`布局`组件比较少，一般不用做懒加载全部导入进来，根据字符串选择对应的布局就行了。

子组件需要动态的导入。[vite](https://cn.vitejs.dev/guide/features.html#dynamic-import)提供了根据变量动态导入模块的方法。

如果`component: 'user/info'`
- 先`const path = childRoute.component.split('/')`拆分一下路径，这时候`path = ['user', 'info']`
- 因为`import()`根据变量导入只能深入一层文件，如果直接导入`user/info`，这样会报错，需要先拆分然后再拼起来
- 然后根据path动态导入路由，并赋值给子路由的`component`字段。需要保证`/views`目录下有这样的组件
```js
// 路径必须以绝对路径，相对路径或@开头，文件名结尾，vite官网有说明
// 不符合的话导入报错
childRoute.component = () => import(`@/views/${path[0]}/${path[1]}.vue`)
```

如果`component: 'welcome'`
- 这时候组件的路径就等于`path = ['welcome']`
- 然后动态导入
```js
childRoute.component = () => import(`@/views/${path[0]}.vue`)
```

上面的代码默认子路由下面没有子路由了，如果有很多级路由的话，需要做更多的判断。

经过转换已经把`component`转成真正的组件了，转换后的`server_route`

```js
import DEFAULT_LAYOUT from '@/components/layout.vue'

server_route.value = [
    {
        path: '/user',
        component: DEFAULT_LAYOUT,
        meta: {menuName: '用户', order: 1},
        children: [
            {
                path: 'info',
                name: 'userInfo',
                component: () => import('@/views/user/info.vue'),
                meta: {menuName: '个人中心'}
            }
        ]
    }
]
```

这样再排序一下然后就可以直接添加到router里面了

```js
import { useRouter } from 'vue-router'
const router = useRouter()
// 排序
server_route.value.sort((a, b) => (a?.meta?.order ?? 0) - (b?.meta?.order ?? 0))
// 遍历转换好的路由表，添加路由
server_route.value.map((_route) => router.addRoute(_route))
```


### 生成菜单

有了路由数据，下面可以生成菜单了，这里只对`server_route`服务器返回的数据生成菜单，本地定义的路由不会添加到菜单里面

```vue
<!-- /components/layout.vue -->
<template>
  <div>
    <nav>
      <h1>菜单栏</h1>

      <div style="display: flex; gap: 50px; align-items: flex-end;">
        <template v-for="menu in server_route">
          <!--        显示多级菜单-->
          <div v-if="!menu.meta.single">
            <h5>{{ menu.meta.menuName }}</h5>
            <button
                v-for="child in menu.children"
                @click="router.push({name: child.name})">
              {{ child.meta.menuName }}
            </button>
          </div>

          <!--        只显示一级菜单-->
          <div v-else>
            <button @click="router.push({name: menu.children[0].name})">{{ menu.children[0].meta.menuName }}</button>
          </div>
        </template>
      </div>
    </nav>

    <hr>
    <button v-show="needAddRoutes" @click="login">模拟登录获取路由</button>

    <main>
      <router-view />
    </main>
  </div>
</template>
```

上面的代码只是演示，实际开发应该定义一个单独的`layout-aside`组件专门渲染菜单。



## 总结

动态添加路由只要提前定义好服务器数据，约定好格式，做起来还是很简单的。只要能根据`component`字段正确的导入组件就没什么大问题，
不过这只是一个简单的示例，实际开发还是有很多情况要处理的。
