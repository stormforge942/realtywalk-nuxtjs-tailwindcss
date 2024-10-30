<script lang="ts" setup>
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const homeStore = useHomeStore()
const propertyStore = usePropertyStore()
const curIndex = ref(0)
const imgContainerRef = ref<HTMLDivElement>()

const imageUrls = computed(() => {
    if(propertyStore.selectedProperty) {
        let images: string[] = []
        if(propertyStore.selectedProperty.type === 1 && propertyStore.selectedProperty.media) {
            propertyStore.selectedProperty.media.forEach(item => images.push(item.fullUrl))
        } else if(propertyStore.selectedProperty.type === 0 && propertyStore.selectedProperty.image_urls) {
            images = [...propertyStore.selectedProperty.image_urls]
        } else {
            images = homeStore.isBuilderSite ? ['/images/property_no_img_bps.png'] : ['/images/property_no_img.png']
        }
        return images
    } else {
        return homeStore.isBuilderSite ? ['/images/property_no_img_bps.png'] : ['/images/property_no_img.png']
    }
})

const showPrevButton = ref(false);
const showNextButton = ref(true);

const failedImgs = ref<string[]>([])

const onClickPrev = () => {
    if(curIndex.value > 0) curIndex.value = curIndex.value - 1
    if(imgContainerRef.value) {
        imgContainerRef.value.scrollLeft = curIndex.value * 540

        showPrevButton.value = imgContainerRef.value.scrollLeft > 540
        showNextButton.value = true
    }
}

const onClickNext = () => {
    if(curIndex.value < imageUrls.value.length - 1) curIndex.value = curIndex.value + 1
    if(imgContainerRef.value) {
        imgContainerRef.value.scrollLeft = curIndex.value * 540

        showPrevButton.value = true
        showNextButton.value = imgContainerRef.value.scrollLeft + imgContainerRef.value.clientWidth + 540 <= imgContainerRef.value.scrollWidth
    }
}

</script>

<template>
    <div
    style="height: 400px;" 
    class="relative w-full">
       <div
       ref="imgContainerRef"
       class="flex overflow-x-auto no-scrollbar scroll-smooth">
            <NuxtImg 
            class="h-[400px] min-w-[540px] max-w-[540px] border border-primary1"
            @error="failedImgs.push(url)"
            :key="url" v-for="url in imageUrls" 
            :src="failedImgs.includes(url) ? 
            homeStore.isBuilderSite ? 
            '/images/property_no_img_bps.png' : 
            '/images/property_no_img.png' : 
            url"/>
       </div>
        <button
        @click="onClickPrev()" 
        v-if="showPrevButton"
        class="w-14 h-14 bg-primary text-secondary absolute left-0 hover:bg-primary1 top-[40%] hover:border-white hover:border">
            <FontAwesome class="scale-150" :icon="faAngleLeft"/>
        </button>
        <button
        @click="onClickNext()" 
        v-if="showNextButton"
        class="w-14 h-14 bg-primary text-secondary absolute right-0 hover:bg-primary1 top-[40%] hover:border-white hover:border">
            <FontAwesome class="scale-150" :icon="faAngleRight"/>
        </button>
    </div>
</template>