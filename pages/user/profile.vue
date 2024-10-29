<script setup lang="ts">
definePageMeta({
  layout: false,
  middleware: 'auth'
})

useHead({
  title: 'User Profile - Realty WALK'
})
</script>

<template>
  <NuxtLayout name="main">
    <template #header>My Profile</template>
    <ProfileAccountInfo />
    <UDivider label="Change Password" :size="'sm'"/>
    <ProfilePasswordChange />
  </NuxtLayout>
</template>
