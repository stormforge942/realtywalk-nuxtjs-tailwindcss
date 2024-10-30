<script setup lang="ts">

const authStore = useAuthStore()
const homeStore = useHomeStore()

</script>

<template>
  <div
    class="hidden sm:flex px-16 justify-center items-center text-white h-[70px] lg:h-[50px] bg-primary"
  >
    <div
    v-if="homeStore.isBuilderSite" 
    class="text-sm w-[200px] lg:w-[280px] text-center">
      &copy; {{ new Date().getFullYear() }} Builder Posting Service &#124; {{ $t('footer.copyright') }}
    </div>
    <div v-else class="text-sm w-[200px] lg:w-[280px] text-center">
      &copy; {{ new Date().getFullYear() }} Realty Walk &#124; {{ $t('footer.copyright') }}
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
