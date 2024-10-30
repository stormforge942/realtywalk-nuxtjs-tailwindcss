<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `Reset Password - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.reset_password.title') }}</template>
    <AuthForgotPasswordForm />
  </NuxtLayout>
</template>
