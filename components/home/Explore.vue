<script setup lang="ts">
import InfiniteLoading from "v3-infinite-loading";

const homeStore = useHomeStore();
const exploreStore = useExploreStore()

const infiniteHandler = ($state: any) => {
    if (exploreStore.page > exploreStore.lastPage) {
        return;
    }
    exploreStore.loadPolygons(true, $state);
}

onMounted(() => {
    exploreStore.loadPolygons().then(() => {
        exploreStore.isLoading = false
    })
})
</script>

<template>
    <div class="w-full flex flex-col p-4 text-primary ">
        <button
        @click="homeStore.setMapViewMode(true)" 
        class="self-end hover:text-dark">{{ $t('home.start_screen.btn_go_to_map') }}</button>
        <h1 class="self-center pt-6 pb-4 text-4xl">{{ $t('home.start_screen.title') }}</h1>
    </div>
    <div class="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-8">
        <HomeNeighborItem 
        :key="item.id" 
        :item="item"
        @click="exploreStore.goToMap(item.id, item.title)" 
        v-for="item in exploreStore.polygons"/>
        <InfiniteLoading
        @distance="10" @infinite="infiniteHandler">
            <div slot="spinner">
                <BaseCircleProgress size="xs"/>
            </div>
            <div slot="no-more">
            {{ $t("home.result.infinite.no_more") }}
            </div>
            <div slot="no-results">
            {{ $t("home.result.infinite.no_results") }}
            </div>
      </InfiniteLoading>
    </div>
</template>