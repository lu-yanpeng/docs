<script setup lang="ts">
import { ref, computed } from 'vue'

const scrollShow = ref(false)
const text = computed(() => scrollShow.value? '隐藏': '显示')
</script>

<template>
  <div>
    <button @click="scrollShow = !scrollShow" style="color: darkseagreen; font-size: 18px;">{{ text }}滚动条</button>

    <div class="_container">
      <h2>标题</h2>

      <div class="nav-bar _mask-img" :class="{'scroll-none': !scrollShow}">
        <div class="scroll-container">
          <ul>
            <li class="" v-for="i in 12" :key="i">--{{ i }}--</li>
          </ul>
        </div>
      </div>

      <p>这个容器有看起来有一个padding包裹着，并且中间的可滚动容器有一个溢出的效果，
        一部文字在容器的外面，一看就知道这里可以滚动。
      </p>
      <p>
        实现这种效果的关键就是scroll-container设置width: max-content;，
        不设置max-content，里面的内容就不会撑开scroll-container，虽然也能滚动但是子元素设置百分比宽度的时候会有问题。
        nav-bar的宽度一定要是100%，给nav-bar单独设置padding，不要给最外层的容器设置统一的padding，
        这样保证nav-bar和外层宽度一致，不会撑开容器。
      </p>
    </div>
  </div>
</template>

<style scoped lang="less">
._container {
  border: 1px solid red;

  h2, p {
    padding-inline: 30px;
  }

  ._mask-img {
    mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
  }

  .scroll-none {
    scrollbar-width: none;
  }

  .nav-bar {
    overflow-x: auto;
    padding-inline: 30px;

    .scroll-container {
      width: max-content;
      border: 1px solid tan;

      ul {
        display: flex;
        list-style: none;
        padding: 0;
        gap: 20px;

        li {
          font-size: 22px;
          margin-top: 0;
        }
      }
    }
  }
}
</style>