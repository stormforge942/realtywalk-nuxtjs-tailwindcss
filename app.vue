<script setup lang="ts">
import Swal from 'sweetalert2'
import "v3-infinite-loading/lib/style.css";

const {t} = useI18n()
const config = useRuntimeConfig()
const authStore = useAuthStore()
const homeStore = useHomeStore()
const propertyStore = usePropertyStore()
const exploreStore = useExploreStore()
const neighborStore = useNeighborStore()
const builderStore = useBuilderStore()

useHead({
  link: [
    { rel: 'apple-touch-icon', sizes: '57x57', href: '/favicon/apple-icon-57x57.png' },
    { rel: 'apple-touch-icon', sizes: '60x60', href: '/favicon/apple-icon-60x60.png' },
    { rel: 'apple-touch-icon', sizes: '72x72', href: '/favicon/apple-icon-72x72.png' },
    { rel: 'apple-touch-icon', sizes: '76x76', href: '/favicon/apple-icon-76x76.png' },
    { rel: 'apple-touch-icon', sizes: '114x114', href: '/favicon/apple-icon-114x114.png' },
    { rel: 'apple-touch-icon', sizes: '120x120', href: '/favicon/apple-icon-120x120.png' },
    { rel: 'apple-touch-icon', sizes: '144x144', href: '/favicon/apple-icon-144x144.png' },
    { rel: 'apple-touch-icon', sizes: '152x152', href: '/favicon/apple-icon-152x152.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/favicon/apple-icon-180x180.png' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/favicon/android-icon-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon/favicon-96x96.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon/favicon-16x16.png' },
    { rel: 'manifest', href: '/favicon/manifest.json' },
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#ffffff' }
  ],
  script: [
    {
      src: `https://maps.googleapis.com/maps/api/js?key=${config.public.GOOGLE_MAPS_API_KEY}&libraries=geometry,geocoding,maps,marker,streetView`,
      async: false,
      defer: true,
    },
  ],
})

const API_ENDPOINT = Boolean(config.public.IS_BUILDER) ? config.public.API_ENDPOINT_BUILDER : config.public.API_ENDPOINT
authStore.API_ENDPOINT = API_ENDPOINT
homeStore.API_ENDPOINT = API_ENDPOINT
propertyStore.API_ENDPOINT = API_ENDPOINT
exploreStore.API_ENDPOINT = API_ENDPOINT
neighborStore.API_ENDPOINT = API_ENDPOINT
builderStore.API_ENDPOINT = API_ENDPOINT

homeStore.isBuilderSite = Boolean(config.public.IS_BUILDER)
homeStore.appName = Boolean(config.public.IS_BUILDER) ? t('home.builder_posting') : t('home.realty_walk')

onBeforeMount(() => {
  authStore.user = JSON.parse(localStorage.getItem('user') || 'null') as User
  authStore.token = localStorage.getItem('token') || ''
  authStore.authenticated = authStore.user && !!authStore.token

  if(authStore.authenticated) {
    authStore.fetchSearchList()
    authStore.fetchFavoriteData()
  } else {
    eventBus.emit(LOG_OUT)
  }
})

onMounted(() => {
  eventBus.on(OPEN_LOGIN_NOTIFY, () => {
    if(authStore.authenticated) return
    Swal.mixin({
      text: 'Please login to continue!',
      confirmButtonColor: '#012e55'
    }).fire()
  })

  eventBus.on(LOG_OUT, () => {
    authStore.logout()
    localStorage.setItem('user', 'null')
    localStorage.setItem('token', '')
  })
})

onUnmounted(() => {
  eventBus.off(OPEN_LOGIN_NOTIFY)
  eventBus.off(LOG_OUT)
})

</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <BaseReportBugModal />
  <BaseWatchDemoModal />
  <LookupScheduleViewModal />
  <NeighborPropertyModal />
</template>
