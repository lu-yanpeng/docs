# 瀑布流

使用第三方库：[vue3-infinitegrid](https://naver.github.io/egjs-infinitegrid/Guides) [github](https://github.com/naver/egjs-infinitegrid)

组件用法建议先复制这个案例的源码在本地跑起来，然后再结合官方文档来使用。

关于每一列的大小，可以通过属性设置每一列的大小，不过作者更建议通过css来自适应，我这里也是用媒体查询来自适应图片的宽度。

## 说明

图片比较多可能加载的比较满，没有反应的话可以刷新试试。


<script setup>
import Masonry from "@/components/frontend/vue-demo/Masonry.vue";
</script>

<Masonry />