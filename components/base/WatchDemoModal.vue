<script setup lang="ts">
const isOpen = ref(false)

const toggle = (val: boolean) => {
  isOpen.value = val
}

eventBus.on(DEMO_MODAL, () => {
    isOpen.value = true;
})
</script>

<template>
    <BaseModal :isOpen="isOpen" @toggle="toggle">
    </BaseModal>
</template>