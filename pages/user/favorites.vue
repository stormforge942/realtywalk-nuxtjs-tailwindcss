<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth'
})

const homeStore = useHomeStore()

useHead({
  title: `Favorites - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('favorite.list.title') }}</template>
    <FavoriteHome />
  </NuxtLayout>
</template>
