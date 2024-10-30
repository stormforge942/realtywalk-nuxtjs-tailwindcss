<script setup lang="ts">
definePageMeta({
  layout: false,
})


const homeStore = useHomeStore()

useHead({
  title: `User Sign in - ${homeStore.appName}`,
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('auth.login.title') }}</template>
    <AuthSignInOnlyEmail />
  </NuxtLayout>
</template>
