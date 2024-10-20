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
    <template #header>{{ $t('auth.reset_password.title') }}</template>
    <AuthForgotPasswordForm />
  </NuxtLayout>
</template>
