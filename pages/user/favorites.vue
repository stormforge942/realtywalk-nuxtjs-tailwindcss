<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth'
})

useHead({
  title: 'Favorites - Realty WALK'
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('favorite.list.title') }}</template>
    <FavoriteHome />
  </NuxtLayout>
</template>
