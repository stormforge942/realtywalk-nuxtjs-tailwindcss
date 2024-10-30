<script setup lang="ts">
import { debounce } from 'lodash-es';
import { useBuilderStore } from '~/stores/builderStore';


definePageMeta({
  layout: false,
})

const builderStore = useBuilderStore()
const homeStore = useHomeStore()

useHead({
  title: `Builders List - ${homeStore.appName}`,
})


onBeforeMount(() => {
  builderStore.fetchBuilders()
})

watch(
  () => [
    builderStore.curPage,
    builderStore.search,
  ], 
debounce(() => {
  builderStore.fetchBuilders()
}, 300))
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('builder.title') }}</template>
    <BuilderHome />
  </NuxtLayout>
</template>
