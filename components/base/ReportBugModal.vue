<script setup lang="ts">
const isOpen = ref(false)

const toggle = (val: boolean) => {
  isOpen.value = val
}

eventBus.on(REPORT_MODAL, (val) => {
  isOpen.value = val as boolean
})
</script>

<template>
  <BaseModal :isOpen="isOpen" @toggle="toggle">
    <template #title>{{ $t('report_bug.title') }}</template>
    <template #body>
      <BaseReportBugForm />
    </template>
  </BaseModal>
</template>
