<template>
    <div class="flex flex-col bg-primary p-5">
        <div class="border-b border-white text-white text-3xl pb-3">
            Local Links & Attractions
        </div>
        <div v-if="links.length" class="flex flex-col gap-2 pt-4">
            <div v-for="link in links" :key="link.url" class="bg-white rounded-md border border-white">
                <NuxtImg v-if="link.image" :src="link.image" :alt="link.label || link.title" class="w-full rounded-t-md"/>
                <div class="p-5 flex flex-col gap-2">
                    <NuxtLink
                    class="text-xl hover:underline text-primary"  
                    :to="'//' + link.url.replace(/(^\w+:|^)\/\//, '')">{{ link.label || link.title || link.url }}</NuxtLink>
                    <p class="text-gray-600">{{ trimText(link.description, 100) }}</p>
                    <small class="text-gray-600">{{ getDomain(link.url) }}</small>
                </div>
            </div>
        </div>
        <div v-else class="text-white text-center px-12 pt-5">
            {{ $t('neighborhood.list.empty_link') }}
        </div>
    </div>
</template>

<script setup lang="ts">

const propertyStore = usePropertyStore()
const links = computed(() => {
    if (!propertyStore.selectedNeighbor || !propertyStore.selectedNeighbor.all_links) {
        return [];
    }

    const uniqueLinks = new Map();

    propertyStore.selectedNeighbor.all_links.forEach(link => {
        if ((!link.status || link.status == '200') && link.url) {
            if (!uniqueLinks.has(link.url)) {
                uniqueLinks.set(link.url, link);
            }
        }
    });

    return Array.from(uniqueLinks.values());
})
    
</script>