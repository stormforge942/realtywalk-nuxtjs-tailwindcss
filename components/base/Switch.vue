<template>
  <div
    class="relative inline-flex h-4 w-[42px] items-center rounded-full transition-colors duration-300 cursor-pointer bg-primary"
    @click="emit('toggle')"
  >
    <span
      :class="{
        'translate-x-6 bg-secondary': value,
        'translate-x-0 bg-white': !value,
      }"
      class="inline-block h-[18px] w-[18px] rounded-full"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  value: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['toggle']);
</script>
