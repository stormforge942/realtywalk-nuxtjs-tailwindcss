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
            v-model="builder.curActivePage" 
            :total-pages="builder.totalActivePage"/>
            <div class="flex flex-col w-full">
                <LookupItem :key="item.id" v-for="item in builder.activeListings" :item="item" />
            </div>
        </template>
        <template v-else>
            No records found
        </template>
    </template>
</template>