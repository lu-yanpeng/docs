<script setup>
import { ref } from 'vue'
import A from './a.vue'
import B from './b.vue'
import C from './c.vue'


// 当前显示的组件名，通过这个名称从tabs获取对应的组件实例
const currentTab = ref('A')
const tabs = {A, B, C}
</script>

<template>
  <div>
    <!-- 如果不遍历，可以这样写 -->
    <!--    <button @click="currentTab = 'A'" :class="{active: currentTab === 'A'}">A</button>-->
    <!--    <button @click="currentTab = 'B'" :class="{active: currentTab === 'B'}">B</button>-->
    <!--    <button @click="currentTab = 'C'" :class="{active: currentTab === 'C'}">C</button>-->

    <button
        v-for="(component, key) in tabs"
        :key="key"
        :class="{active: currentTab === key}"
        @click="currentTab = key">
      {{ key }}
    </button>

    <keep-alive>
      <component :is="tabs[currentTab]"/>
    </keep-alive>
  </div>
</template>

<style scoped>
button {
  padding-inline: 10px;
  margin-inline: 10px;
}
.active {
  background-color: darkseagreen;
}
</style>