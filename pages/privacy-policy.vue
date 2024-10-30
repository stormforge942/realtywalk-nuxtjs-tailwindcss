<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `Privacy Policy - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{
      $t('auth.register.form.labels.link_privacy_policy')
    }}</template>
  </NuxtLayout>
</template>
