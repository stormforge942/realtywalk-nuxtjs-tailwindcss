<script setup lang="ts">
import { debounce } from 'lodash-es';


definePageMeta({
  layout: false,
})


const neighborStore = useNeighborStore()
const homeStore = useHomeStore()

useHead({
  title: `Neigborhoods List - ${homeStore.appName}`,
})

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
