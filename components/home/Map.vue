<template>
  <div>
    <div id="map"></div>
  </div>
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
