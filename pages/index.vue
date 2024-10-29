<script setup lang="ts">

const homeStore = useHomeStore();
const propertyStore = usePropertyStore()

useHead({
  title: 'Home - Realty WALK'
})

watch(() => [homeStore.showResult],
([newValue]) => {
    if(newValue) {
        propertyStore.fetchProperty(false, null, null)
        propertyStore.fetchMapProperties(false)
    }
})
</script>

<template>
  <HomeExplore v-if="!homeStore.isMapView"/>
  <HomeMap v-if="homeStore.isMapView"/>
</template>
