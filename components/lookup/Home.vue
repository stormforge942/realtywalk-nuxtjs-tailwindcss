<script setup lang="ts">

const route = useRoute()
const propertyStore = usePropertyStore()
const searchQuery = computed(() => route.query.q as string)

propertyStore.fetchAddressLookUp(searchQuery.value)
watch(() => [
    searchQuery.value
], ([newSearch]) => {
    propertyStore.fetchAddressLookUp(newSearch)
})
</script>

<template>
    <div v-if="propertyStore.isLoading"
    class="flex justify-center py-20">
        <BaseRippleProgress />
    </div>
    <div v-else class="flex flex-col p-5">
        <div>{{$t('pages.address_lookup.result_text', {q: searchQuery})}}</div>
        <div v-if="propertyStore.properties.length > 0">
            <LookupSortMenu />
            <LookupItem :key="item.id" :item="item" v-for="item in propertyStore.properties"/>
        </div>
        <div class="text-center p-12" v-else>
            {{ $t('neighborhood.list.not_found') }}
        </div>
    </div>
</template>