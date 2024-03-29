# 组合式函数



## 示例


### 形参

`MaybeRefOrGetter`类型可以接收`ref`，或者是一个getter函数`()=>({})`，然后用`toValue`来取它的值，
这样不管它传递什么类型的值，都能正确获取到数据

```ts
import { toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

export const useEcharts = (
    containerRef: MaybeRefOrGetter<HTMLDivElement | null>,
    option: MaybeRefOrGetter<Record<string, any>>
) => {
  toValue(containerRef)
  toValue(option)
}
```

### 实参

可以用`toRef`来包装一个值，这样它会变成一个只读的ref，避免传递的值被修改

```ts
import { toRef } from 'vue'

const { echartsInstance } = useEcharts(containerRef, toRef(() => options))
```