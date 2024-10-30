<script setup lang="ts">
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';


const props = defineProps<{
  item: BuilderItem
}>()

const isExpand = ref<boolean>(true)

const curPage = ref<number>(1)
const isLoading = ref<boolean>(false)
const total = Math.ceil(props.item.properties_count / 10)
const allItems = ref<PropertyItem[]>([])
const items = computed(() =>  allItems.value.slice((curPage.value - 1) * 10, curPage.value * 10))

const builderStore = useBuilderStore()

const onToggle = () => {
  isExpand.value = !isExpand.value
  try {
    if(allItems.value.length !== 0) return
    isLoading.value = true
    builderStore.fetchBuilderProperty(props.item.id, curPage.value)
    .then(result => {
      allItems.value = result.properties
    })
    .finally(() => {
      isLoading.value = false
    })
  } finally {

  }
}

</script>

<template>
  <div
    class="flex flex-col border-b border-primary mt-2"
  >
  <div class="flex items-center group cursor-pointer">
    <div
    @click="onToggle()" 
    class="text-xl w-12 h-6 pb-2 flex items-center justify-center">
      <FontAwesome 
      v-if="item.properties_count > 0"
      :icon="isExpand ? faPlus : faMinus"/>
    </div>
    <div class="flex gap-x-4 items-center p-4">
      <NuxtLink :to="item.path_url" class="text-3xl group-hover:underline capitalize">{{ props.item.name }}</NuxtLink>
      <span class="bg-dark px-2 text-white font-semibold capitalize">{{ $t('builder.list.n_properties', {n: props.item.properties_count}) }}</span>
    </div>
  </div>
  <div
  :class="[isExpand ? 'h-0 opacity-0 mb-0' : 'mb-4 h-max opacity-100']" 
  class="flex flex-col ml-[66px] gap-2 overflow-y-hidden">
    <template v-if="isLoading">
      <div class="flex w-full justify-center my-10">
        <BaseRippleProgress />
      </div>
    </template>
    <template v-else>
      <NuxtLink 
      class="text-primary hover:underline capitalize"
      :to="property.alt_path_url" 
      v-for="property in items">
        {{ property.full_address }}
      </NuxtLink>
      <div v-if="total > 1" class="mx-auto">
        <BasePagination :is-big="false" v-model="curPage" :total-pages="total"/>
      </div>
    </template>
  </div>
  </div>
</template>
