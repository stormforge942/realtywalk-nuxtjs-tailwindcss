<script setup lang="ts">
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const route = useRoute()
const propertyStore = usePropertyStore()
const searchQuery = route.query.q as string

type SortOrder = 'asc' | 'desc'

const sortOrderPrice = ref<SortOrder>('desc')
const sortOrderAddress = ref<SortOrder>('desc')
const sortOrderNeighbor = ref<SortOrder>('desc')

const onSortPrice = () => {
    propertyStore.sortBy = 'price'
    sortOrderPrice.value = sortOrderPrice.value === 'asc' ? 'desc' : 'asc'
    propertyStore.sortOrder = sortOrderPrice.value
    setTimeout(() => {
        propertyStore.fetchAddressLookUp(searchQuery)
    }, 300)
    localStorage.setItem('sortOrderPrice', sortOrderPrice.value)
}

const onSortAddress = () => {
    propertyStore.sortBy = 'address'
    sortOrderAddress.value = sortOrderAddress.value === 'asc' ? 'desc' : 'asc'
    propertyStore.sortOrder = sortOrderAddress.value
    setTimeout(() => {
        propertyStore.fetchAddressLookUp(searchQuery)
    }, 300)
    localStorage.setItem('sortOrderAddress', sortOrderAddress.value)
}

const onSortNeighbor = () => {
    propertyStore.sortBy = 'neighborhood'
    sortOrderNeighbor.value = sortOrderNeighbor.value === 'asc' ? 'desc' : 'asc'
    propertyStore.sortOrder = sortOrderNeighbor.value
    setTimeout(() => {
        propertyStore.fetchAddressLookUp(searchQuery)
    }, 300)
    localStorage.setItem('sortOrderNeighbor', sortOrderNeighbor.value)
}

onMounted(() => {
    sortOrderPrice.value = localStorage.getItem('sortOrderPrice')as SortOrder
    sortOrderAddress.value = localStorage.getItem('sortOrderAddress')as SortOrder
    sortOrderNeighbor.value = localStorage.getItem('sortOrderNeighbor')as SortOrder
})
</script>

<template>
    <ul class="bg-primary lg:bg-white flex p-2 text-white lg:text-primary mt-4">
        <li class="w-1/4 lg:w-[230px]"><span class="lg:hidden">{{ $t('home.filter.columns.sort_by') }}</span></li>
        <li 
        @click="onSortPrice()"
        class="w-1/4 lg:w-[calc((100%-230px)/5)] lg:underline"
        :class="propertyStore.sortBy === 'price' && 'selected'">
            <span class="hidden lg:inline-block">
                <FontAwesome
                class="pb-[7px]"
                :class="[sortOrderPrice === 'asc' && 'rotate-180']" 
                :icon="faSortDown"/>
            </span>
            {{ $t('home.filter.columns.price') }}
        </li>
        <li
        class="w-1/4 lg:w-[calc(2*(100%-230px)/5)] lg:underline"
        @click="onSortAddress()" 
        :class="propertyStore.sortBy === 'address' && 'selected'">
            <span class="hidden lg:inline-block">
                <FontAwesome
                class="pb-[7px]"
                :class="[sortOrderAddress === 'asc' && 'rotate-180']" 
                :icon="faSortDown"/>
            </span>
            {{ $t('home.filter.columns.address') }}
        </li>
        <li 
        class="w-1/4 lg:w-[calc(2*(100%-230px)/5)] lg:underline"
        @click="onSortNeighbor()" 
        :class="propertyStore.sortBy === 'neighborhood' && 'selected'">
            <span class="hidden lg:inline-block">
                <FontAwesome
                class="pb-[7px]"
                :class="[sortOrderNeighbor === 'asc' && 'rotate-180']" 
                :icon="faSortDown"/>
            </span>
            <span class="hidden lg:inline-flex">{{ $t('home.filter.columns.sub_neighborhood') }}</span>
            <span class="lg:hidden">{{ $t('home.filter.columns.neighborhood') }}</span>
        </li>
    </ul>
</template>

<style lang="css" scoped>
/* li:not(:first-of-type)::before {
  content: '|';
  @apply block text-secondary opacity-50;
} */
 li {
    @apply inline-flex justify-center lg:justify-start border-secondary gap-x-1
 }
 li:not(:first-child):not(:last-child) {
    @apply border-x lg:border-none
 }
 li:not(:first-child) {
    @apply hover:underline cursor-pointer hover:text-secondary
 }
 li.selected {
    @apply text-secondary underline
 }
</style>