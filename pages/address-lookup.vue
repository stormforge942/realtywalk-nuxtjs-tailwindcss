<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Address Lookup',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.login.title') }}</template>
  </NuxtLayout>
</template>
