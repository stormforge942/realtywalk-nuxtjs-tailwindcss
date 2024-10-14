<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";

const homeStore = useHomeStore();
const propertyStore = usePropertyStore();

const infiniteHandler = ($state: any) => {
    if (propertyStore.page > propertyStore.lastPropertyPage) {
    return;
    }
    propertyStore.fetchProperty(true, $state);
}


const onClickSearch = () => {

}

watch(() => [
    propertyStore.sortBy,
    propertyStore.sortOrder,
    homeStore.isListView,
    homeStore.showResult,
], () => {
    propertyStore.fetchProperty(false, infiniteHandler)
})

onMounted(() => {
    eventBus.on(SEARCH_CRITERIA, () => {
        propertyStore.fetchProperty(false, infiniteHandler)
    })
})

onUnmounted(() => {
    eventBus.off(SEARCH_CRITERIA)
})
</script>

<template>
    <div
    :class="homeStore.showResult ? 'h-[calc(100vh-200px)] md:h-[calc(100vh-170px)]' : 'h-0'" 
    class="absolute top-[200px] md:top-[100px] lg:top-[120px] left-0 w-screen md:left-[320px] md:w-[calc(100vw-320px)] bg-white overflow-hidden">
        <div class="w-full h-full pt-0 md:pt-[60px] px-0 md:px-5">
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
                <HomePropertyMap />
            </template>
            <template v-else>
                <div v-if="propertyStore.isLoading" class="w-full h-full flex items-center justify-center">
                    <BaseRippleProgress/>
                </div>
                <div v-else >
                    <div class="leading-[30px] text-xl px-4">{{ $t('home.result.total_found', { total: propertyStore.totalProperties }) }}</div>
                    <HomePropertySortMenu />
                    <div class="max-h-[calc(100vh-270px)] overflow-y-scroll no-scrollbar flex flex-col">
                        <HomePropertyListItem 
                        :key="item.pri || item.id" 
                        :property="item"
                        v-for="item in propertyStore.properties"/>
                    </div>
                    <InfiniteLoading class="hidden" :distance="10" @infinite="infiniteHandler">
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
            </template>
        </div>
    </div>
</template>