<script setup lang="ts">
definePageMeta({
  layout: false,
})

useHead({
  title: 'About Us',
})

const img = useImage()

const config = useRuntimeConfig()
</script>

<template>
  <NuxtLayout name="main">
    <template #header>{{ $t('pages.about_us.title') }}</template>
    <div class="p-5 flex flex-col gap-y-6 text-black">
      <p>
        A third generation Houstonian and a graduate of Texas A&M University,
        Ray has over 38 years of experience in real estate. Ray has been
        affiliated with several of Houston's premier real estate firms. In 2000,
        he helped build the nation's first on-line brokerage, eRealty.com. They
        helped define how buying and selling homes is transacted today. Ray is a
        leader among his peers, who honored him by naming him a Trustee for the
        Texas Association of Realtors Political Action Committee (TREPAC) in
        2006 through 2009.
      </p>
      <div class="flex flex-col xl:flex-row">
        <div class="w-full text-[28px] text-black italic bg-gray-200 p-10">
          <div>
            "I am very proud that Houston is my hometown. Compare our city to
            others and you will find diversity, spirit, and life like no other."
          </div>
          <div class="mt-6 font-semibold text-end">- Ray Walker</div>
        </div>
        <NuxtImg
          class="w-full"
          alt="Ray Hess"
          src="/images/ray_hess.jpg"
          :placeholder="
            img('/images/ray_hess.jpg', { f: 'jpg', blur: 2, q: 50 })
          "
        />
      </div>
      <p>
        Ray's newest endeavor is his own Brokerage, RealtyWalk. The web site is
        a patented-interactive-map that allows users a new, fun to use way of
        searching for homes.
      </p>
      <div class="flex flex-col">
        <span class="font-semibold">Contact Ray:</span>
        <div>
          Cell: <NuxtLink>{{ config.public.CELLL }}</NuxtLink> | Email:
          <NuxtLink>{{ config.public.EMAIL }}</NuxtLink>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>
