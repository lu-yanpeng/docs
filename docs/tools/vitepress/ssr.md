# SSR 打包

有些对象只在浏览器环境可用，比如`window`、`ResizeObserver`，这些如果直接打包的话会报错，因为在node环境没有这些对象，
可以用`<ClientOnly>`标签来包裹它们，这样打包就不会报错了

```vue
<script setup>
import Fold from './fold.vue'
</script>

<!-- 用这个标签包裹那些有浏览器api的组件 -->
<ClientOnly>
  <Fold />
</ClientOnly>
```