<script setup lang="ts">
import { useTemplateRef } from 'vue'

const containerRef = useTemplateRef('containerRef')
const setIndex = (v: boolean) => {
  if (!containerRef.value) {
    return
  }
  const boxA = containerRef.value.querySelector('.boxA')
  const boxB = containerRef.value.querySelector('.boxB')
  if (!boxA || !boxB) {
    return
  }

  if (v) {
    boxA.style.zIndex = '10'
    boxB.style.zIndex = '20'
  } else {
    boxA.style.zIndex = 'auto'
    boxB.style.zIndex = 'auto'
  }
}
</script>

<template>
  <div>
    <div style="color: #628aea;">
      <button @click="setIndex(false)" style="margin-right: 20px;">不指定</button>
      <button @click="setIndex(true)">指定层级</button>
    </div>
    <div ref="containerRef" class="_container">
      <div class="boxA">A</div>
      <div class="boxB">B</div>
    </div>
  </div>
</template>

<style scoped>
._container {
  padding: 20px;
  border: 1px solid darkred;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-areas: "_";
  color: white;

  .boxA {
    width: 100%;
    height: 200px;
    background: #2c3e50;
    grid-area: _;
    transition: scale .3s;

    &:hover {
      scale: 105%;
    }
  }

  .boxB {
    width: 100px;
    height: 100px;
    border: 1px solid palegreen;
    grid-area: _;
    transition: scale .3s;
  }
}
</style>
<script setup lang="ts">
</script>