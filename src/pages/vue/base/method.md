# 方法 method

在vue3里面定义一个方法就和js定义一个普通函数一样，不过推荐全部使用箭头函数，这样可以很方便的访问到外部的`ref`和其他方法。

```js
const name = ref('zs')

const onTest = () => {
    // 所有方法都推荐使用箭头函数
    console.log(name.value)
}
// 调用
onTest()
```

方法一般用来处理事件比较多，也可以直接在模板里面运行
