<script setup lang="ts">
import { debounce } from 'lodash-es';


definePageMeta({
  layout: false,
})

useHead({
  title: 'Neigborhoods List - Realty WALK',
})

const neighborStore = useNeighborStore()

onBeforeMount(() => {
  neighborStore.fetchNeigbhorItems()
})

watch(
  () => [
    neighborStore.curPage,
    neighborStore.search,
  ], 
debounce(() => {
  neighborStore.fetchNeigbhorItems()
}, 300))
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('builder.list.searchBy.help') }}</template>
    <NeighborhoodHome />
  </NuxtLayout>
</template>
