<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Forgot Password - Realty WALK',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.forgot_password.title') }}</template>
    <AuthResetPassword />
  </NuxtLayout>
</template>
