<script setup lang="ts">
const config = useRuntimeConfig()
useHead({
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_MAPS_API_KEY}&v=weekly&libraries=places,geometry,marker,core,geocoding,drawing,visualization`,
      defer: true,
      async: false,
    },
    
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <BaseReportBugModal />
  <BaseWatchDemoModal />
</template>
