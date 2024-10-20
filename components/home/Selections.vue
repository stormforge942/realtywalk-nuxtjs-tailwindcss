<script lang="ts" setup>
import { faAngleRight, faBicycle, faGraduationCap, faWater } from '@fortawesome/free-solid-svg-icons';
const isOpen = ref(false)
const homeStore = useHomeStore();
</script>

<template>
  <div
  :class="[isOpen ? 'right-0' : '-right-full lg:-right-[300px]']"
  class='fixed top-0 w-screen lg:w-[300px] bg-primary h-screen'>
    <div class="w-full h-full relative">
        <div class="w-max h-full flex items-center justify-start fixed lg:absolute right-0 lg:-left-10">
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
        class="hidden lg:flex flex-col xl:flex-row absolute mt-[150px] lg:mt-[130px] gap-2 z-40">
            <label
            @click="homeStore.toggleShowFloodZones" 
            :title="$t('home.toggles.flood_planes')"
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
            :title="$t('home.toggles.school_zones')"
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
                    :color="homeStore.schoolZoneLegends.elementary"
                    :model-value="homeStore.activeSchoolZone === 'elementary'"
                    @update:model-value="homeStore.activeSchoolZone = 'elementary'">
                        <span
                        :title="$t('home.toggles.elementary')"
                        :class="[homeStore.activeSchoolZone === 'elementary' ? 'text-white' : 'text-[#FFFFFF80]', isOpen && 'ml-4']" 
                        class="text-[10px] font-semibold mt-[3px]">
                            <FontAwesome class="text-base" v-if="isOpen" :icon="faGraduationCap"/>
                            <span v-else>{{ $t('home.toggles.elementary') }}</span>
                        </span>
                    </BaseCheckbox>
                    <BaseCheckbox 
                    :color="homeStore.schoolZoneLegends.middleschool"
                    :model-value="homeStore.activeSchoolZone === 'middleschool'"
                    @update:model-value="homeStore.activeSchoolZone = 'middleschool'">
                        <span
                        :title="$t('home.toggles.middleschool')"
                        :class="[homeStore.activeSchoolZone === 'middleschool' ? 'text-white' : 'text-[#FFFFFF80]', isOpen && 'ml-4']" 
                        class="text-[10px] font-semibold mt-[3px]">
                            <FontAwesome class="text-base" v-if="isOpen" :icon="faGraduationCap"/>
                            <span v-else>{{$t('home.toggles.middleschool')}}</span>
                        </span>
                    </BaseCheckbox>
                    <BaseCheckbox
                    :color="homeStore.schoolZoneLegends.highschool"
                    :model-value="homeStore.activeSchoolZone === 'highschool'"
                    @update:model-value="homeStore.activeSchoolZone = 'highschool'">
                        <span
                        :title="$t('home.toggles.highschool')"
                        :class="[homeStore.activeSchoolZone === 'highschool' ? 'text-white' : 'text-[#FFFFFF80]', isOpen && 'ml-4']" 
                        class="text-[10px] font-semibold mt-[3px]">
                            <FontAwesome class="text-base" v-if="isOpen" :icon="faGraduationCap"/>
                            <span v-else>{{$t('home.toggles.highschool')}}</span>
                        </span>
                    </BaseCheckbox>
                </div>
            </div>
            <label
            :title="$t('home.toggles.bike_trails')"
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
        <button
        @click="clearAllSelected()" 
        class="clear-button">
            {{ $t('home.map.btn_clear_selected') }}
        </button>
        <div class="w-full h-full pt-[150px] lg:pt-[120px] z-40">
            <div class="flex">
                <button 
                @click="setPolygonsActiveLevel(0, false, false)"
                :class="['level-button', homeStore.level === 0 && 'selected']">
                    {{ $t('home.map.level1') }}
                </button>
                <button 
                @click="setPolygonsActiveLevel(1, false, false)"
                :class="['level-button', homeStore.level === 1 && 'selected']">
                    {{ $t('home.map.level2') }}
                </button>
                <button 
                @click="setPolygonsActiveLevel(2, false, false)"
                :class="['level-button', homeStore.level === 2 && 'selected']">
                    {{ $t('home.map.level3') }}
                </button>
            </div>
            <label
            :title="$t('home.toggles.show_unselected_areas')"
            @click="homeStore.toggleShowUnselected" 
            class="flex h-[50px] items-center justify-center bg-primary1 gap-4 cursor-pointer">
                <BaseSwitch 
                :value="homeStore.showUnselected"/>
                <span class="toggle-label">
                    {{ $t('home.toggles.show_unselected_areas') }}
                </span>
            </label>
            <div class="overflow-y-scroll max-h-[calc(100vh-265px)] no-scrollbar">
                <HomeTreeNode :key="item" v-for="item in homeStore.polygonTrunks[homeStore.level]" :model="item"/>
            </div>
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
    @apply text-white bg-primary1 lg:bg-primary w-10 h-[140px] rotate-180 rounded-r-md flex items-center justify-center gap-x-2 hover:bg-dark
}
.level-button {
    @apply w-full h-[45px] flex items-center text-[#FFFFFF80] bg-dark hover:bg-darkHover uppercase justify-center
}
.level-button.selected {
    @apply bg-secondary hover:bg-secondary text-primary
}
</style>
