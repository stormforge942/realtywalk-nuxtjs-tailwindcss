<script setup lang="ts">
definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('favorite.list.title') }}</template>
    <FavoriteHome />
  </NuxtLayout>
</template>
