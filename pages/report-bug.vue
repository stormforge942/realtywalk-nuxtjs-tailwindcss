<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Report Bug',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('menu.report_bug') }}</template>
    <BaseReportBugForm />
  </NuxtLayout>
</template>
