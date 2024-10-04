<script lang="ts" setup>
import { faAngleLeft, faAngleRight, faBicycle, faGraduationCap, faWater } from '@fortawesome/free-solid-svg-icons';

const isOpen = ref(false)
const homeStore = useHomeStore();

</script>

<template>
  <div
  :class="[isOpen ? 'right-0' : '-right-full md:-right-[300px]']"
  class='fixed top-0 w-screen md:w-[300px] bg-primary h-screen'>
    <div class="w-full h-full relative">
        <div class="w-max h-full flex items-center justify-start fixed md:absolute right-0 md:-left-10">
            <button 
            style="writing-mode: vertical-rl;"
            @click="isOpen = !isOpen"
            class="toggle-button">
                {{ $t('home.map.selections') }}
                <FontAwesome
                :class="isOpen && 'rotate-180'" 
                class="scale-125" 
                :icon="faAngleRight"/>
            </button>
        </div>  
        <div 
        :class="isOpen ? '-left-[110px] xl:-left-[300px]' : '-left-[180px] xl:-left-[510px]'"
        class="hidden md:flex flex-col xl:flex-row absolute mt-[110px] lg:mt-[130px] gap-2 z-40">
            <label
            @click="homeStore.toggleShowFloodZones" 
            :class="isOpen ? 'w-[90px]' : 'w-[160px]'"
            class="toggle">
                <BaseSwitch 
                :value="homeStore.showFloodZones"/>
                <span 
                v-if="isOpen" 
                class="text-white">
                    <FontAwesome :icon="faWater"/>
                </span>
                <span
                v-else 
                class="toggle-label">
                    {{ $t('home.toggles.flood_planes') }}
                </span>
            </label>
            <div
            :class="isOpen ? 'w-[90px]' : 'w-[160px]'" 
            class="bg-primary1 rounded-2xl">
                <label
                :class="isOpen ? 'w-[90px]' : 'w-[160px]'"
                @click="homeStore.toggleShowSchoolZones" 
                class="toggle">
                    <BaseSwitch 
                    :value="homeStore.showSchoolZones"/>
                    <span 
                    v-if="isOpen" 
                    class="text-white">
                        <FontAwesome :icon="faGraduationCap"/>
                    </span>
                    <span
                    v-else 
                    class="toggle-label">
                        {{ $t('home.toggles.school_zones') }}
                    </span>
                </label>
                <div
                :class="[homeStore.showSchoolZones ? 'h-max pt-3 pb-4' : 'h-0 overflow-y-hidden']"
                class="flex flex-col gap-3 px-4">
                    <BaseCheckbox 
                    v-model="homeStore.showElementarySchool">
                        <span
                        :class="[homeStore.showElementarySchool ? 'text-white' : 'text-[#FFFFFF80]', isOpen && 'ml-4']" 
                        class="text-[10px] font-semibold mt-[3px]">
                            <FontAwesome class="text-base" v-if="isOpen" :icon="faGraduationCap"/>
                            <span v-else>{{ $t('home.toggles.elementary') }}</span>
                        </span>
                    </BaseCheckbox>
                    <BaseCheckbox 
                    v-model="homeStore.showMiddleSchool">
                        <span
                        :class="[homeStore.showMiddleSchool ? 'text-white' : 'text-[#FFFFFF80]', isOpen && 'ml-4']" 
                        class="text-[10px] font-semibold mt-[3px]">
                            <FontAwesome class="text-base" v-if="isOpen" :icon="faGraduationCap"/>
                            <span v-else>{{$t('home.toggles.middleschool')}}</span>
                        </span>
                    </BaseCheckbox>
                    <BaseCheckbox
                    v-model="homeStore.showHighSchool">
                        <span
                        :class="[homeStore.showHighSchool ? 'text-white' : 'text-[#FFFFFF80]', isOpen && 'ml-4']" 
                        class="text-[10px] font-semibold mt-[3px]">
                            <FontAwesome class="text-base" v-if="isOpen" :icon="faGraduationCap"/>
                            <span v-else>{{$t('home.toggles.highschool')}}</span>
                        </span>
                    </BaseCheckbox>
                </div>
            </div>
            <label
            :class="isOpen ? 'w-[90px]' : 'w-[160px]'"
            @click="homeStore.toggleShowBikeTrails" 
            class="toggle">
                <BaseSwitch 
                :value="homeStore.showBikeTrails"/>
                <span 
                v-if="isOpen" 
                class="text-white">
                    <FontAwesome :icon="faBicycle"/>
                </span>
                <span
                v-else 
                class="toggle-label">
                    {{ $t('home.toggles.bike_trails') }}
                </span>
            </label>
        </div>
        <button class="clear-button">
            {{ $t('home.map.btn_clear_selected') }}
        </button>
        <div class="w-full h-full pt-[100px] lg:pt-[120px] z-40">
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
            <label
            @click="homeStore.toggleShowUnselected" 
            class="flex h-[50px] items-center justify-center bg-primary1 gap-4 cursor-pointer">
                <BaseSwitch 
                :value="homeStore.showUnselected"/>
                <span class="toggle-label">
                    {{ $t('home.toggles.show_unselected_areas') }}
                </span>
            </label>
        </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.toggle {
    @apply flex h-8 items-center px-2 justify-start bg-primary1 gap-2 cursor-pointer rounded-2xl
}
.toggle-label {
    @apply text-xs text-[#FFFFFF80] font-semibold
}
.clear-button {
    @apply w-full absolute bottom-0 h-[50px] flex items-center justify-center bg-primary1 text-white hover:text-secondary hover:bg-dark
}
.toggle-button {
    @apply text-white bg-primary1 md:bg-primary w-10 h-[140px] rotate-180 rounded-r-md flex items-center justify-center gap-x-2 hover:bg-dark
}
.level-button {
    @apply w-full h-[45px] flex items-center text-[#FFFFFF80] bg-dark hover:bg-darkHover uppercase justify-center
}
.level-button.selected {
    @apply bg-secondary hover:bg-secondary text-primary
}
</style>
