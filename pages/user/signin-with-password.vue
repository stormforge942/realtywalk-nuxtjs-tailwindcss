<script setup lang="ts">
definePageMeta({
  layout: false,
})

const homeStore = useHomeStore()

useHead({
  title: `User Sign in with Password - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.login.title') }}</template>
    <AuthSignInWithPassword />
  </NuxtLayout>
</template>
