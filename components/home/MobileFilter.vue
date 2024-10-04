<script setup lang="ts">
const homeStore = useHomeStore()
</script>


<template>
    <div class="flex flex-col gap-[1px] bg-dark md:hidden w-full absolute top-0">
        <div class="grid grid-cols-2 w-full gap-[1px]">
            <button 
            @click="homeStore.showResult = false"
            :class="!homeStore.showResult && 'selected'"
            class="gradient-button ">{{homeStore.showResult ? $t('home.map.btn_back_to_neighborhoods') : $t('home.map.btn_neighborhoods') }}</button>
            <button 
            @click="homeStore.showResult = true"
            :class="homeStore.showResult && 'selected'"
            class="gradient-button ">{{ $t('home.map.btn_results') }}</button>
        </div>
        <div class="flex w-full gap-x-[1px]">
            <button 
            @click="homeStore.toggleShowFloodZones()"
            :class="homeStore.showFloodZones && 'selected'"
            class="filter-button">
                {{ $t('home.toggles.flood_planes') }}
            </button>
            <button 
            @click="homeStore.toggleShowSchoolZones()"
            :class="homeStore.showSchoolZones && 'selected'"
            class="filter-button">
                {{ $t('home.toggles.school_zones') }}
            </button>
            <button
            @click="homeStore.toggleShowBikeTrails()" 
            :class="homeStore.showBikeTrails && 'selected'"
            class="filter-button">
                {{ $t('home.toggles.bike_trails') }}
            </button>
        </div>
        <div v-if="homeStore.showSchoolZones" class="flex w-full gap-[1px]">
            <button 
            @click="homeStore.showElementarySchool = !homeStore.showElementarySchool"
            class="school-button"
            :class="homeStore.showElementarySchool ? 'bg-purple-400 selected' : 'bg-primary1'"
            >
                {{$t('home.toggles.elementary')}}
            </button>
            <button 
            @click="homeStore.showMiddleSchool = !homeStore.showMiddleSchool"
            class="school-button"
            :class="homeStore.showMiddleSchool ? 'bg-orange-400 selected' : 'bg-primary1'"
            >
                {{ $t('home.toggles.middleschool')}}
            </button>
            <button
            @click="homeStore.showHighSchool = !homeStore.showHighSchool" 
            class="school-button"
            :class="homeStore.showHighSchool ? 'bg-green-400 selected' : 'bg-primary1'"
            >
                {{ $t('home.toggles.highschool') }}
            </button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.gradient-button {
    @apply h-[50px] bg-primary1 text-white text-xl hover:bg-primary
}
.gradient-button.selected {
    @apply bg-secondary
}
.filter-button {
    @apply w-full h-10 flex items-center justify-center text-[#FFFFFF80] text-sm font-semibold bg-primary1
}
.filter-button.selected {
    @apply text-secondary bg-darkHover
}
.school-button {
    @apply w-full h-9 flex items-center justify-center text-[#FFFFFF80] text-sm font-semibold
}
.school-button.selected {
    @apply text-white
}
</style>