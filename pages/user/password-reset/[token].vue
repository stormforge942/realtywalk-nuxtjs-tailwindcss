<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'Reset Password - Realty WALK',
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.reset_password.title') }}</template>
    <AuthForgotPasswordForm />
  </NuxtLayout>
</template>
