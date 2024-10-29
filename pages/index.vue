<script setup lang="ts">
const store = useHomeStore();

useHead({
  title: 'Home - Realty WALK'
})
</script>

<template>
  <HomeExplore v-if="!store.isMapView"/>
  <HomeMap v-if="store.isMapView"/>
</template>
