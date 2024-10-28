<script setup lang="ts">

const route = useRoute()
const propertyStore = usePropertyStore()

const slug = computed(() => (route.params.slug as string[]).join('/'))

propertyStore.fetchPropertyItem(slug.value)
</script>

<template>
    <div
    class="flex justify-center items-center h-[calc(100vh-100px)] sm:h-[calc(100vh-170px)]" 
    v-if="propertyStore.isLoading">
        <BaseRippleProgress />
    </div>
    <div v-else class="flex flex-col">
        <PropertyGallery/>
        <PropertyDetails />
        <PropertyDescribe />
    </div>
</template>