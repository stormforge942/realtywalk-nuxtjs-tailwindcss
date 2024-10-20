<template>
  <div
  class="relative overflow-y-hidden"
  :class="['h-[calc(100vh-100px)] sm:h-[calc(100vh-170px)]']">
    <div id="map" class="w-full h-[calc(100vh-100px)] sm:h-[calc(100vh-170px)] g-map"></div>
    <HomeSearchCriteria />
    <HomeFloodFilter/>
    <HomeMobileFilter/>
    <HomeLoading v-if="homeStore.isLoading"/>
  </div>
  <HomeSelections />
  <HomeSearchPanel />
  <HomeSaveSearch />
  <HomeProperty/>
  <HomeWelcomeScreen v-if="homeStore.showInstruction"/>
</template>

<script lang="ts" setup>
import Swal from "sweetalert2"

const router = useRouter();
const homeStore = useHomeStore();
const config = useRuntimeConfig().public
const {t} = useI18n();

const onResizeMap = () => {
  console.log("Resizing")
  if(homeStore.showResult && !homeStore.showSearch && window.innerWidth >= 1024) {
    homeStore.showSearch = true;
  }
  if(homeStore.showResult && homeStore.showSearch && window.innerWidth < 1024) {
    homeStore.showSearch = false;
  }
}

onMounted(async() => {
  const map = document.querySelector('#map') as HTMLDivElement
  if (map) {
    await initializeGoogleMap(map);
  }
  
  const selectedParents = localStorage.getItem("selectedParents");
  if(selectedParents) {
    homeStore.selectedParents = JSON.parse(selectedParents);
  }

  const selectedPolygons = localStorage.getItem("selectedPolygons");
  if(selectedPolygons) {
    homeStore.selectedPolygons = JSON.parse(selectedPolygons);
  }

  const ancestorPolygons = localStorage.getItem("ancestorPolygons");
  if(ancestorPolygons) {
    homeStore.ancestorPolygons = JSON.parse(ancestorPolygons);
  }

  homeStore.fetchFloodZoneLegends();
  homeStore.fetchSchoolZoneLegends();

  homeStore.showInstruction = localStorage.getItem('SHOW_INSTRUCTION') === 'true'

  window.addEventListener('resize', onResizeMap);
})

watch(() => [homeStore.selectedPolygons], () => {
  localStorage.setItem('selectedPolygons', JSON.stringify(homeStore.selectedPolygons));
  localStorage.setItem('ancestorPolygons', JSON.stringify(homeStore.ancestorPolygons));
  localStorage.setItem('selectedParents', JSON.stringify(homeStore.selectedParents));
  setPolygonDataStyling();
  getPolygonList(false);
  console.log(homeStore.polygonTrunks)
})

watch(() => 
[
  homeStore.showSchoolZones, 
  homeStore.showBikeTrails, 
  homeStore.showFloodZones,
  homeStore.show100Year,
  homeStore.show100YearBFE,
  homeStore.show100YearShallow,
  homeStore.show100YearSheetFlow,
  homeStore.show100YearStormWaves,
  homeStore.show500Year,
  homeStore.activeSchoolZone,
  homeStore.level,
  homeStore.showUnselected,
  homeStore.lastZoomUpdate
], 
() => {
  redrawMap();
  updateFloodZones();
  updateSchoolZones();
  updateBikeLayer();
})

eventBus.on(SHOW_POPUP_L3ALERT, async () => {
  const showPopupL3Alert = async () => {
    const swal = await Swal.mixin({
      text: t("home.alerts.polygon_level_3"),
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'LOG IN',
      denyButtonText: 'SIGN UP',
      cancelButtonText: 'PROCEED',
      customClass: {
        denyButton: 'swal2-confirm',
      }
    }).fire();

    return await new Promise((resolve, reject) => {
      if (swal.isConfirmed) {
        router.push('/user/signin');
        reject(false);
      } else if (swal.isDenied) {
        router.push('/user/register');
        reject(false);
      } else {
        resolve(true);
      }
    });
  }
  homeStore.l3Confirmed = await showPopupL3Alert() as boolean;
})

eventBus.on(CLEAR_ALL_FILTERS, () => {
  homeStore.selectedParents = [];
  homeStore.selectedPolygons = [];
  homeStore.ancestorPolygons = [];
  setPolygonDataStyling();
  homeStore.property.map.selectedPolygons = [];
})

onUnmounted(() => {
  eventBus.off(CLEAR_ALL_FILTERS)
  eventBus.off(SAVE_SEARCH)
  eventBus.off(RESULTS_COUNT)
  eventBus.off(SHOW_POPUP_L3ALERT)
  eventBus.off(APPLY_SAVED_SEARCH)

  window.removeEventListener('resize', onResizeMap)
})


</script>

<style scoped>
</style>
