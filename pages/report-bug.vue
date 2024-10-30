<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `Report Bug - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('menu.report_bug') }}</template>
    <BaseReportBugForm />
  </NuxtLayout>
</template>
