<script setup lang="ts">

const items = ref(Array(10))
</script>

<template>
  <div class="p-4">
    <BaseAlphaBetaFilter />
    <BuilderItem :key="item" v-for="item of items" />
  </div>
</template>
