# 示例

```ts
interface Tag {
  name: string
  desc: string
  articles: string[]
}
// 把Tag的每一个字段提取出来生成一个元组类型，并且Partial会把每个字段都设置成可选的
type TagsFields = Array<keyof Partial<Tag>>
```

## 命名空间的用法

有些项目使用`namespace`的方式导出类型，这种情况可以用`namespace.interface`的方式使用类型，比如`DefaultTheme.Config`。
如果没有用`namespace`包裹它，而是直接`export interface`的话就可以直接用`Config`了，不用那么麻烦


```ts
export namespace DefaultTheme {
  export interface Config {}
}

// 用法
DefaultTheme.Config
```

## 泛型

给一个函数传递类型

```ts
const submit = async <T> (): Promise<T> => {
  // 只做演示，实际应该返回T对应的类型
  return [1, 2] as T
}

// 传入什么类型返回值就是什么类型
submit<number[]>()
```
