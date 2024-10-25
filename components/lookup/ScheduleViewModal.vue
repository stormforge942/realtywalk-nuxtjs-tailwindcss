<script setup lang="ts">
const isOpen = ref(false)

const toggle = (val: boolean) => {
  isOpen.value = val
}

onMounted(() => {
    eventBus.on(OPEN_SCHEDULE_VIEWING, (val) => {
        isOpen.value = val as boolean
    })
})

onUnmounted(() => {
    eventBus.off(OPEN_SCHEDULE_VIEWING)
})
</script>

<template>
  <BaseModal :isOpen="isOpen" @toggle="toggle">
    <template #title>{{ $t('schedule.listing.title') }}</template>
    <template #body>
      <LookupScheduleViewForm />
    </template>
  </BaseModal>
</template>
