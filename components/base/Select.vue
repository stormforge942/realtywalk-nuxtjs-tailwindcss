<template>
  <div class="relative w-full" @click="toggleDropdown">
    <!-- Display selected options -->
    <div class="select-box border p-2 cursor-pointer">
      <span v-if="!multiple && selected.length">{{ selected[0].label }}</span>
      <span v-if="multiple">{{ selected.map(item => item.label).join(', ') }}</span>
      <span v-if="!selected.length">Select an option</span>
    </div>

    <!-- Options dropdown -->
    <ul v-if="dropdownOpen" class="absolute z-10 bg-white border w-full mt-1">
      <li
        v-for="option in options"
        :key="option.value"
        class="p-2 hover:bg-gray-200 cursor-pointer"
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
        <span v-if="isSelected(option)">✔</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  options: {
    type: Array,
    required: true,
  },
  modelValue: {
    type: [Array, Object, null],
    default: null,
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue'])
const dropdownOpen = ref(false)

const selected = computed(() => {
  if (props.multiple) {
    return props.modelValue || []
  }
  return props.modelValue ? [props.modelValue] : []
})

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

const selectOption = (option) => {
  if (props.multiple) {
    const updatedSelection = selected.value.includes(option)
      ? selected.value.filter(item => item.value !== option.value)
      : [...selected.value, option]
    emit('update:modelValue', updatedSelection)
  } else {
    emit('update:modelValue', option)
    dropdownOpen.value = false
  }
}

const isSelected = (option) => {
  return selected.value.some(item => item.value === option.value)
}
</script>

<style scoped>
.select-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
