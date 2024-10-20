<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'New user - Realty Walk',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.register.title') }}</template>
    <AuthSignUpForm />
  </NuxtLayout>
</template>
