<template>
  <div
  class="relative overflow-y-hidden"
  :class="['h-[calc(100vh-100px)] sm:h-[calc(100vh-170px)]']">
    <div id="map"></div>
    <HomeFloodFilter/>
    <HomeMobileFilter/>
    <div class="flex gap-x-4 absolute top-4 left-4">
      <HomeSearchCriteria />
    </div>
  </div>
  <HomeSelections />
</template>

<script lang="ts" setup>
onMounted(() => {
  const map = document.querySelector('#map') as HTMLDivElement
  if (map) {
    useGoogleMapHTML().value = map
    initializeGoogleMap(map)
  }
})
</script>

<style scoped>
#map {
  /* Define Map measures */
  height: 400px;
  width: 50%;

  /* Center Map */
  margin: auto;
}
</style>
