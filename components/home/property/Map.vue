<template>
    <div class="w-full h-full">
        <!-- <div>
            <BaseRippleProgress />
        </div> -->
        <div id="results-map" class="w-full h-full g-map"></div>
    </div>
</template>

<script setup lang="ts">
const loading = ref(false)
const reloading = ref(false)
const markersLoading = ref(true)
const geometryLoading = ref(false)
const propertyStore = usePropertyStore()

watch(() => [loading, reloading], () => {
    if(!loading && !reloading) {
        addPropertyMarkers();
    }
})

const formatPrice = (property: any) => {
  if (property && property.pfi !== null) {
    if (property.pfi === 2 && property.pt !== null) {
      return `$${property.pf.toLocaleString()} - $${property.pt.toLocaleString()}`;
    } else if (property.pfi === 1) {
      return `$${property.pf.toLocaleString()}`;
    }
  }
  return 'Price TBD';
};

const addPropertyMarkers = () => {
    const map = usePropertyMap().value
    if(!map || !propertyStore.mapProperties.data) return;

    propertyStore.mapProperties.data.forEach(property => {
        if(!property.lat || !property.lng) return;

        const marker = new google.maps.marker.AdvancedMarkerElement({
            map: map,
            position: { lat: property.lat, lng: property.lng },
            title: property.fa
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h5><a href="${property.pu}" target="_blank">${property.fa}</a></h5><p>${formatPrice(property)}</p>`,
        })
    })
}

onMounted(async () => {
    const mapWrapper = document.querySelector('#results-map') as HTMLElement;
    console.log(mapWrapper)
    if(mapWrapper) {
        await initPropertyMap(mapWrapper)
    }
    addPropertyMarkers()
})
</script>
