<script setup lang="ts">
import { faClose } from '@fortawesome/free-solid-svg-icons';
const homeStore = useHomeStore();

const onClose = () => {
    homeStore.showInstruction = false;
    localStorage.setItem('SHOW_INSTRUCTION', JSON.stringify(false))
}
</script>

<template>
    <div class="fixed w-screen h-screen top-0 left-0 flex items-center justify-center">
        <div class="bg-primary p-12 shadow-lg text-white max-w-[800px] text-xl relative">
            {{ $t('home.map.instructions') }}
            <span
            @click="onClose" 
            class="rounded-full hover:bg-dark absolute top-3 right-3 inline-flex w-10 h-10 items-center justify-center cursor-pointer">
                <FontAwesome :icon="faClose" class="text-secondary"/>
            </span>
        </div>
    </div>
</template>