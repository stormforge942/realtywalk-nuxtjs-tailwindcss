<script setup lang="ts">

interface CheckBoxProp {
  modelValue: boolean;
  color: string;
}

const props = defineProps<CheckBoxProp>();

const emit = defineEmits(['update:modelValue']);

const toggleCheckbox = () => {
  emit('update:modelValue', !props.modelValue);
};
</script>

<template>
  <label class="flex items-center gap-x-2 cursor-pointer">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="toggleCheckbox"
      class="hidden"
    />
    <div
      class="min-w-[14px] min-h-[14px] flex items-center justify-center border border-gray-500"
    >
    <span
    :style="props.color.includes('#') && {backgroundColor: props.color}"
    :class="[modelValue? 'opacity-100' : 'opacity-0', !props.color.includes('#') && `bg-${props.color}`]"
    class="w-[10px] h-[10px]"/>
    </div>
    <slot />
  </label>
</template>