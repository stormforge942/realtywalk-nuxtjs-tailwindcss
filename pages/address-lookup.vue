<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Address Lookup - Realty WALK',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('pages.address_lookup.title') }}</template>
    <LookupHome />
  </NuxtLayout>
</template>
