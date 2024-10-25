<script setup lang="ts">
const items = ref([
  'All',
  '#',
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
])
const selected = ref(items.value[0])

const props = defineProps({
  modelValue: {
    type: String,
    required: false
  }
})
const emit = defineEmits(['update:modelValue'])

const onClick = (item: string) => {
  selected.value = item
  if(item === 'All') {
    emit('update:modelValue', '')
  } else {
    emit('update:modelValue', item)
  }
}

onBeforeMount(() => {
  if(props.modelValue) {
    selected.value = props.modelValue
  } else {
    selected.value = 'All'
  }
})
</script>

<template>
  <div>
    <button
    :key="item"
    v-for="item of items"
    @click="onClick(item)"
    :class="[
      selected === item
        ? 'bg-primary hover:bg-dark text-white'
        : 'text-primary hover:text-dark',
      'underline px-3 py-2',
    ]"
  >
    {{ item }}
  </button>
  </div>
</template>
