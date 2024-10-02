<script setup lang="ts">
const img = useImage()

</script>

<template>
  <div
    class="flex justify-between px-8 lg:p-4 items-center bg-primary text-white h-[100px] lg:h-[120px]"
  >
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
      :placeholder="img('/images/logo-rw-horizontal.png', { f: 'png', blur: 2, q: 50 })"
    />
    <div class="hidden lg:block w-full max-w-[460px] px-4">
      {{ $t('home.header.caption') }}
    </div>
    <BaseMobileDrawer />

    <div class="hidden lg:flex flex-col h-full justify-end">
      <div class="absolute top-0 right-4 flex">
        <button class="px-3 hover:bg-dark group flex items-center gap-x-1">
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
          <span class="group-hover:text-secondary uppercase">{{
            $t('menu.home')
          }}</span>
        </button>
        <ul class="flex bg-dark p-1">
          <li>
            <NuxtLink to="/users/register">{{ $t('menu.register') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink to="/users/signin">{{ $t('menu.sign_in') }}</NuxtLink>
          </li>
        </ul>
      </div>
      <ul class="flex items-center">
        <li class="relative">
          <NuxtLink class="cursor-pointer" id="lookup-button">
            <span @click="eventBus.emit(ADDRESS_LOOKUP)">{{ $t('menu.address_lookup') }}</span>
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
        <li>
          <NuxtLink to="/builders">{{ $t('menu.builder') }}</NuxtLink>
        </li>
        <li @click="eventBus.emit(REPORT_MODAL)">
          <NuxtLink class="cursor-pointer">{{ $t('menu.report_bug') }}</NuxtLink>
        </li>
        <BaseWatchDemo />
      </ul>
    </div>
  </div>
</template>

<style lang="css" scoped>
a {
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
