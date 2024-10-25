<script setup lang="ts">
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


const props = defineProps<{
  item: NeighborHoodItem
}>()

const isExpand = ref(false)

const curPage = ref(1)
const total = Math.ceil(props.item.properties_pagination.total/10)
const items = computed(() =>  props.item.properties.slice((curPage.value - 1) * 10, curPage.value * 10))

</script>

<template>
  <div
    class="flex flex-col border-b border-primary mt-2"
  >
  <div class="flex items-center group cursor-pointer">
    <div
    @click="isExpand = !isExpand" 
    class="text-xl w-12 h-6 pb-2 flex items-center justify-center">
      <FontAwesome 
      v-if="item.properties?.length"
      :icon="isExpand ? faPlus : faMinus"/>
    </div>
    <div class="flex gap-x-4 items-center p-4">
      <NuxtLink :to="item.path_url" class="text-3xl group-hover:underline capitalize">{{ props.item.title }}</NuxtLink>
      <span class="bg-primary1 px-2 text-white font-semibold">{{ $t('home.map.level', {n: props.item.zoom}) }}</span>
      <span class="bg-dark px-2 text-white font-semibold">{{ $t('neighborhood.list.n_properties', {n: props.item.properties_pagination.total}) }}</span>
    </div>
  </div>
  <div
  :class="[isExpand ? 'h-0 opacity-0' : 'h-max opacity-100']" 
  class="flex flex-col ml-[66px] gap-2 mb-4 overflow-y-hidden">
    <NuxtLink 
    class="text-orange-700 hover:underline capitalize"
    :to="property.alt_path_url" 
    v-for="property in items">
      {{ property.full_address }}
    </NuxtLink>
    <div v-if="total > 1" class="mx-auto">
      <BasePagination :is-big="false" v-model="curPage" :total-pages="total"/>
    </div>
  </div>
  </div>
</template>
