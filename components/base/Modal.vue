<script setup lang="ts">
defineProps({
  title: String,
  isOpen: Boolean,
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <UModal
    :ui="{
      width: 'w-full sm:max-w-max'
    }"
    :model-value="isOpen"
    @update:model-value="emit('toggle')"
    prevent-close
  >
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-xl font-semibold leading-6 text-gray-900 dark:text-white"
          >
            <slot name="title"></slot>
          </h3>
          <UButton
            color="black"
            variant="ghost"
            icon="i-heroicons-x-mark-20-solid"
            class="-my-1"
            @click="emit('toggle', false)"
          />
        </div>
      </template>
      <slot name="body"></slot>
    </UCard>
  </UModal>
</template>
