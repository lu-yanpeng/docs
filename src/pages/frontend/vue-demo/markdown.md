# MarkDown编辑器

::: tip 注意
字节出品的markdown编辑器，现在已经不维护了BUG很多。

```vue
<template>
  <div>
      <Editor :value="sdStr" :plugins="plugins" @change="onChange" :locale="zh_Hans" />
      <br>
      <Viewer :value="sdStr" :plugins="plugins" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Editor, Viewer } from '@bytemd/vue-next'
import 'bytemd/dist/index.min.css'
import gfm from '@bytemd/plugin-gfm'
import highlight from '@bytemd/plugin-highlight'
// 中文工具栏
import zh_Hans from 'bytemd/locales/zh_Hans.json'

const sdStr = ref('# 标题1')
const plugins = [gfm(), highlight()]
const onChange = (v) => {
  sdStr.value = v
}


onMounted(() => {
  // 注意：因为vitepress使用SSR打包，如果在beforeCreate的时候获取document对象会报错
  // 把它放到mounted的时候获取就不会报错


  // highlight.js用来显示代码高亮
  const linkHighlight = document.createElement('link')
  linkHighlight.setAttribute('rel', 'stylesheet')
  linkHighlight.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css')
  document.head.appendChild(linkHighlight)

// views模式的时候显示github风格的样式
  const linkTheme = document.createElement('link')
  linkTheme.setAttribute('rel', 'stylesheet')
  linkTheme.setAttribute('href', 'https://cdnjs.cloudflare.com/ajax/libs/github-markdown-css/5.2.0/github-markdown.min.css')
  document.head.appendChild(linkTheme)
})

/*
* 需要手动安装 @bytemd/vue-next bytemd github-markdown-css highlight.js的样式
* @bytemd/plugin-highlight 插件可以按需求装
* */
</script>
```
:::