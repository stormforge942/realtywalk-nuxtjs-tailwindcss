<script setup lang="ts">
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const isOpen = ref(false);
</script>

<template>
    <div class="relative">
        <button
        class="flex group absolute z-10"
        @click="isOpen = !isOpen">
            <div 
            class="bg-primary group-hover:bg-primary1 text-white w-32 h-10 flex items-center justify-center">
                {{ $t('home.map.btn_search_criteria') }}
            </div>
            <div class="bg-dark group-hover:bg-darkHover text-secondary w-10 h-10 flex items-center justify-center">
                <FontAwesome 
                :icon="faAngleDown"
                :class="isOpen && 'rotate-180'"/>
            </div>
        </button>
        <div
        :class="isOpen ? 'h-0' : 'h-screen'" 
        class="bg-slate-200 w-[300px] absolute -top-4 -left-4">

        </div>
    </div>
</template>