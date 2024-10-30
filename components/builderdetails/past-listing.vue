<script setup lang="ts">

const builderStore = useBuilderStore()

const builder = computed(() => builderStore.curBuilder)

watch(
    () => [builderStore.curBuilder.curPastPage],
    () => {
        builderStore.fetchPastListing()
    })
</script>

<template>
    <h4 class="font-semibold text-xl">{{ $t('builder.singleProperty.sectionTitles.title_4') }}</h4>
    <template v-if="builder.loadingPast">
        <div class="flex justify-center my-10">
            <BaseRippleProgress />
        </div>
    </template>
    <template v-else>
        <template v-if="builder.pastListings.length">
            <BasePagination is-big 
            v-if="builder.totalPastPage > 1"
            v-model="builder.curPastPage" 
            :total-pages="builder.totalPastPage"/>
            <BuilderdetailsSortMenu :is-active="false"/>

            <div v-if="builderStore.isPastGrid" class="flex flex-col w-full">
                <LookupItem :key="item.id" v-for="item in builder.pastListings" :item="item" hide-status/>
            </div>
            <div v-else class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-3">
                <LookupGridItem :key="item.id" v-for="item in builder.pastListings" :item="item"/>
            </div>
        </template>
        <template v-else>
            No records found
        </template>
    </template>
</template>