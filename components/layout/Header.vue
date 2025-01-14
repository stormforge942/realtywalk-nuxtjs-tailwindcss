<script setup lang="ts">
const img = useImage()
const route = useRoute()
const isHome = computed(() => route.path === '/');

const homeStore = useHomeStore();
const authStore = useAuthStore();

</script>

<template>
  <div
    class="flex z-40 justify-between px-8 lg:p-4 items-center bg-primary text-white h-[100px] lg:h-[120px] relative"
  >
    <NuxtLink id="logo" to="/" class="min-w-max">
      <template v-if="homeStore.isBuilderSite">
        <NuxtImg
          alt="Builder Posting Service"
          class="h-[56px]"
          src="/images/logo-bps-horizontal.png"
          :placeholder="img('/images/logo-bps-horizontal.png', { f: 'png', blur: 2, q: 50 })"
        />
      </template>
      <template v-else> 
        <NuxtImg
          class="hidden lg:block"
          alt="Realty Walk"
          src="/images/logo-rw.png"
          width="60px"
          height="90px"
          :placeholder="img('/images/logo-rw.png', { f: 'png', blur: 2, q: 50 })"
        />
        <NuxtImg
          class="block lg:hidden"
          alt="Realty Walk"
          src="/images/logo-rw-horizontal.png"
          height="45px"
          :placeholder="
            img('/images/logo-rw-horizontal.png', { f: 'png', blur: 2, q: 50 })
          "
        />
      </template>
    </NuxtLink>
    <div v-if="isHome"
    :class="[homeStore.isBuilderSite && 'lg:absolute lg:top-3 lg:left-[250px] xl:relative xl:top-auto xl:left-auto']" 
    class="hidden lg:block w-full max-w-[460px] px-4">
      {{ homeStore.isBuilderSite ? $t('home.header.caption_bps') : $t('home.header.caption') }}
    </div>
    <BaseMobileDrawer />

    <div class="hidden lg:flex flex-col h-full justify-end">
      <div
      v-if="authStore.authenticated" 
      class="absolute top-0 right-4 flex">
        <HomeSettings />
        <HomeSavedSearchList />
      </div>

      <div
      v-else
      class="absolute top-0 right-4 flex">
        <span
        @click="homeStore.setMapViewMode(false)"
        v-if="!isHome || homeStore.isMapView"
        class="hover:bg-dark group cursor-pointer flex items-center">
          <NuxtLink class="group-hover:text-secondary flex items-center gap-x-1 px-3 uppercase" to="/">
            <svg
            class="w-4 h-4 pb-1 svg-inline--fa fa-grid-2 fa-lg group-hover:text-secondary"
            aria-hidden="true"
            focusable="false"
            data-prefix="fas"
            data-icon="grid-2"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
          >
            <path
              fill="currentColor"
              d="M224 80c0-26.5-21.5-48-48-48L80 32C53.5 32 32 53.5 32 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96zm0 256c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96zM288 80l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48zM480 336c0-26.5-21.5-48-48-48l-96 0c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48l96 0c26.5 0 48-21.5 48-48l0-96z"
            ></path>
          </svg>
          {{ $t('menu.home') }}</NuxtLink>
        </span>
        <ul class="flex bg-dark p-1">
          <li>
            <NuxtLink to="/user/register">{{ $t('menu.register') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/user/signin">{{ $t('menu.sign_in') }}</NuxtLink>
          </li>
        </ul>
      </div>

      <ul class="flex items-center">
        <li class="relative">
          <NuxtLink class="cursor-pointer" id="lookup-button">
            <span @click="eventBus.emit(ADDRESS_LOOKUP)">{{
              $t('menu.address_lookup')
            }}</span>
          </NuxtLink>
          <HomeAddressLookup />
        </li>
        <li>
          <NuxtLink to="/about">{{ $t('menu.about') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink to="/neighborhoods">{{
            $t('menu.neighborhoods')
          }}</NuxtLink>
        </li>
        <li v-if="homeStore.isBuilderSite">
          <NuxtLink to="/builders">{{ $t('menu.builder') }}</NuxtLink>
        </li>
        <li @click="eventBus.emit(REPORT_MODAL, true)">
          <NuxtLink class="cursor-pointer">{{
            $t('menu.report_bug')
          }}</NuxtLink>
        </li>
        <BaseWatchDemo />
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
a:not([id='logo']) {
  @apply px-2 w-full hover:text-secondary;
}
li {
  @apply flex items-center text-center;
}
li:not(:first-of-type)::before {
  content: '|';
  @apply block text-secondary opacity-50;
}
</style>
