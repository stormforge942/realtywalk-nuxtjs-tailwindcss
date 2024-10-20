<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'User Sign in - Realty Walk',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.login.title') }}</template>
    <AuthSignInOnlyEmail />
  </NuxtLayout>
</template>
