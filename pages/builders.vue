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
    <template #header>{{ $t('builder.title') }}</template>
    <BuilderHome />
  </NuxtLayout>
</template>
