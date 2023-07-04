# 成员检测

检查一个对象是否拥有某个属性，这就是成员检测。


## in

可以用`in`关键字来检测对象是否拥有某个属性，如果属性存在返回true，否则返回false。它还会检查原型链上是否存在属性，如果只想看它本身的属性可以用`Object.hasOwn()`

```js
const user = {name: 'zs'}

'name' in user  // true
'toString' in user // true，原型上的属性也会被检测到
'age' in user  // false
```

它还可以检测数组，检测数组的下标是否存在，也会检测到原型链上的属性。

```js
const list = ['a', 'b', 'c']

0 in list  // true
'a' in list  // false,这里检查的是下标，不是元素值
'toString' in list  // true,原型链上的属性会被检测到
```


## Object.hasOwn()

这个方法只会检查对象自身的属性，不会查找原型链。大多数时候你可能需要的是这个方法

语法：`Object.hasOwn(obj, name)` [参考](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)

```js
const user = {name: 'zs'}

Object.hasOwn(user, 'name')  // true
Object.hasOwn(user, 'age')  // false
Object.hasOwn(user, 'toString') // false，不会查找原型链
```

