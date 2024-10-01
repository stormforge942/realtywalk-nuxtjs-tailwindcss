<template>
    <button class="flex items-center border-none w-[190px] h-[40px] hover:scale-[1.01]">
      <span class="flex justify-center items-center w-[calc(100%-40px)] h-full bg-white text-[#021d35] text-md font-semibold">
        {{ $t('menu.watch_the_demo') }}
      </span>
      <span class="flex justify-center items-center w-[40px] h-full bg-secondary text-black">
        <FontAwesome :icon="faCaretRight" class="transform scale-150" />
      </span>
    </button>
  </template>
  
  <script setup lang="ts">
  import { faCaretRight } from '@fortawesome/free-solid-svg-icons'
  </script>
  