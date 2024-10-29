<script setup lang="ts">

const route = useRoute()
const propertyStore = usePropertyStore()

const slug = computed(() => (route.params.slug as string[] || []).join('/'))

propertyStore.fetchNeighborItem(slug.value)

const neighborhood = computed(() => propertyStore.selectedNeighbor)

useHead({
    title: 'Realty WALK'
})
</script>

<template>
    <div
    class="flex justify-center items-center h-[calc(100vh-100px)] sm:h-[calc(100vh-170px)]" 
    v-if="propertyStore.isLoading">
        <BaseRippleProgress />
    </div>
    <div v-else class="flex flex-col">
        <ClientOnly>
            <NeighborMap :show-neighbors="true" :clickable-neighbors="true" :disable-label="true"/>
        </ClientOnly>
            <NeighborTitlebar />
            <div class="w-full">
                <div class="max-w-screen-lg mx-auto gap-4 py-5 px-5 lg:px-0 flex flex-col">
                    <div class="w-full" >
                        <NeighborAncestors />
                    </div>
                    <div class="w-full flex flex-col md:flex-row gap-8">
                        <div class="w-full md:w-3/5">
                            <NeighborTree v-if="neighborhood?.zoom"/>
                            <NeighborSchools v-else/>
                        </div>
                        <div class="w-full md:w-2/5">
                            <NeighborLinks />
                        </div>
                    </div>
                </div>
            </div>
    </div>
</template>