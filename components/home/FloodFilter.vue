<script setup lang="ts">
const homeStore = useHomeStore()

</script>

<template>
<div 
:class="[homeStore.showFloodZones? 'bottom-0 sm:bottom-5' : '-bottom-40',
    'absolute flex justify-between items-center flex-wrap',
    'bg-primary gap-1 text-white text-xs',
    'max-w-[640px] w-full mx-auto sm:mx-[calc(50vw-320px)] p-5'
]">
    <span
    @click="homeStore.show100Year = !homeStore.show100Year"
    :class="!homeStore.show100Year && 'line-through'" 
    class="flex gap-x-1 items-center cursor-pointer">
        <span class="w-3 h-3 bg-purple-700 border border-white mb-[2px]"></span>
        {{ $t('home.flood_zones.A') }}
    </span>
    <span
    @click="homeStore.show100YearBFE = !homeStore.show100YearBFE"
    :class="!homeStore.show100YearBFE && 'line-through'" 
    class="flex gap-x-1 items-center cursor-pointer">
        <span class="w-3 h-3 bg-orange-400 border border-white mb-[2px]"></span>
        {{ $t('home.flood_zones.AE') }}
    </span>
    <span
    @click="homeStore.show100YearShallow = !homeStore.show100YearShallow"
    :class="!homeStore.show100YearShallow && 'line-through'" 
    class="flex gap-x-1 items-center cursor-pointer">
        <span class="w-3 h-3 bg-green-400 border border-white mb-[2px]"></span>
        {{ $t('home.flood_zones.AH') }}
    </span>
    <span
    @click="homeStore.show100YearSheetFlow = !homeStore.show100YearSheetFlow"
    :class="!homeStore.show100YearSheetFlow && 'line-through'" 
    class="flex gap-x-1 items-center cursor-pointer">
        <span class="w-3 h-3 bg-orange-500 border border-white mb-[2px]"></span>
        {{ $t('home.flood_zones.AO') }}
    </span>
    <span
    @click="homeStore.show100YearStormWaves = !homeStore.show100YearStormWaves"
    :class="!homeStore.show100YearStormWaves && 'line-through'" 
    class="flex gap-x-1 items-center cursor-pointer">
        <span class="w-3 h-3 bg-orange-700 border border-white mb-[2px]"></span>
        {{ $t('home.flood_zones.AR') }}
    </span>
    <span
    @click="homeStore.show500Year = !homeStore.show500Year"
    :class="!homeStore.show500Year && 'line-through'" 
    class="flex gap-x-1 items-center cursor-pointer">
        <span class="w-3 h-3 bg-purple-500 border border-white mb-[2px]"></span>
        {{ $t('home.flood_zones.VE') }}
    </span>
</div>
</template>