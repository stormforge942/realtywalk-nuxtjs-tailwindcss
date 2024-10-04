<template>
  <label class="flex items-center gap-x-2 cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="toggleCheckbox"
      class="hidden"
    />
    <div
    :class="[color === 'primary' ? 'border-primary' : 'border-secondary']"
      class="w-[14px] h-[14px] flex items-center justify-center border"
    >
    <span
    :class="[modelValue? 'opacity-100' : 'opacity-0', 
    color === 'primary' ? 'bg-primary' : 'bg-secondary']"
    class="w-[10px] h-[10px]"/>
    </div>
    <slot />
  </label>
</template>

<script setup lang="ts">

interface CheckBoxProp {
  modelValue: boolean;
  color: 'primary' | 'secondary'
}

const props = defineProps<CheckBoxProp>();

const emit = defineEmits(['update:modelValue']);

const toggleCheckbox = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>