# 循环/遍历

这里有一些遍历对象的示例，更多示例需要在`对象遍历`的文章查看



## for

大多数时候需要循环都会用到`for`循环

```js
for (let i = 0; i < 3; i++) {
  console.log(i)
}
```

上面这个例子初始化一个变量`i`用来做循环判断条件，然后判断`i < 3`，如果为true就执行循环体，也就是`{}`里面的内容，
执行循环体后再执行`i++`然后再判断`i < 3`，一直到这个条件为false结束循环


## while

有时候需要一个无限循环，比如服务器监听端口号，这时候可以 `while (true)` 创建一个无线循环。

```js
let i = 0
// i>=3的时候条件不满足，退出循环
while (i < 3) {
  console.log(i)
  i += 1
}
```

## continue 继续

`continue`关键字可以跳过后续代码，直接进行下一次循环

```js
for (let i = 1; i < 10; i++) {
  // 如果i是偶数，就跳过后续代码直接进入下次循环
  if (i % 2 === 0) {
    continue
  }
  console.log(i)
}
```


## break 退出

`break`结束当前循环，注意它结束的是当前循环体的循环，如果多个循环嵌套，不会影响到外层循环

```js
for (let i = 0; i < 3; i++) {
  // 直接结束并退出循环
  if (i === 1) {
    break
  }
}

for (let i = 0; i < 10; i++) {
  for (let k = i; k < 3; k++) {
    // 这里的break不会结束外层的循环
    if (k === 1) break
  }
  console.log(i)
}
```


## 多层循环退出

很多时候我们会用多层循环来遍历数据，当满足条件的时候希望直接退出所有循环，用普通的`break`比较难实现。这里可以用`return`和
`throw Error`来处理

在函数中可以直接`return`结束循环

```js
const shallowEqual = (obj1, obj2) => {
  for (const [key, value] of Object.entries(obj1)) {
    if (key === null) {
      // 这个return会直接结束函数，循环也自然会被结束
      return
    }
  }
}
```

一个在`python`中常见的操作是抛出异常来结束循环或函数的执行，在js中可能比较少见

```js
try {
  for (let i = 0; i < 10; i++) {
    for (let k = i; k < 3; k++) {
      throw Error('异常')
    }
  }
} catch (e) {
  // 捕获到异常之后可以在这里进行后续处理
}
```

