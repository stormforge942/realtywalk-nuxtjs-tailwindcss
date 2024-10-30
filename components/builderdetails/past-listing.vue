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
            v-model="builder.curPastPage" 
            :total-pages="builder.totalPastPage"/>
            <div class="flex flex-col w-full">
                <LookupItem :key="item.id" v-for="item in builder.pastListings" :item="item" />
            </div>
        </template>
        <template v-else>
            No records found
        </template>
    </template>
</template>