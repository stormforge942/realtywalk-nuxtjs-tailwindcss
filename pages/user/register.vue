<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'New user - Realty WALK',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.register.title') }}</template>
    <AuthSignUpForm />
  </NuxtLayout>
</template>
