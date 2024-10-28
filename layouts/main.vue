<script setup lang="ts">
const img = useImage()
</script>

<template>
  <div class="w-screen h-screen">
    <LayoutHeader />
    <div class="flex gap-x-6 max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg mx-auto mt-6">
      <div class="hidden lg:flex flex-col gap-y-[100px]">
        <div class="p-5 bg-primary">
          <NuxtImg
            width="70"
            alt="Realty Walk"
            src="/images/logo-rw.png"
            :placeholder="
              img('/images/logo-rw.png', { f: 'png', blur: 2, q: 50 })
            "
          />
        </div>
        <NuxtImg
          width="110"
          alt="Footprint"
          src="/images/footprints-vert.png"
          :placeholder="
            img('/images/footprints-vert.png', { f: 'png', blur: 2, q: 50 })
          "
        />
      </div>
      <div class="w-full">
        <div class="bg-primary text-white px-5 py-2 text-3xl">
          <slot name="header" />
        </div>
        <slot />
      </div>
    </div>
    <LayoutFooter />
  </div>
</template>
