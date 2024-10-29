<script setup lang="ts">
const isOpen = ref(false)

const propertyStore = usePropertyStore()
const neighborhood = computed(() => propertyStore.selectedNeighbor)

const toggle = (val: boolean) => {
  isOpen.value = val
}

onMounted(() => {
  eventBus.on(VIEW_PROPERTY, () => {
    isOpen.value = true

    if(neighborhood.value?.slug) {
      propertyStore.page = 1
      propertyStore.fetchNeighborhoodProperty(neighborhood.value.slug)
    }
  })

})

onUnmounted(() => {
  eventBus.off(VIEW_PROPERTY)
})

watch(
  () => [propertyStore.page],
  () => {
    if(neighborhood.value?.slug) {
      propertyStore.fetchNeighborhoodProperty(neighborhood.value.slug)
    }
})
</script>

<template>
  <BaseModal
  :isOpen="isOpen" @toggle="toggle">
    <template #title>{{ `${neighborhood?.title} Properties` }}</template>
    <template #body>
      <div class="max-w-screen-lg w-full">
        <div v-if="propertyStore.isLoading" class="w-full min-w-[80vw] h-full flex items-center justify-center">
          <BaseRippleProgress/>
        </div>
        <template v-else>
          <LookupItem 
            :key="item.pri || item.id" 
            :item="item"
            v-for="item in propertyStore.properties"/>
          <div 
          v-if="propertyStore.totalPages > 1"
          class="w-full flex justify-center">
            <BasePagination is-big :totalPages="propertyStore.totalPages" v-model="propertyStore.page"/>
          </div>
        </template>
      </div>
    </template>
  </BaseModal>
</template>
