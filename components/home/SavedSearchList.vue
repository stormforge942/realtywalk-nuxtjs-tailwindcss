<template>
    <div class="relative">
        <div
        :class="[open ? 'h-screen pt-[50px] pb-5 opacity-100' : 'h-0 py-0 opacity-0']" 
        class="fixed top-0 right-0 bg-dark overflow-y-hidden min-w-[450px] z-10 px-[30px] ease-in-out">
            <div 
            :key="item.id" 
            @click="onClickSearchItem(item)"
            class="flex justify-between py-2 px-4  cursor-pointer hover:bg-primary1"
            v-for="item in authStore.searchList">
                {{ item.search_name }}
                <FontAwesome 
                :icon="faClose"
                @click="(e: MouseEvent) => {
                    e.stopPropagation()
                    authStore.deleteSearchItem(item.id)
                }" 
                class="text-secondary mt-1"/>
            </div>
        </div>
        <div
        @click="open = !open" 
        :class="[open ? 'bg-primary hover:bg-primary1' : 'bg-dark hover:bg-darkHover']"
        class="inline-flex absolute w-max top-0 right-4 h-10 items-center gap-x-2 cursor-pointer px-4 z-20">
            <span class="text-white uppercase text-sm">{{ $t('home.header.btn_saved_searches') }}</span>
           <FontAwesome
           :class="[open && '-rotate-180']" 
           class="text-secondary pb-2" :icon="faSortDown"/>
        </div>
    </div>

</template>


<script setup lang="ts">
import { faClose, faSortDown } from '@fortawesome/free-solid-svg-icons';

const authStore = useAuthStore()
const homeStore = useHomeStore()
const propertyStore = usePropertyStore()

const open = ref(false)

const onClickSearchItem = (item: SearchItem) => {
    if(item.search_string_criteria) {
        const criteria = JSON.parse(item.search_string_criteria) as SearchCriteria

        if(criteria) {
            homeStore.activeSchoolZone = criteria.activeSchoolZone
            homeStore.isListView = criteria.isListView
            homeStore.isMapView = criteria.isMapView
            homeStore.level = criteria.level
            homeStore.map = criteria.map
            homeStore.show100Year = criteria.show100Year
            homeStore.show100YearBFE = criteria.show100YearBFE
            homeStore.show100YearShallow = criteria.show100YearShallow
            homeStore.show100YearSheetFlow = criteria.show100YearSheetFlow
            homeStore.show100YearStormWaves = criteria.show100YearStormWaves
            homeStore.show500Year = criteria.show500Year
            homeStore.showBikeTrails = criteria.showBikeTrails
            homeStore.showFloodZones = criteria.showFloodZones
            homeStore.showInstruction = criteria.showInstruction
            homeStore.showResult = criteria.showResult
            homeStore.showSchoolZones = criteria.showSchoolZones
            homeStore.showSearch = criteria.showSearch
            homeStore.showUnselected = criteria.showUnselected

            propertyStore.bedroomCount = criteria.bedroomCount
            propertyStore.fullBathRoomCount = criteria.fullBathRoomCount
            propertyStore.garageCapacity = criteria.garageCapacity
            propertyStore.halfBathRoomCount = criteria.halfBathRoomCount
            propertyStore.hasElevator = criteria.hasElevator
            propertyStore.hasPool = criteria.hasPool
            propertyStore.listingStatus = criteria.listingStatus
            propertyStore.maxPrice = criteria.maxPrice
            propertyStore.maxSquareFeetCount = criteria.maxSquareFeetCount
            propertyStore.maxStory = criteria.maxStory
            propertyStore.minPrice = criteria.minPrice
            propertyStore.minSquareFeetCount = criteria.minSquareFeetCount
            propertyStore.minStory = criteria.minStory
            propertyStore.propertyType = criteria.propertyType
            propertyStore.sortBy = criteria.sortBy
            propertyStore.sortOrder = criteria.sortOrder
        }
    }
}

</script>