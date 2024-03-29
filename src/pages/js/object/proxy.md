# 代理

参考：[现代js](https://zh.javascript.info/proxy)

`Proxy`可以代理一个对象，并返回一个新的代理对象，通过代理对象间接的操作原始对象，其中就可以穿插一些其他的功能。
也就是自己定义怎样获取一个对象的属性，和getter、setter差不多，vue3的响应式数据就是通过代理实现的

语法

```js
const proxy = new Proxy(对象, 配置对象)
```

配置对象里面是要捕捉的操作，不能乱填，在这里有一些常用[操作](https://zh.javascript.info/proxy#proxy)。
一般会捕捉`get`和`set`操作。其他的操作比如删除属性，遍历对象等都可以捕获。

```js
const proxyUser = new Proxy(user, {
    // 读取user属性时这个方法会调用
    get(target, p, receiver) {
        return Reflect.get(target, p, receiver)
    },
    // 设置属性时这个方法调用
    set(target, p, newValue, receiver) {
        return Reflect.set(target, p, newValue, receiver)
    }
})
```

获取`proxyUser`的属性时`get`方法会调用，因为它捕获了这个操作，然后使用`Reflect.get`调用原始`user`对象的对应属性并返回。
