<script setup lang="ts">

const homeStore = useHomeStore()
const builderStore = useBuilderStore()
const builder = computed(() => builderStore.curBuilder)

const builderLogos = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builder_logo"))
const builderDocuments = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builder_documents"))
const builderPhotos = computed(() => (builder.value.item?.media || []).filter(m => m.collection_name == "builders"))

const noImgUrl = homeStore.isBuilderSite ? '/images/property_no_img_bps.png' : '/images/property_no_img.png'

const gallery = computed(() => {
    let gallery = []

    for (let i = 0; i < builderPhotos.value.length; i++) {
        const image = builderPhotos.value[i];
        gallery.push({ type: 'image', url: image.fullUrl });
    }

    (builder.value.item?.video_gallery || []).sort((a, b) => {
        if (a.position === null || a.position === '') {
            return 1;
        } else if (b.position === null || b.position === '') {
            return -1;
        }
        return parseInt(a.position) - parseInt(b.position);
    });

    for (let i = 0; i < (builder.value.item?.video_gallery || []).length; i++) {
        const video = builder.value.item?.video_gallery[i];
        video.type = 'video';
        if (video.poster === null) {
            video.poster = noImgUrl;
        }
        if (video.position !== null && video.position !== '' && builderPhotos.value.length) {
            gallery.splice(video.position, 0, video);
        } else {
            gallery.push(video)
        }
    }

    return gallery
})

</script>


<template>
    <div v-if="gallery.length">
        <template v-for="(item, index) in gallery">
            <NuxtLink
                v-if="item?.type === 'video'"
                data-lg-size="1280-720"
                :data-src="item.url"
                :data-poster="item?.poster">
                <NuxtImg :src="item?.poster"/>
            </NuxtLink>
            <NuxtLink 
                v-else-if="item?.type === 'image'"  
                :data-src="item?.url"
                >
                <NuxtImg :src="item?.url"/>
            </NuxtLink>
        </template>
    </div>
    <div v-else>
        <NuxtImg
        class="w-full" 
        :src="noImgUrl"/>
    </div>
</template>