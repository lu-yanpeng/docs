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