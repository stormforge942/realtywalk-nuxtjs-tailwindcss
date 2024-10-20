<script setup lang="ts">
import type { SelectOption } from '../base/Select.vue';

const homeStore = useHomeStore();
const propertyStore = usePropertyStore()
const {t} = useI18n()

const PRICE_OPTION: SelectOption<number>[] = [
    { label: '$25000', value: 25000 },
    { label: '$50000', value: 50000 },
    { label: '$75000', value: 75000 },
    { label: '$10000', value: 10000 },
    { label: '$125000', value: 125000 },
    { label: '$150000', value: 150000 },
    { label: '$175000', value: 175000 },
    { label: '$200000', value: 200000 },
    { label: '$225000', value: 225000 },
    { label: '$250000', value: 250000 },
    { label: '$275000', value: 275000 },
    { label: '$300000', value: 300000 },
    { label: '$325000', value: 325000 },
    { label: '$350000', value: 350000 },
    { label: '$375000', value: 375000 },
    { label: '$400000', value: 400000 },
    { label: '$425000', value: 425000 },
    { label: '$450000', value: 450000 },
    { label: '$475000', value: 475000 },
    { label: '$500000', value: 500000 },
    { label: '$525000', value: 525000 },
    { label: '$550000', value: 550000 },
    { label: '$575000', value: 575000 },
    { label: '$600000', value: 600000 },
    { label: '$625000', value: 625000 },
    { label: '$650000', value: 650000 },
    { label: '$675000', value: 675000 },
    { label: '$700000', value: 700000 },
    { label: '$725000', value: 725000 },
    { label: '$750000', value: 750000 },
    { label: '$775000', value: 775000 },
    { label: '$800000', value: 800000 },
    { label: '$825000', value: 825000 },
    { label: '$850000', value: 850000 },
    { label: '$875000', value: 875000 },
    { label: '$900000', value: 900000 },
    { label: '$925000', value: 925000 },
    { label: '$950000', value: 950000 },
    { label: '$975000', value: 975000 },
    { label: '$1000000', value: 1000000 },
    { label: '$1250000', value: 1250000 },
    { label: '$1500000', value: 1500000 },
    { label: '$1750000', value: 1750000 },
    { label: '$2000000', value: 2000000 },
    { label: '$2250000', value: 2250000 },
    { label: '$2500000', value: 2500000 },
]
const MIN_PRICE_OPTION: SelectOption<number>[] = [
    { label: t('home.filter.minimum_price'), value: MIN_VALUE },
    ...PRICE_OPTION
]
const MAX_PRICE_OPTION: SelectOption<number>[] = [
    { label: t('home.filter.maximum_price'), value: MAX_VALUE },
    ...PRICE_OPTION,
]
const LISTING_STATUS: SelectOption<LISTING_STATUS_VALUE>[] = [
    { label: t('home.filter.criteria.listing_status.options.any'), value: 'any' },
    { label: t('home.filter.criteria.listing_status.options.active'), value: 'active' },
    { label: t('home.filter.criteria.listing_status.options.pending'), value: 'pending' },
    { label: t('home.filter.criteria.listing_status.options.pending_continue'), value: 'pending_continue' },
    { label: t('home.filter.criteria.listing_status.options.option_pending'), value: 'option_pending' },
    { label: t('home.filter.criteria.listing_status.options.completed'), value: 'completed' },
    { label: t('home.filter.criteria.listing_status.options.tobe_completed'), value: 'tobe_completed' },
    { label: t('home.filter.criteria.listing_status.options.under_construction'), value: 'under_construction' },
]
const PROPERTY_TYPE: SelectOption<PROPERTY_TYPE_VALUE>[] = [
    { label: t('home.filter.criteria.property_type.options.any'), value: 'any' },
    { label: t('home.filter.criteria.property_type.options.single_family'), value: 'single_family' },
    { label: t('home.filter.criteria.property_type.options.townhouse_condo'), value: 'townhouse_condo' },
    { label: t('home.filter.criteria.property_type.options.multifamily'), value: 'multifamily' },
    { label: t('home.filter.criteria.property_type.options.country_homes'), value: 'country_homes' },
    { label: t('home.filter.criteria.property_type.options.mid_hi_rise_condo'), value: 'mid_hi_rise_condo' },
    { label: t('home.filter.criteria.property_type.options.neue_wave'), value: 'neue_wave' },
    { label: t('home.filter.criteria.property_type.options.rental'), value: 'rental' },
    { label: t('home.filter.criteria.property_type.options.lots'), value: 'lots' },
]
const BEDROOM: SelectOption<number>[] = [
    { label: t('home.filter.criteria.bedrooms.options.any_min'), value: MIN_VALUE },
    ...Array(9).fill(0).map((_, id) => (
        { label: t('home.filter.criteria.bedrooms.options.bed', { n: id + 1 }), value: id + 1 }))
]
const FULL_BATHROOM: SelectOption<number>[] = [
    { label: t('home.filter.criteria.bathrooms.options.any_full'), value: MIN_VALUE },
    ...Array(5).fill(0).map((_, id) => (
        { label: t('home.filter.criteria.bathrooms.options.full_bathroom', { n: id + 1 }), value: id + 1 }))
]
const HALF_BATHROOM: SelectOption<number>[] = [
    { label: t('home.filter.criteria.bathrooms.options.any_half'), value: MIN_VALUE },
    ...Array(5).fill(0).map((_, id) => (
        { label: t('home.filter.criteria.bathrooms.options.half_bathroom', { n: id + 1 }), value: id + 1 }))
]

const SQUARE_FEET: SelectOption<number>[] = [
    { label: '500', value: 500 },
    { label: '700', value: 750 },
    { label: '1,000', value: 1000 },
    { label: '1,250', value: 1250 },
    { label: '1,500', value: 1500 },
    { label: '1,750', value: 1750 },
    { label: '2,000', value: 2000 },
    { label: '2,250', value: 2250 },
    { label: '2,500', value: 2500 },
    { label: '2,750', value: 2750 },
    { label: '3,000', value: 3000 },
    { label: '3,500', value: 3500 },
    { label: '4,000', value: 4000 },
    { label: '5,000', value: 5000 },
    { label: '7,500', value: 7500 },
]
const MIN_SQUARE_FEET: SelectOption<number>[] = [
    { label: t('home.filter.criteria.square_feet.options.any_min'), value: MIN_VALUE },
    ...SQUARE_FEET
]
const MAX_SQUARE_FEET: SelectOption<number>[] = [
    { label: t('home.filter.criteria.square_feet.options.any_max'), value: MAX_VALUE },
    ...SQUARE_FEET
]
const GARAGE_CAPACITY: SelectOption<number>[] = [
    { label: t('home.filter.criteria.garage_capacity.options.any'), value: MIN_VALUE },
    { label: '1+', value: 1 },
    { label: '2+', value: 2 },
    { label: '3+', value: 3 },
    { label: '4+', value: 4 },
]
const MIN_STORIES: SelectOption<number>[] = [
    { label: t('home.filter.criteria.stories.options.any_min'), value: MIN_VALUE },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
]
const MAX_STORIES: SelectOption<number>[] = [
    { label: t('home.filter.criteria.stories.options.any_max'), value: MAX_VALUE },
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
]

const onClickSearch = () => {
    homeStore.showResult = true
    homeStore.showSearch = window.innerWidth >= 1024
    eventBus.emit(SEARCH_CRITERIA)
}

const onClickClear = () => {
    propertyStore.clearSearchCriteria();
    eventBus.emit(SEARCH_CRITERIA)
}
</script>

<template>
    <div
    :class="homeStore.showSearch ? ` h-[calc(100vh-100px)] lg:h-[calc(100vh-120px)]` : 'h-0'" 
    class="bg-white shadow-md left-0 top-[100px] lg:top-[120px] w-screen lg:w-80 fixed duration-300 overflow-hidden z-20">
        <div class="flex flex-col gap-4 mt-20 mx-4 max-h-[calc(100vh-320px)] overflow-y-scroll no-scrollbar">
            <HomeNeighborSearch />
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.minPrice"
            :options="MIN_PRICE_OPTION"/>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.maxPrice"
            :options="MAX_PRICE_OPTION"/>
            <span class="text-primary">{{ t('home.filter.criteria.listing_status.label') }}</span>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.listingStatus"
            :options="LISTING_STATUS"/>
            <span class="text-primary">{{ t('home.filter.criteria.property_type.label') }}</span>
            <BaseSelect 
            :multiple="true"
            v-model="propertyStore.propertyType"
            :options="PROPERTY_TYPE"/>
            <span class="text-primary">{{ t('home.filter.criteria.bedrooms.label') }}</span>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.bedroomCount"
            :options="BEDROOM"/>
            <span class="text-primary">{{ t('home.filter.criteria.bathrooms.label') }}</span>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.fullBathRoomCount"
            :options="FULL_BATHROOM"/>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.halfBathRoomCount"
            :options="HALF_BATHROOM"/>
            <span class="text-primary">{{ t('home.filter.criteria.square_feet.label') }}</span>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.minSquareFeetCount"
            :options="MIN_SQUARE_FEET"/>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.maxSquareFeetCount"
            :options="MAX_SQUARE_FEET"/>
            <span class="text-primary">{{ t('home.filter.criteria.garage_capacity.label') }}</span>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.garageCapacity"
            :options="GARAGE_CAPACITY"/>
            <span class="text-primary">{{ t('home.filter.criteria.stories.label') }}</span>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.minStory"
            :options="MIN_STORIES"/>
            <BaseSelect 
            :multiple="false"
            v-model="propertyStore.maxStory"
            :options="MAX_STORIES"/>
            <BaseCheckbox color="primary" v-model="propertyStore.hasPool">
                <span class="text-primary mt-1">{{ t('home.filter.criteria.include_pool.label') }}</span>
            </BaseCheckbox>
            <BaseCheckbox color="primary" v-model="propertyStore.hasElevator">
                <span class="text-primary mt-1">{{ t('home.filter.criteria.include_elevator.label') }}</span>
            </BaseCheckbox>
        </div>
        <div class="mx-4 flex flex-col gap-4 mt-4">
            <button type="submit" @click="onClickSearch()">{{ t('home.map.btn_results') }}</button>
            <button class="white" @click="onClickClear()">{{ t('home.map.btn_clear_selected') }}</button>
        </div>
    </div>
</template>