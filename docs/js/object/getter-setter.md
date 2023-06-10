# 访问器属性

给对象定义访问器属性，从外部调用的时候看起来就像普通属性一样，但实际上调用的是函数。

```js
const user = {
    _name: 'zs',
    get name() {
        return this._name
    },
    set name(value) {
        this._name = value
    }
}
```

直接`console.log`打印user，就会看到name这个属性了，给user.name赋值`set name()`会调用，取值的时候`get name()`会调用。
这样的好处是，当我们想在获取属性的时候做一些其他事这样就很方便了

```js
const user = {
    count: 0,
    get name() {
        this.count += 1
        return 'zs'
    },
}
```

上面这个getter，在每次读取数据的时候都会计数，这样可以看到属性被读取了几次
