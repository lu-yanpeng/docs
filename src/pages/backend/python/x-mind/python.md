---
layout: page
---

<script setup>
import fileUrl from './__x-mind/python.xmind?url';
import XMind from '@/components/xmind-viewer.vue';

const id = Symbol('css1')
</script>

<x-mind :fileUrl :id />
