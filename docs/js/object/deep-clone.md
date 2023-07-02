# 深拷贝

## structuredClone


`structuredClone()`方法是js提供的原生深拷贝方法，它可以很方便的克隆一个普通对象。

```js
const obj = {list: [1, 2, 3], info: {name: 'zs'}}

const objClone = structuredClone(obj)
```

但是它不能克隆对象的[方法](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Structured_clone_algorithm)，会报错。

```js
const obj = {fn: () => {}}

// 报错，不能克隆方法
const objClone = structuredClone(obj)
```

如果要克隆一个vue的ref对象，需要用`toRaw`方法先获取到对象的原始值。

```js
import { toRaw } from 'vue'

structuredClone(toRaw(obj.value))
```


## 保守做法

比较保险的做法是用`lodash`提供的[深拷贝](https://www.lodashjs.com/docs/lodash.cloneDeep)方法，这样即使项目中出了问题别人也不会怪你。
