<template>
    <masonry-infinite-grid
    class="container"
    :container="true"
    align="center"
    v-bind:gap="10"
    v-on:request-append="onRequestAppend"
    >
        <div
            class="item"
            v-for="item in items"
            :key="item.key"
            :data-grid-groupkey="item.groupKey"
        >
            <div class="thumbnail">
                <img
                    v-bind:src="
                    'https://naver.github.io/egjs-infinitegrid/assets/image/' +
                    ((item.key % 33) + 1) +
                    '.jpg'
                "
                    alt="egjs"
                    loading="lazy"
                />
            </div>
        </div>
    </masonry-infinite-grid>
</template>
  
<script setup>
import { MasonryInfiniteGrid } from "@egjs/vue3-infinitegrid";
import {ref} from "vue";

// FIXME：打包报错，等待vue3-infinitegrid作者修复commonjs的bug

const getItems = (nextGroupKey, count) => {
  const nextItems = [];

  for (let i = 0; i < count; ++i) {
    const nextKey = nextGroupKey * count + i;

    nextItems.push({ groupKey: nextGroupKey, key: nextKey });
  }
  return nextItems;
}


const items = ref(getItems(0, 10))

const onRequestAppend = (e) => {
  const nextGroupKey = (e.groupKey || 0) + 1;

  items.value = [...items.value, ...getItems(nextGroupKey, 10)];
}
</script>

<style scoped>
.container {
width: 100%;
height: 500px;
}

.item {
display: inline-block;
opacity: 1;
}

@media (width <= 768px) {
.item {width: 48%;}
}

@media (width > 768px) {
.item {width: 22%;}
}

.item .thumbnail {
overflow: hidden;
border-radius: 8px;
}

.item .thumbnail img {
width: 100%;
border-radius: 8px;
}
</style>