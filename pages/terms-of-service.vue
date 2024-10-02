<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Terms of Service',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.register.form.labels.link_tos') }}</template>

  </NuxtLayout>
</template>
