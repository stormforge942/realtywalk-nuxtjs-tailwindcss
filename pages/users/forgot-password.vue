<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Forgot Password - Realty Walk'
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.forgot_password.title') }}</template>
    <AuthForgotPasswordForm />
  </NuxtLayout>
</template>
