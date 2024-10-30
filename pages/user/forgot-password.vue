<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `Forgot Password - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.forgot_password.title') }}</template>
    <AuthResetPassword />
  </NuxtLayout>
</template>
