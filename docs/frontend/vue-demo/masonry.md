# 瀑布流

使用第三方库：[vue3-infinitegrid](https://naver.github.io/egjs-infinitegrid/Guides)

组件用法建议先复制这个案例的源码在本地跑起来，然后再结合官方文档来使用。

关于每一列的大小，可以通过属性设置每一列的大小，不过作者更建议通过css来自适应，我这里也是用媒体查询来自适应图片的宽度。

## 说明

这里暂时没有示例，因为打包的时候会报错，需要等待作者修复`CommonJS`的bug，已经有人提了[PR](https://github.com/naver/egjs-infinitegrid/pull/536)估计下个版本就会修复了。
本地运行的时候不会报错，可以参考源码编写demo


<script setup>
import Masonry from "../../../components/frontend/vue-demo/Masonry.vue";
</script>

<Masonry />