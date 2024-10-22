<script lang="ts" setup>
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

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
            images = ['/images/property_no_img_thumb.png']
        }
        return images
    } else {
        return ['/images/property_no_img_thumb.png']
    }
})


const onClickPrev = () => {
    if(curIndex.value > 0) curIndex.value = curIndex.value - 1
    // imgContainerRef.value?.scrollBy({
    //     left: -600,
    //     behavior: 'smooth'
    // })
    if(imgContainerRef.value) {
        imgContainerRef.value.scrollLeft = curIndex.value * 600
    }
}

const onClickNext = () => {
    if(curIndex.value < imageUrls.value.length - 1) curIndex.value = curIndex.value + 1
    // imgContainerRef.value?.scrollBy({
    //     left: 600,
    //     behavior: 'smooth'
    // })
    if(imgContainerRef.value) {
        imgContainerRef.value.scrollLeft = curIndex.value * 600
    }
}

const showPrevButton = computed(() => curIndex.value > 0);
const showNextButton = computed(() => curIndex.value < imageUrls.value.length - 1);

</script>

<template>
    <div
    style="height: 400px;" 
    class="relative w-full">
       <div
       ref="imgContainerRef"
       class="flex overflow-x-auto no-scrollbar scroll-smooth">
            <NuxtImg 
            style="height: 400px; aspect-ratio: 3/2"
            :key="url" v-for="url in imageUrls" :src="url"/>
       </div>
        <button
        @click="onClickPrev()" 
        style="top:40%"
        v-if="showPrevButton"
        class="w-14 h-14 bg-primary text-secondary absolute left-0 hover:bg-primary1">
            <FontAwesome class="scale-150" :icon="faAngleLeft"/>
        </button>
        <button
        @click="onClickNext()" 
        style="top:40%"
        v-if="showNextButton"
        class="w-14 h-14 bg-primary text-secondary absolute right-0 hover:bg-primary1">
            <FontAwesome class="scale-150" :icon="faAngleRight"/>
        </button>
    </div>
</template>