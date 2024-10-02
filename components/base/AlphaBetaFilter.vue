<script setup lang="ts">
const items = ref([
  'All',
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
</script>

<template>
  <button
    :key="item"
    v-for="item of items"
    @click="selected = item"
    :class="[
      selected === item
        ? 'bg-primary hover:bg-dark text-white'
        : 'text-primary hover:text-dark',
      'underline p-2',
    ]"
  >
    {{ item }}
  </button>
</template>
