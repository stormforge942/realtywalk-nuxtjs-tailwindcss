<script setup lang="ts">
  import { faCaretRight } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal.vue';
  const isOpen = ref(false);

  const toggle = (val: boolean) => {
    isOpen.value = val;
  }
</script>

<template>
  <button
  @click="isOpen = true" 
  class="flex items-center border-none min-w-[190px] h-[40px] hover:scale-[1.01]">
    <span class="flex justify-center items-center w-[calc(100%-40px)] h-full bg-white text-[#021d35] text-md font-semibold">
      {{ $t('menu.watch_the_demo') }}
    </span>
    <span class="flex justify-center items-center w-[40px] h-full bg-secondary text-black">
      <FontAwesome :icon="faCaretRight" class="transform scale-150" />
    </span>
  </button>
  <Modal :bodyClass="'w-4/5 h-4/5'" :isOpen="isOpen" @toggle="toggle">

  </Modal>
</template>
  