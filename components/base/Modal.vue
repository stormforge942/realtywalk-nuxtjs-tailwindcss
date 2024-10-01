<script setup lang="ts">
import { faXmark } from '@fortawesome/free-solid-svg-icons';

defineProps({
    title: String,
    bodyClass: String,
    isOpen: Boolean
})

const emit = defineEmits(['toggle']);
</script>

<template>
    <!-- Transition wrapper for the fade effect -->
    <transition name="fade" appear>
        <div v-if="isOpen" class="z-[60] fixed w-screen h-screen top-0 left-0 drop-shadow-md backdrop-blur-md flex items-center justify-center bg-[#0000003F]">
            <div :class="['bg-white rounded-md', bodyClass]">
                <div 
                @click="emit('toggle', false)"
                class="flex justify-between items-center w-full h-16 p-4">
                    <span>{{ title }}</span>
                    <button class="text-gray-400 hover:text-gray-600">
                        <FontAwesome :icon="faXmark" class="scale-150"/>
                    </button>
                </div>
                <slot />
            </div>
        </div>
    </transition>
</template>

<style scoped>
/* Fade-in and fade-out transitions */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
