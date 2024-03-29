# 翻页链接

页面底部会自动生成翻页链接，点击可以跳转到下一页。

::: tip 
对于`index.md`文件，它的下一页需要手动设置，不然它还是会显示当前自己的链接。
:::

## 手动设置上/下页链接

> 正常情况会自动根据侧边栏设置的顺序生成翻页链接的，也可以手动设置。

```markdown
---
layout: doc
prev:
  text: '测试1'
  link: '/frontend/vue-demo/test1'
next:
  text: '测试2'
  link: '/frontend/vue-demo/test'
---
```

设置`false`可以取消翻页链接

```markdown
---
layout: doc
prev: false
next: false
---
```