<script setup lang="ts">
const propertyStore = usePropertyStore()

</script>

<template>
    <ul class="bg-primary flex p-2 text-white">
        <li class="w-[220px]">{{ $t('home.filter.columns.sort_by') }}</li>
        <li 
        @click="propertyStore.sortBy = 'price'"
        class="w-[calc((100%-212px)/5)]"
        :class="propertyStore.sortBy === 'price' && 'selected'">
            {{ $t('home.filter.columns.price') }}
        </li>
        <li
        class="w-[calc(2*(100%-212px)/5)]"
        @click="propertyStore.sortBy = 'address'" 
        :class="propertyStore.sortBy === 'address' && 'selected'">
            {{ $t('home.filter.columns.address') }}
        </li>
        <li 
        class="w-[calc(2*(100%-212px)/5)]"
        @click="propertyStore.sortBy = 'neighborhood'" 
        :class="propertyStore.sortBy === 'neighborhood' && 'selected'">
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
    @apply inline-flex justify-center border-secondary 
 }
 li:not(:first-child):not(:last-child) {
    @apply border-x
 }
 li:not(:first-child) {
    @apply hover:underline cursor-pointer hover:text-secondary
 }
 li.selected {
    @apply text-secondary underline
 }
</style>