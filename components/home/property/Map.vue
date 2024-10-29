<template>
    <div class="w-full h-full relative z-0">
        <div class="w-full h-[calc(100%-30px)] g-map" id="results-map"></div>
        <div
        :class="[reloading ? 'bottom-20' : '-bottom-20']"
        class="absolute left-[calc(50%-50px)] z-[1000] bg-white p-2 inline-flex items-center gap-2 rounded-md shadow-md">
            <BaseCircleProgress size="md"/>
            <span>Applying</span>
        </div>
    </div>
</template>

<script setup lang="ts">

import L, { type LatLngExpression, Map } from 'leaflet'

const {t} = useI18n()
const route = useRoute()
const config = useRuntimeConfig().public

const loading = computed(() => propertyStore.mapProperties.loading)
const reloading = computed(() => propertyStore.mapProperties.reloading)
const markersLoading = ref(true)
const geometryLoading = ref(false)
const markers = ref<any>(undefined)
const map = ref<Map>();
const propertyStore = usePropertyStore()
const homeStore = useHomeStore()

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
  return t("property.list_details.to_be_determined_abbr");
};

const addPropertyMarkers = async() => {
    if(!map.value) return
    if(markers.value === undefined) {
        markers.value = L.layerGroup().addTo(map.value)
    }
    markers.value.clearLayers()
    if(!propertyStore.mapProperties.data.length) {
        markersLoading.value = false
        return
    }
    markersLoading.value = true
    const iconSettings = {
        mapIconUrl: '<svg data-name="Home Icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20.26 25" class="property-map-marker"><polygon class="polygon-home" points="0.25 0.25 20.01 0.25 20.01 14.66 10.45 24.65 0.25 14.66 0.25 0.25" style="stroke:#fff;stroke-miterlimit:10;stroke-width:0.5px"/><polygon points="15.31 7.86 15.31 3.62 12.18 3.62 12.18 4.71 10.12 2.64 2.06 10.66 4.06 10.66 4.06 15.63 7.47 15.63 7.47 10.66 12.46 10.66 12.46 15.63 16.07 15.63 16.07 10.61 18.04 10.61 15.31 7.86" style="fill:#fff"/></svg>',
        mapIconColor: '#cc756b',
        mapIconColorInnerCircle: '#fff',
        pinInnerCircleRadius: 48
    }

    const icon = L.divIcon({
        html: L.Util.template(iconSettings.mapIconUrl, iconSettings),
        iconSize: [20, 14],
        popupAnchor: [0, -15],
    });

    propertyStore.mapProperties.data.forEach(property => {
        if (!property || !property.lat || !property.lng) return;

        const latlng: LatLngExpression = [property.lat, property.lng];
        const marker = L.marker(latlng, { icon });
        const path = `${window.location.host}${property.pu}`;
        const popupContent = `<div><a class="hover:underline text-md" href="${path}">${property.fa}</a><div>${formatPrice(property)}</div></div>`;
        const popup = marker.bindPopup(popupContent).openPopup();

        marker.on('mouseover', function () {
          popup.openPopup();
        });

        marker.on('popupopen', function () {
          const element = marker.getElement();
          if (element) {
            element.classList.add('active');
          }
        });

        marker.on('popupclose', function () {
          const element = marker.getElement();
          if (element) {
            element.classList.remove('active');
          }
        });

        marker.on("click", () => {
          if (!path) {
            popup.openPopup();
            return;
          }
          window.open(path, '_blank')?.focus()
        });

        markers.value.addLayer(marker);
    })
}

watch(() => [
    propertyStore.mapProperties.data,
    homeStore.isListView
],
() => {
    addPropertyMarkers()
})

const resizeLeafletMap = () => {
    setTimeout(() => {
    if (map.value !== undefined) {
        try {
        map.value.invalidateSize()
        } catch (err) {
        //
        }
    }
    }, 500);
}


const resetPosition = () => {
    homeStore.property.map = {...homeStore.property.map, ...DEFAULT_MAP}
}

const drawPolygons = (geometry_list = []) => {
    if(!map.value) return
    const validToParse = (str: string) => {
    try { JSON.parse(str); return true; } catch (e) { return false; }
    };

    const mapGeometry = (polygon: any) => {
    return {
        type: "Feature",
        geometry: validToParse(polygon.geometry) ? JSON.parse(polygon.geometry) : polygon.geometry
    }
    };

    const geojsonData: any = {
        type: 'FeatureCollection',
        features: geometry_list.map(item => mapGeometry(item))
    };

    const geoJsonLayer = L.geoJSON(geojsonData, {
    style: feature => ({
        color: '#60a4df',
        weight: 3,
        fillOpacity: .4
    })
    }).addTo(map.value);

    if (geoJsonLayer.getBounds().isValid()) {
        map.value.fitBounds(geoJsonLayer.getBounds(), {
            padding: [20, 20],
            maxZoom: 16
        });
    } else {
        resetPosition();
        const propertyMap = homeStore.property.map;
        const centerLat = typeof propertyMap.center.lat === 'function' ? map.value.getCenter().lat : propertyMap.center.lat;
        const centerLng = typeof propertyMap.center.lng === 'function' ? map.value.getCenter().lng : propertyMap.center.lng;
        const center: LatLngExpression = [centerLat, centerLng];
        map.value.setView(center, propertyMap.zoom);
    }
}

const setGeoJson = async () => {
    geometryLoading.value = true
    const ids = homeStore.selectedPolygons

    if (ids === null || ids === undefined || (Array.isArray(ids) && ids.length === 0)) {
        geometryLoading.value = false;
        drawPolygons();
        return;
    }

    try {
        const data = await $fetch<any>(`${config.API_ENDPOINT}/api/polygons/geometry`,
        {
            method: 'POST',
            body: {ids}
        });
        drawPolygons(data);
    } catch (err) {
    } finally {
        geometryLoading.value = false;
    }
}

const getMapInfo = () => {
    if(!map.value) return null
    const bounds = map.value.getBounds().pad(0.05);
    const southWest = bounds.getSouthWest();
    const northEast = bounds.getNorthEast();

    return {
        zoom: map.value.getZoom(),
        bounds: {
            min_lat: southWest.lat,
            min_lng: southWest.lng,
            max_lat: northEast.lat,
            max_lng: northEast.lng,
        }
    }
}

const updateEvent = () => {
    if(!map.value) return
    propertyStore.mapProperties.mapInfo = getMapInfo()
    homeStore.property.map.center = map.value.getCenter()
    homeStore.property.map.zoom = map.value.getZoom()
    eventBus.emit(SEARCH_CRITERIA)
}


onMounted(async () => {
    const mapPosition = homeStore.property.map
    const center: LatLngExpression = [mapPosition.center.lat, mapPosition.center.lng];
    map.value = L.map('results-map', { preferCanvas: true, renderer: L.canvas() }).setView(center, mapPosition.zoom);

    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map.value);
    
    setGeoJson()
    updateEvent()
    resizeLeafletMap();

    map.value.addEventListener('zoomend', updateEvent);
    map.value.addEventListener('dragend', updateEvent);
    map.value.addEventListener('load', addPropertyMarkers)
    propertyStore.mapProperties.componentLoaded = true
    window.addEventListener("resize", resizeLeafletMap);
})

onUnmounted(() => {
    propertyStore.mapProperties.componentLoaded = false
    map.value?.removeEventListener('zoomend', updateEvent)
    map.value?.removeEventListener('dragend', updateEvent)
    map.value?.removeEventListener('load', addPropertyMarkers)
    window.removeEventListener('resize', resizeLeafletMap)
    map.value?.remove()
})

</script>

<style lang="css">

.property-map-marker .polygon-home {
    fill: #268541;
    transition: fill .3s ease;
}
.leaflet-div-icon {
    background: transparent;
    border: none;
}
.active .property-map-marker .polygon-home {
    fill: #012e55;
}
</style>