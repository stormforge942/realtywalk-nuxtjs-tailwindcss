<template>
  <label class="flex items-center gap-x-2 cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="toggleCheckbox"
      class="hidden"
    />
    <div
      class="w-[14px] h-[14px] flex items-center justify-center border border-secondary"
    >
    <span
    :class="modelValue? 'opacity-100' : 'opacity-0'"
    class="w-[10px] h-[10px] bg-secondary"/>
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  label: {
    type: String,
    default: 'Checkbox',
  },
});

const emit = defineEmits(['update:modelValue']);

const toggleCheckbox = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>