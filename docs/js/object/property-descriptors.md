# 描述符对象和属性标志

一个对象的属性默认是可修改可删除的，我们可以通过修改属性标志让他变得不可修改。[参考](https://zh.javascript.info/property-descriptors)


## 描述符对象

通过`Object.getOwnPropertyDescriptor`方法可以获取一个属性的描述符，它是属性标志组成的一个对象，所以又叫描述符对象。一般情况下很少说描述符对象，
都是直接说获取标志。

```js
const user = {name: 'zs'}
const descriptor = Object.getOwnPropertyDescriptor(user, 'name')
console.log(descriptor)  // 返回的值就是name属性的描述符对象
/*
{
    "value": "zs",
    "writable": true,
    "enumerable": true,
    "configurable": true
}
*/
```

`Object.getOwnPropertyDescriptor`第一个参数是一个对象，第二个参数是要获取描述符的属性名，返回值就是描述符对象，这个
对象包含了当前属性的所有标志。虽然可以修改这个对象，但是并不会影响到原来的属性。修改标志需要用到`Object.defineProperty`


## 属性标志

直接打印描述符对象就可以看到一个属性的所有标志了，这些属性默认都是true
- value 属性值
- writable 可写
- enumerable 可枚举/遍历
- configurable 可配置/删除

对于访问器属性还有
- set
- get


## 修改标志

`Object.defineProperty`可以修改一个属性的标志，如果这个属性不存在会创建它。第一个参数是要修改的对象，第二个参数是属性名，第三个参数是描述符对象。

```js
const user = {name: 'zs'}
// 更新name属性的标志，其他标志保持不变
Object.defineProperty(user, 'name', {
  writable: false
})

// user没有age属性，所以这里会创建age，设置value标志，没有设置的标志默认为false
Object.defineProperty(user, 'age', {
  value: 18
})
```

注意：如果是`defineProperty`新建的属性，没有提供的标志默认会设置false


## 只读

要让一个属性只读，可以设置属性的`writable`为`false`

```js
const user = {name: 'zs'}
Object.defineProperty(user, 'name', {
  writable: false
})
console.log(Object.getOwnPropertyDescriptor(user, 'name'))
user.name = '123'  // 严格模式下会报错
console.log(user)
```

在严格模式下修改一个只读属性会报错，普通模式虽然报错但是修改也不会成功


## 不可枚举/遍历

使用`for...in`遍历对象会获取到所有可枚举的属性，如果一个属性的`enumerable`为`false`它就不会出现在循环中

```js
const user = {name: 'zs', age: 18}
Object.defineProperty(user, 'age', {
  enumerable: false
})
// 这里只会打印name
for (const key in user) {
  console.log(key)
}
```

这些方法会根据可枚举标志返回数据，`Object.entries()`、`Object.keys()`、`Object.values()`


## 不可删除

修改`configurable`标志，这个属性就不能删除而且也不能修改其他标志（可以修改writable为false）

```js
const user = {name: 'zs'}
Object.defineProperty(user, 'name', {
  configurable: false
})

delete user.name  // 无法删除属性
// 报错，name属性不可配置
Object.defineProperty(user, 'name', {
  enumerable: false
})
```

特殊情况，设置`configurable: false`的时候可以设置`writable: false`但是不能从false设置为true

```js
const user = {name: 'zs'}
Object.defineProperty(user, 'name', {
  configurable: false
})

// 可以设置为false
Object.defineProperty(user, 'name', {
  writable: false
})
// 从false改成true会报错
Object.defineProperty(user, 'name', {
  writable: true
})
```
