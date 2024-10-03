<script setup lang="ts">
const store = useHomeStore();
</script>

<template>
  <HomeExplore v-if="!store.isMapView"/>
  <HomeMap v-if="store.isMapView"/>
</template>
