<template>
    <div class="w-full h-full relative z-0">
        <div id="poly-map" class="g-map w-full h-[50vh]"></div>
        <input name="geoJson" type="hidden" v-model="geoJson" />
    </div>
</template>

<script setup lang="ts">

import "leaflet"
import L, { FeatureGroup, Map, type MapOptions } from 'leaflet'
import "leaflet.markercluster";
import "leaflet.fullscreen";
import 'leaflet-draw'
import { debounce } from 'lodash-es';

const props = defineProps({
  showNeighbors: Boolean,
  disableTools: Boolean,
  disableLabel: Boolean,
  disableLinks: Boolean,
  clickableNeighbors: Boolean,
  fullScreen: Boolean,
});

const propertyStore = usePropertyStore()

const initialGeoJson = computed(() => propertyStore.selectedNeighbor?.geometry)
const polygonId = computed(() => propertyStore.selectedNeighbor?.id)
const initialZoom = computed(() => propertyStore.selectedNeighbor?.zoom)

const map = ref<Map>()
const drawLayer = ref<FeatureGroup>()
const zoom = ref<number>(0)
const loadedPolygonIds = ref<any[]>([])
const loadedPolygons = ref<any[]>([])
const geoJson = ref('')
const config = useRuntimeConfig().public

function updateGeoJson() {
    if(!drawLayer.value) return
  const polygons: any[] = [];
  const originalGeoJson: any = drawLayer.value.toGeoJSON();
  originalGeoJson.features.forEach((layer: any) => {
    if (!layer.geometry) {
      console.log('Skipping as it has no geometry', layer);
      return;
    }
    if (layer.geometry.type === "Polygon") {
      polygons.push(layer.geometry.coordinates);
    } else if (layer.geometry.type === "MultiPolygon") {
      layer.geometry.coordinates.forEach((poly: any) => polygons.push(poly));
    }
  });
  geoJson.value = JSON.stringify({
    type: "MultiPolygon",
    coordinates: polygons,
  });
}

function initLoadNeighboringPolygons() {
  const zoomSelect = document.getElementById("zoom");

  if (zoomSelect) {
    zoomSelect.addEventListener('change', onZoomChange);
  }

  zoom.value = initialZoom.value || map.value?.getZoom() || 0;

  if (polygonId) {
    loadedPolygonIds.value.push(polygonId.value);
  }

  if (zoom.value) {
    loadPolygonsInViewport();
  }

  map.value?.addEventListener('zoomend', debounce(loadPolygonsInViewport, 300));
  map.value?.addEventListener('moveend', debounce(loadPolygonsInViewport, 300));
}

const loadPolygonsInViewport = async () => {
    if(!map.value) return
  const bounds = map.value.getBounds();

  if (props.showNeighbors) {
    $fetch<string>(`${config.API_ENDPOINT}/api/polygons/list-points`, {
        method: 'POST',
        body: {
            bounds: [bounds.getSouthWest().lat, bounds.getNorthEast().lng, bounds.getNorthEast().lat, bounds.getSouthWest().lng],
            excludeList: loadedPolygonIds.value,
            zoom: zoom.value,
        }
    })
    .then(result => {
      const data = JSON.parse(result)
        data.forEach((geoData: any) => {
            if(!map.value) return
            const geometry = JSON.parse(geoData.geometry);
            const feature = L.geoJSON(geometry, {
                style: feature => ({ color: '#888888' })
            }).on('click', () => {
                if (props.disableLinks === undefined || props.disableLinks === false) {
                window.location.href = geoData.page_url;
                }
            }).on('mouseover', function () {
                feature.setStyle({ color: '#dddddd' });
            }).on('mouseout', function () {
                feature.resetStyle();
            }).bindTooltip(function () {
                return geoData.title;
            }).addTo(map.value);

            loadedPolygons.value.push(feature);
            loadedPolygonIds.value.push(geoData.id);
        });
    }).catch(err => console.log(err))
  }
}

function onZoomChange(event: any) {
  zoom.value = event.target.value;
  loadedPolygonIds.value = [];
  loadedPolygons.value.forEach(feature => {
    map.value?.removeLayer(feature);
  });
  loadPolygonsInViewport();
}

onMounted(() => {
  const options = props.fullScreen === undefined ? {} : {
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'topleft'
    },
  };
  
  map.value = L.map("poly-map", options as MapOptions).setView([29.760427, -95.369803], 13);

  L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map.value);

  drawLayer.value = L.featureGroup().addTo(map.value);

  console.log("Draw Control",props.disableTools)
  if (!props.disableTools) {
    const drawControl = new L.Control.Draw({
      draw: {
        polygon: {
          allowIntersection: false,
          drawError: {
            color: "#e1e100",
            message: "<strong>Oh snap!<strong> you can't draw that!",
          },
          shapeOptions: {
            color: "red",
          },
        },
        polyline: false,
        circle: false,
        circlemarker: false,
        marker: false,
        rectangle: false,
      },
      edit: {
        featureGroup: drawLayer.value,
      },
    });

    console.log("Draw Control",  drawControl)

    map.value.addControl(drawControl);

    map.value.on("draw:created", (e) => {
      drawLayer.value?.addLayer(e.layer);
      updateGeoJson();
    });

    map.value.on("draw:edited", () => {
      updateGeoJson();
    });

    map.value.on("draw:deleted", () => {
      updateGeoJson();
    });
  }

  let geoJsonData: any = { 'type': 'FeatureCollection', 'features': [] };
  let geoJsonRaw: any = initialGeoJson.value;

  console.log(initialGeoJson)
  
  if (geoJsonRaw) {
    if (typeof geoJsonRaw !== 'object') {
      geoJsonRaw = JSON.parse(geoJsonRaw);
    }
    (geoJsonRaw?.coordinates || []).forEach((coords: any) => geoJsonData.features.push({
      type: 'Feature', geometry: { 'type': 'Polygon', coordinates: coords }
    }));
    
    L.geoJson(geoJsonData, {
      onEachFeature: (feature, layer) => {
        layer.options = layer.options || {};
        drawLayer.value?.addLayer(layer);
      },
    });

    const bounds = drawLayer.value.getBounds()

    map.value.fitBounds(bounds);
    updateGeoJson();
  }

  if (props.showNeighbors) {
    initLoadNeighboringPolygons();
  }
});
</script>