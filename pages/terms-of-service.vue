<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `Terms of Service - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.register.form.labels.link_tos') }}</template>
  </NuxtLayout>
</template>
