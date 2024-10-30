<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `Address Lookup - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('pages.address_lookup.title') }}</template>
    <LookupHome />
  </NuxtLayout>
</template>
