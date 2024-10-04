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

const selected = computed(() => {
  if (props.multiple) {
    if(Array.isArray(props.modelValue)){
        let options: Array<SelectOption<string | number>> = [];
        props.modelValue.forEach(item => {
            const option = props.options.find(option => option.value === item);
            if(option) {
                options = [...options, option]
            }
        });
        return options;
    }
  } else {
    const option = props.options.find(item => item.value === props.modelValue);
    if(option) {
        return option
    } else {
        return props.options![0];
    }
  }
});

// Toggle the dropdown open state
const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

// Select an option
const selectOption = (option: SelectOption<string | number>) => {
  if (props.multiple && selected.value) {
    if(Array.isArray(selected.value)) {
        const updatedSelection = selected.value.includes(option)
      ? selected.value.filter(item => item !== option)
      : [...selected.value, option.value];
    emit('update:modelValue', updatedSelection);
    }
  } else {
    emit('update:modelValue', option.value);
    isOpen.value = false;
  }
};

// Check if an option is selected
const isSelected = (option: SelectOption<string | number>) => {
    if(props.multiple) {
        if(Array.isArray(selected.value)) {
            return selected.value.includes(option)
        } else {
            return false
        }
    } else {
        if(Array.isArray(selected.value)) {
            return false;
        } else {
            return option === selected.value
        }
    }
};
</script>

<template>
  <div class="relative w-full" @click="toggleDropdown">
    <div class="flex items-center justify-between border-2 border-gray-400 h-10 cursor-pointer">
        <template v-if="selected">
            <span class="px-2" v-if="!props.multiple && !Array.isArray(selected)">{{ selected.label }}</span>
            <span v-if="props.multiple && Array.isArray(selected)">{{ selected.map(item => item.label).join(', ') }}</span>
        </template>
        <template v-else>
            <span>{{ placeHolder ? placeHolder : 'Select an option' }}</span>
        </template>
        <span class="w-10 h-10 text-primary flex items-center justify-center">
            <FontAwesome :class="[isOpen && 'rotate-180']" :icon="faAngleDown"/>
        </span>
    </div>
    <ul
    :class="[isOpen ? 'opacity-100 h-max' : 'opacity-0 h-0']"  
    class="absolute z-10 bg-white border border-primary shadow-md w-full mt-1 max-h-48 overflow-y-scroll">
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
