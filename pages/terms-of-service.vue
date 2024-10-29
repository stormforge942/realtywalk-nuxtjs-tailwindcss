<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Terms of Service - Realty WALK',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.register.form.labels.link_tos') }}</template>
  </NuxtLayout>
</template>
