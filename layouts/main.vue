<script setup lang="ts">
import Footer from '~/components/layout/Footer.vue'
import Header from '~/components/layout/Header.vue'
</script>

<template>
  <Header />
  <div class="flex gap-x-6 max-w-screen-lg mx-auto mt-6">
    <div class="hidden lg:flex flex-col gap-y-[100px]">
      <div class="p-5 bg-primary">
        <NuxtImg width="70" alt="Realty Walk" src="/images/logo-rw.png" />
      </div>
      <NuxtImg width="110" alt="Footprint" src="/images/footprints-vert.png" />
    </div>
    <div class="w-full">
      <div class="bg-primary text-white px-5 py-2 text-3xl">
        <slot name="header" />
      </div>
      <slot />
    </div>
  </div>
  <Footer />
</template>
