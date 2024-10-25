<script setup lang="ts">
import { debounce } from "lodash-es";
import InfiniteLoading from "v3-infinite-loading";

const homeStore = useHomeStore();
const propertyStore = usePropertyStore();

const aborter = ref(new AbortController());

const infiniteHandler = ($state: any) => {
    if (propertyStore.page > propertyStore.lastPropertyPage) {
    return;
    }
    propertyStore.fetchProperty(true, $state, aborter.value);
}


const onClickSearch = () => {

}

const fetchProperty = (nextPage: boolean) => {
    if(aborter.value && !aborter.value.signal.aborted) aborter.value.abort()
    aborter.value = new AbortController()
    propertyStore.fetchProperty(nextPage, infiniteHandler, aborter.value);
}


watch(() => [
    propertyStore.sortBy,
    propertyStore.sortOrder,
    propertyStore.polygons,
    propertyStore.bedroomCount,
    propertyStore.fullBathRoomCount,
    propertyStore.garageCapacity,
    propertyStore.halfBathRoomCount,
    propertyStore.hasElevator,
    propertyStore.hasPool,
    propertyStore.listingStatus,
    propertyStore.minStory,
    propertyStore.maxStory,
    propertyStore.minPrice,
    propertyStore.maxPrice,
    propertyStore.minSquareFeetCount,
    propertyStore.maxSquareFeetCount,
    propertyStore.propertyType,
    homeStore.showResult,
], () => {
    eventBus.emit(SEARCH_CRITERIA)
})

onMounted(() => {
    eventBus.on(SEARCH_CRITERIA,debounce(() => {
        fetchProperty(false)
        propertyStore.fetchMapProperties(false)
    }, 300))
})

onUnmounted(() => {
    eventBus.off(SEARCH_CRITERIA)
})
</script>

<template>
    <div
    :class="homeStore.showResult ? 'h-[calc(100vh-200px)] lg:h-[calc(100vh-120px)]' : 'h-0'" 
    class="absolute top-[200px] lg:top-[120px] left-0 w-screen lg:left-[320px] lg:w-[calc(100vw-320px)] bg-white overflow-hidden">
        <div class="w-full h-full pt-0 lg:pt-[60px] px-0 lg:px-5">
            <template v-if="homeStore.isListView">
                <div v-if="!propertyStore.properties && 
                    !propertyStore.mapProperties.data.length && 
                    !propertyStore.mapProperties.loading && 
                    !propertyStore.mapProperties.reloading">
                    <button @click.prevent="onClickSearch()">
                    {{ $t("home.result.btn_search") }}
                    </button>
                </div>
                <div v-else class="leading-[30px] text-xl px-4">{{ $t('home.result.total_found', { total: propertyStore.totalProperties }) }}</div>
                <ClientOnly><HomePropertyMap /></ClientOnly>
                
            </template>
            <template v-else>
                <div v-if="propertyStore.isLoading" class="w-full h-full flex items-center justify-center">
                    <BaseRippleProgress/>
                </div>
                <div v-else >
                    <div class="leading-[30px] text-xl px-4">{{ $t('home.result.total_found', { total: propertyStore.totalProperties }) }}</div>
                    <LookupSortMenu/>
                    <div class="max-h-[calc(100vh-270px)] overflow-y-scroll no-scrollbar flex flex-col">
                        <LookupItem 
                        :key="item.pri || item.id" 
                        :item="item"
                        v-for="item in propertyStore.properties"/>
                        <InfiniteLoading :distance="10" @infinite="infiniteHandler">
                            <div slot="spinner">
                                {{ $t("home.result.infinite.loading") }}
                            </div>
                            <div slot="no-more">
                                {{ $t("home.result.infinite.no_more") }}
                            </div>
                            <div slot="no-results">
                                {{ $t("home.result.infinite.no_more") }}
                            </div>
                        </InfiniteLoading>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>