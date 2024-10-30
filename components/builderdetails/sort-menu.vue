<script setup lang="ts">
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
    isActive: boolean
}>()

const STORAGE_PRICE = `builder-sortOrderPrice-${props.isActive}`
const STORAGE_ADDRESS = `builder-sortOrderPrice-${props.isActive}`
const STORAGE_NEIGHBOR = `builder-sortOrderNeighbor-${props.isActive}`

const builderStore = useBuilderStore()

type SortOrder = 'asc' | 'desc'

const sortOrderPrice = ref<SortOrder>('desc')
const sortOrderAddress = ref<SortOrder>('desc')
const sortOrderNeighbor = ref<SortOrder>('desc')

const onSortPrice = () => {
    sortOrderPrice.value = sortOrderPrice.value === 'asc' ? 'desc' : 'asc'
    if(props.isActive) {
        builderStore.sortOrderActive = 'price_from'
        builderStore.sortByActive = sortOrderPrice.value
    } else {
        builderStore.sortOrderPast = 'price_from'
        builderStore.sortByPast = sortOrderPrice.value
    }
    
    setTimeout(() => {
        if(props.isActive) {
            builderStore.fetchActiveListing()
        } else {
            builderStore.fetchPastListing()
        }
    }, 300)
    localStorage.setItem(STORAGE_PRICE, sortOrderPrice.value)
}

const onSortAddress = () => {
    sortOrderAddress.value = sortOrderAddress.value === 'asc' ? 'desc' : 'asc'
    if(props.isActive) {
        builderStore.sortOrderActive = 'address'
        builderStore.sortByActive = sortOrderAddress.value
    } else {
        builderStore.sortOrderPast = 'address'
        builderStore.sortByPast = sortOrderAddress.value
    }
    
    setTimeout(() => {
        if(props.isActive) {
            builderStore.fetchActiveListing()
        } else {
            builderStore.fetchPastListing()
        }
    }, 300)

    localStorage.setItem(STORAGE_ADDRESS, sortOrderAddress.value)
}

const onSortNeighbor = () => {
    sortOrderNeighbor.value = sortOrderNeighbor.value === 'asc' ? 'desc' : 'asc'
    if(props.isActive) {
        builderStore.sortOrderActive = 'neighborhood'
        builderStore.sortByActive = sortOrderNeighbor.value
    } else {
        builderStore.sortOrderPast = 'neighborhood'
        builderStore.sortByPast = sortOrderNeighbor.value
    }
    
    setTimeout(() => {
        if(props.isActive) {
            builderStore.fetchActiveListing()
        } else {
            builderStore.fetchPastListing()
        }
    }, 300)
    localStorage.setItem(STORAGE_NEIGHBOR, sortOrderNeighbor.value)
}

const toggleGrid = () => {
    if(props.isActive) {
        builderStore.isActiveGrid = !builderStore.isActiveGrid
    } else {
        builderStore.isPastGrid = !builderStore.isPastGrid
    }
}

onBeforeMount(() => {
    sortOrderPrice.value = localStorage.getItem(STORAGE_PRICE) as SortOrder
    sortOrderAddress.value = localStorage.getItem(STORAGE_ADDRESS) as SortOrder
    sortOrderNeighbor.value = localStorage.getItem(STORAGE_NEIGHBOR) as SortOrder
})
</script>

<template>
    <ul class="bg-primary1 lg:bg-white flex p-2 text-white lg:text-primary mt-4">
        <li
        class="lg:hidden lg:w-0 w-1/5">
            <span class="lg:hidden">{{ $t('home.filter.columns.sort_by') }}</span>
        </li>
        <li 
        @click="onSortPrice()"
        class="lg:underline w-1/5"
        :class="[isActive ? builderStore.sortOrderActive === 'price_from' : builderStore.sortOrderPast === 'price_from' && 'selected']">
            <span class="hidden lg:inline-block">
                <FontAwesome
                class="pb-[7px]"
                :class="[sortOrderPrice === 'asc' && 'rotate-180']" 
                :icon="faSortDown"/>
            </span>
            {{ $t('home.filter.columns.price') }}
        </li>
        <li
        class="w-1/5 lg:underline"
        @click="onSortAddress()" 
        :class="[isActive ? builderStore.sortOrderActive === 'address' : builderStore.sortOrderPast === 'address' && 'selected']">
            <span class="hidden lg:inline-block">
                <FontAwesome
                class="pb-[7px]"
                :class="[sortOrderAddress === 'asc' && 'rotate-180']" 
                :icon="faSortDown"/>
            </span>
            {{ $t('home.filter.columns.address') }}
        </li>
        <li 
        class="lg:underline hidden opacity-0 lg:opacity-100 lg:w-1/5 lg:inline-block "
        @click="onSortNeighbor()" 
        :class="[isActive ? builderStore.sortOrderActive === 'neighborhood' : builderStore.sortOrderPast === 'neighborhood' && 'selected']">
            <span class="hidden lg:inline-block">
                <FontAwesome
                class="pb-[7px]"
                :class="[sortOrderNeighbor === 'asc' && 'rotate-180']" 
                :icon="faSortDown"/>
            </span>
            <span class="hidden lg:inline-flex">{{ $t('home.filter.columns.sub_neighborhood') }}</span>
        </li>
        <li 
        @click="toggleGrid()"
        class="w-2/5 cursor-pointer">
        <div class="flex justify-center lg:justify-end items-center w-full gap-x-1">
            <span>{{ $t('builder.singleProperty.viewList') }}</span>
            <BaseSwitch :value="isActive? builderStore.isActiveGrid : builderStore.isPastGrid" />
        </div>
        </li>
    </ul>
</template>

<style lang="css" scoped>
/* li:not(:first-of-type)::before {
  content: '|';
  @apply block text-secondary opacity-50;
} */
 li {
    @apply inline-flex justify-center lg:justify-start border-secondary gap-x-1 uppercase
 }
 li:not(:first-child):not(:last-child) {
    @apply border-x lg:border-none
 }
 li:not(:first-child):not(:last-child) {
    @apply hover:underline cursor-pointer hover:text-secondary
 }
 li.selected {
    @apply text-secondary underline
 }
</style>