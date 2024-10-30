<script setup lang="ts">
const route = useRoute()
const homeStore = useHomeStore()
const builderStore = useBuilderStore()

const slug = computed(() => (route.params.slug as string[] || []).join('/'))

builderStore.fetchSingleBuilderItem(slug.value)

const builder = computed(() => builderStore.curBuilder)

const builderLogos = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builder_logo"))
const builderDocuments = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builder_documents"))
const builderPhotos = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builders"))

useHead({
  title: homeStore.appName,
})

definePageMeta({
    middleware: ['builder']
})
</script>

<template>
    <div
    class="flex justify-center items-center h-[calc(100vh-100px)] sm:h-[calc(100vh-170px)]" 
    v-if="builderStore.isLoading">
        <BaseRippleProgress />
    </div>
    <div v-else class="flex flex-col lg:flex-row bg-gray-300">
        <div class="w-full lg:w-1/3">
            <BuilderdetailsGallery />
        </div>
        <div class="w-full lg:w-2/3">
            <div class="py-[50px] px-8">
                <div class="max-w-[480px] md:max-w-screen-sm lg:max-w-none mx-auto">
                    <NuxtImg
                    v-if="builderLogos.length > 0" 
                    :src="builderLogos[0].fullUrl"
                    />
                    <div v-html="builder.item?.address"></div>
                </div>
            </div>
            <div class="px-8 py-12 bg-white">
                <div class="max-w-[480px] md:max-w-screen-sm lg:max-w-none mx-auto flex flex-col gap-y-4">
                    <BuilderdetailsInfo/>
                    <BuilderdetailsCommunity />
                    <BuilderdetailsActiveListing />
                    <BuilderdetailsPastListing />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>

a {
  @apply text-primary1 hover:text-primary cursor-pointer hover:underline normal-case;
}

</style>