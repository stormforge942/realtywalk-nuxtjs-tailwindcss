<script setup lang="ts">
interface Props {
    item: {
        featured_image_url: string
        id: number
        link_list: string[]
        page_url: string
        path_url: string
        title: string
        media: any[]
        seourl: {
            created_at: string
            entity_id: number
            entity_type: string
            id: number
            path: string
            updated_at: string
        }
    }
}

const props = defineProps<Props>()
const emits = defineEmits(['click'])

const isLoading = ref(true);
const isError = ref(false);

const onImageLoad = () => {
    isLoading.value = false;
    isError.value = false
}
const onError = () => {
    isError.value = true
    isLoading.value = false
}
</script>

<template>
    <div
    @click="emits('click')"
    :class="[isError && 'bg-primary1']" 
    class="w-full h-full relative aspect-square overflow-hidden cursor-pointer border border-primary group hover:shadow-lg">
        <div
        :class="[isLoading && !isError ? 'opacity-100' : 'opacity-0']"
        class="absolute w-full h-full flex items-center justify-center aspect-square bg-white">
            <BaseCircleProgress size="xl"/>
        </div>
        <NuxtImg
        @load="onImageLoad()" 
        @error="onError()"
        v-if="!isError && props.item?.featured_image_url"
        class="w-full aspect-square group-hover:scale-110" :alt="props.item.title" :src="props.item?.featured_image_url"/>
        <div v-if="!isLoading" :class="[
            'absolute z-10 top-0 left-0', 
            'px-[15%] bg-[#00000040] hover:bg-transparent w-full h-full flex items-center justify-center text-center text-white text-2xl font-semibold']">{{ props.item.title }}</div>
    </div>
</template>