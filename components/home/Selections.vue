<script lang="ts" setup>
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

const isOpen = ref(false)
const homeStore = useHomeStore();

</script>

<template>
  <div
  :style="[isOpen ? 'right: 0' : 'right: -300px']" 
  :class="['fixed top-0 right-0 w-[300px] bg-primary h-screen']">
    <div class="w-full h-full relative">
        <div class="h-full flex items-center absolute w-max -left-[90px]">
            <button 
            @click="isOpen = !isOpen"
            class="toggle-button">
                {{ $t('home.map.selections') }}
                <FontAwesome class="scale-125" :icon="isOpen? faAngleDown : faAngleUp"/>
            </button>
        </div>  
        <button class="clear-button">
            {{ $t('home.map.btn_clear_selected') }}
        </button>
        <div class="w-full h-full pt-[100px] sm:pt-[120px]">
            <div class="flex">
                <button 
                @click="homeStore.setLevel(1)"
                :class="['level-button', homeStore.level === 1 && 'selected']">
                    {{ $t('home.map.level1') }}
                </button>
                <button 
                @click="homeStore.setLevel(2)"
                :class="['level-button', homeStore.level === 2 && 'selected']">
                    {{ $t('home.map.level2') }}
                </button>
                <button 
                @click="homeStore.setLevel(3)"
                :class="['level-button', homeStore.level === 3 && 'selected']">
                    {{ $t('home.map.level3') }}
                </button>
            </div>
            <label class="flex h-[50px] items-center justify-center bg-primary1 gap-4">
                <BaseSwitch v-model="homeStore.showUnselected"/>
                <span class="text-xs text-[#FFFFFF80] font-semibold bg-primary1">
                    {{ $t('home.toggles.show_unselected_areas') }}
                </span>
            </label>
        </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.clear-button {
    @apply w-full absolute bottom-0 h-[50px] flex items-center justify-center bg-primary1 text-white hover:text-secondary hover:bg-dark
}
.toggle-button {
    @apply text-white -rotate-90 bg-primary w-[140px] h-10 rounded-t-md flex items-center justify-center gap-x-2 hover:bg-dark
}
.level-button {
    @apply w-full h-[45px] flex items-center text-[#FFFFFF80] bg-dark hover:bg-darkHover uppercase justify-center
}
.level-button.selected {
    @apply bg-secondary hover:bg-secondary text-primary
}
</style>
