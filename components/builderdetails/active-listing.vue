<script setup lang="ts">

const builderStore = useBuilderStore()

const builder = computed(() => builderStore.curBuilder)

watch(
    () => [builderStore.curBuilder.curActivePage],
    () => {
        builderStore.fetchActiveListing()
    })
</script>

<template>
    <h4 class="font-semibold text-xl">{{ $t('builder.singleProperty.sectionTitles.title_3') }}</h4>
    <template v-if="builder.loadingActive">
        <div class="flex justify-center my-10">
            <BaseRippleProgress />
        </div>
    </template>
    <template v-else>
        <template v-if="builder.activeListings.length">
            <BasePagination is-big 
            v-if="builder.totalActivePage > 1"
            v-model="builder.curActivePage" 
            :total-pages="builder.totalActivePage"/>
            <BuilderdetailsSortMenu :is-active="true"/>
            <div v-if="builderStore.isActiveGrid" class="flex flex-col w-full">
                <LookupItem :key="item.id" v-for="item in builder.activeListings" :item="item" hide-status/>
            </div>
            <div v-else class="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 xl:grid-cols-3">
                <LookupGridItem :key="item.id" v-for="item in builder.activeListings" :item="item"/>
            </div>
        </template>
        <template v-else>
            No records found
        </template>
    </template>
</template>