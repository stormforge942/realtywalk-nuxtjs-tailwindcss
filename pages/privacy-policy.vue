<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Privacy Policy',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{
      $t('auth.register.form.labels.link_privacy_policy')
    }}</template>
  </NuxtLayout>
</template>
