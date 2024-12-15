<script setup lang="ts">

const authStore = useAuthStore()
const homeStore = useHomeStore()

const route = useRoute()
const img = useImage()


const isHomePath = computed(() => route.path === '/')

</script>

<template>
  <div
  :class="[isHomePath ? 'h-[70px] lg:h-[50px] hidden sm:flex' : 'h-max py-6 flex flex-col md:flex-row gap-4']"
    class="px-16 justify-center items-center text-white bg-primary"
  >
  <div class="text-sm text-center lg:text-start flex flex-col gap-4">
    <div v-if="!isHomePath" class="flex j">
        <NuxtImg
        v-if="homeStore.isBuilderSite"
          alt="Builder Posting Service"
          src="/images/logo-bps-horizontal.png"
          class="w-[200px] lg:w-[240px]"
          :placeholder="img('/images/logo-bps-horizontal.png', { f: 'png', blur: 2, q: 50 })"
        />
        <NuxtImg
        v-else
          class="w-[200px] lg:w-[240px]"
          alt="Realty Walk"
          src="/images/logo-rw-horizontal.png"
          :placeholder="img('/images/logo-rw-horizontal.png', { f: 'png', blur: 2, q: 50 })"
        />
    </div>
    <div
    v-if="homeStore.isBuilderSite">
      &copy; {{ new Date().getFullYear() }} Builder Posting Service &#124; {{ $t('footer.copyright') }}
    </div>
    <div v-else>
      &copy; {{ new Date().getFullYear() }} Realty Walk &#124; {{ $t('footer.copyright') }}
    </div>
  </div>  
    <div>
      <NuxtLink to="/">{{ $t('menu.home') }}</NuxtLink>
      <NuxtLink to="/about">{{ $t('menu.about') }}</NuxtLink>
      <NuxtLink to="/neighborhoods">{{ $t('menu.neighborhoods') }}</NuxtLink>
      <NuxtLink v-if="homeStore.isBuilderSite" to="/builders">{{ $t('menu.builder') }}</NuxtLink>

      <template v-if="authStore.authenticated">
        <NuxtLink to="/user/favorites">{{ $t('menu.favorite') }}</NuxtLink>
        <NuxtLink to="/user/profile">{{ $t('menu.my_profile') }}</NuxtLink>
        <span @click="eventBus.emit(LOG_OUT)"><NuxtLink to="/">{{ $t('menu.log_out') }}</NuxtLink></span>
      </template>

      <template v-else>
        <NuxtLink to="/user/register">{{ $t('menu.register') }}</NuxtLink>
        <NuxtLink to="/user/signin">{{ $t('menu.sign_in') }}</NuxtLink>
      </template>

      <NuxtLink to="/report-bug">{{ $t('menu.report_bug') }}</NuxtLink>
    </div>
  </div>
</template>

<style lang="css" scoped>
a {
  @apply inline-block px-2 mx-2 w-max hover:text-secondary normal-case;
}
</style>
