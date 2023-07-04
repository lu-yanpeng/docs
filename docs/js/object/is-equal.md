# 判断两个对象是否相等

我们一般认为两个对象有相同的属性并且值都一样，那他们就是相等的。但是js并不能直接用`===`判断对象是否相等

```js
console.log({a: 1} === {a: 1})  // false
console.log([1, 2] === [1, 2])  // false
```

因为`===`判断的是内存地址是否相同，所以上面的对象和数组，虽然数据都是一样的但是对象的内存地址不一样，比较的话就为`false`

```js
const a = {a: 1}
const b = a
console.log(a === b)  // true
console.log(Object.is(a, b))  // true
```

如果两个对象都指向同一个对象，他们地址相同，这样用`===`判断就会为true


## shallowEqual

浅检测，只能检测对象里面都是普通类型的情况

```js
// 浅检测
const shallowEqual = (obj1, obj2) => {
  if (Object.is(obj1, obj2)) {
    return true
  }
  if (typeof obj1 !== 'object' || Object.is(obj1, null) || typeof obj2 !== 'object' || Object.is(obj2, null)) {
    return false
  }

  const map1 = new Map(Object.entries(obj1))
  const map2 = new Map(Object.entries(obj2))
  if (map1.size !== map2.size) {
    return false
  }

  for (const [key, value] of map1) {
    if (!map2.has(key) || value !== map2.get(key)) {
      return false
    }
  }
  return true
}

const a = {a: 1}
const b = {a: 1}
console.log(shallowEqual(a, b))
```



## deepEqual

深度检测对象是否相同，遇到对象类型的属性时会递归调用来判断。还有很多边界情况没有处理，比如不能判断两个`map`是否相同

```js
const deepEqual = (obj1, obj2) => {
    // 如果两个对象内存地址相同它们就肯定是同一个对象
    if (Object.is(obj1, obj2)) {
        return true
    }
    // 如果obj不是对象或者是null返回false
    if (typeof obj1 !== 'object' || Object.is(obj1, null) || typeof obj2 !== 'object' || Object.is(obj2, null)) {
        return false
    }

    // 到这一步可以保证obj一定是对象类型，可能是object也可能是array
    // 转成map方便遍历
    const map1 = new Map(Object.entries(obj1))
    const map2 = new Map(Object.entries(obj2))
    // map长度不同对象肯定不同
    if (map1.size !== map2.size) {
        return false
    }
    // 遍历map1获取键值对数据
    for (const [key, value] of map1) {
      if (map2.has(key)) {
        const value2 = map2.get(key)
        // 如果当前值是object类型，就要递归调用，验证object是否相同
        if (value !== null && typeof value === 'object' && value2 !== null && typeof value2 === 'object') {
          // 因为shallowEqual函数只会返回true或false，所以这里可以这样判断
          if (!deepEqual(value, value2)) {
            return false
          }
        } else if (value2 !== value) {
          return false
        }
      } else {
        return false
      }
    }
    // 上面所有的判断都不符合，就表示他们相同
    // 这里也是作为递归调用的一个出口
    return true
}
const a = {name: 'zs', age: 18, a: 1, b: null, c: false, d: [1, 2]}
const b = {name: 'zs', age: 18, a: 1, b: null, c: false, d: [1, 2]}

console.log(deepEqual(a, b))  // true
```


## 保守做法

为了避免背锅，工作中应该用lodash的[isEqual](https://www.lodashjs.com/docs/lodash.isEqual)方法判断对象是否相等

```js
lodash.isEqual(obj1, obj2)
```

