<script setup lang="ts">
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

export interface SelectOption<T> {
  label: string;
  value: T | MIN | MAX;
}

interface Props {
  multiple: boolean;
  modelValue: string | number | Array<string | number>;
  options: Array<SelectOption<string | number>>;
  placeHolder?: string;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const isOpen = ref(false);
const element = ref();

// Get the selected option(s)
const selected = computed(() => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.map((val) =>
      props.options.find((option) => option.value === val)
    );
  } else {
    return props.options.find((option) => option.value === props.modelValue);
  }
});

// Toggle the dropdown open state
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Select an option
const selectOption = (option: SelectOption<string | number>) => {
  if (props.multiple) {
    if (Array.isArray(props.modelValue)) {
      const updatedSelection = props.modelValue.includes(option.value)
        ? props.modelValue.filter((item) => item !== option.value)
        : [...props.modelValue, option.value];
      emit('update:modelValue', updatedSelection);
    }
  } else {
    emit('update:modelValue', option.value);
    isOpen.value = false;
  }
};

// Check if an option is selected
const isSelected = (option: SelectOption<string | number>) => {
  if (props.multiple && Array.isArray(props.modelValue)) {
    return props.modelValue.includes(option.value);
  } else {
    return props.modelValue === option.value;
  }
};

const handleOutSideClick = (e: MouseEvent) => {
  if (element.value && !element.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleOutSideClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleOutSideClick)
})
</script>

<template>
  <div class="relative w-full" ref="element">
    <div
      class="flex items-center justify-between border-2 border-gray-400 min-h-10 h-full cursor-pointer"
      @click="toggleDropdown"
    >
      <template v-if="selected">
        <template v-if="!props.multiple && !Array.isArray(selected)">
          <span class="px-2">{{ selected.label }}</span>
        </template>
        <template v-if="props.multiple && Array.isArray(selected)">
          <span class="px-2">
            {{ selected.map((item) => item?.label).join(', ') || placeHolder }}
          </span>
        </template>
      </template>
      <template v-else>
        <span>{{ placeHolder ? placeHolder : 'Select an option' }}</span>
      </template>
      <span class="min-w-10 h-10 text-primary flex items-center justify-center">
        <FontAwesome :class="[isOpen && 'rotate-180']" :icon="faAngleDown" />
      </span>
    </div>
    <ul
      :class="[isOpen ? 'opacity-100 h-max' : 'opacity-0 h-0']"
      class="absolute z-10 bg-white border border-primary shadow-md w-full mt-1 max-h-48 overflow-y-scroll"
    >
      <li
        v-for="option in props.options"
        :key="option.value"
        class="px-2 py-1 hover:bg-gray-200 cursor-pointer"
        @click.stop="selectOption(option)"
      >
        {{ option.label }}
        <span v-if="isSelected(option)">✔</span>
      </li>
    </ul>
  </div>
</template>
