<script setup lang="ts">
import { faCalendarDays, faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
    item: PropertyItem
}

const props = defineProps<Props>()
const img = useImage()
const authStore = useAuthStore()
const homeStore = useHomeStore()
const propertyStore = usePropertyStore()

const {t} = useI18n()

const onClickSchedule = () => {
    eventBus.emit(OPEN_SCHEDULE_VIEWING, true)
    propertyStore.selectedProperty = props.item
}

const formatedPrice = computed(() => {
    if(props.item) {
        const property = props.item
        if(property.pfi && property.pf) {
            if(property.pfi === 2 && property.pt) {
                return `$${property.pf.toLocaleString()} - $${property.pt.toLocaleString()}`
            } else {
                return `$${property.pf.toLocaleString()}`
            }
        } else if(property.price_format_id && property.price_from) {
            if(property.price_format_id === 2 && property.price_to) {
                return `$${property.price_from.toLocaleString()} - $${property.price_to.toLocaleString()}`
            } else {
                return `$${property.price_from.toLocaleString()}`
            }
        }
    }

    return t('property.list_details.to_be_determined_abbr'); //price_format_id === 3 or bad data
})

const isFavoriteItem = computed(() => {
  return authStore.favItems.findIndex(item => props.item.id == item.id) != -1
})

const onClickFavorite = () => {
  authStore.toggleFavorite(props.item.id, isFavoriteItem.value)
}
</script>

<template>
<div class="flex flex-col min-h-[400px] max-h-[400px] bg-primary hover:shadow-lg">
    <div class="relative w-full overflow-hidden">
        <NuxtImg class="w-full min-h-[250px] max-h-[250px]" 
        :placeholder="img(props.item.builderPrimaryLogo || props.item.pi || (homeStore.isBuilderSite ? '/images/property_no_img_thumb_bps.png' : '/images/property_no_img_thumb.png'), { f: 'png', blur: 2, q: 50 })"
        :src="props.item.builderPrimaryLogo || props.item.pi || (props.item.image_urls?.length && props.item.image_urls[0]) || (homeStore.isBuilderSite ? '/images/property_no_img_thumb_bps.png' : '/images/property_no_img_thumb.png')"/>
        <span class="bg-secondary text-primary absolute top-0 right-0 px-2 py-1 font-semibold">LISTING</span>
    </div>
    <div class="w-full h-[150px] p-4 flex flex-col justify-between">
        <div class="flex flex-col items-center">
            <NuxtLink 
            :to="props.item.pu || props.item.alt_path_url"
            class="capitalize text-secondary font-semibold text-2xl text-center hover:underline">
                {{ props.item.fa || props.item.full_address || `${props.item.address_number} ${props.item.address_street}` }}
            </NuxtLink>
            <div class="text-white text-2xl text-center">{{ formatedPrice }}</div>
        </div>
        <div class="flex justify-between items-end">
            <span class="text-white">{{ item.bedrooms }} bds / {{ item.bathrooms_half + item.bathrooms_full }} ba</span>
            <div class="text-secondary flex gap-x-4">
                <div
                @click="onClickSchedule()" 
                class="h-full cursor-pointer flex items-center justify-center text-3xl">
                    <FontAwesome :icon="faCalendarDays"/>
                </div>
                <div
                @click="onClickFavorite()" 
                class="h-full cursor-pointer flex items-center justify-center text-3xl">
                    <FontAwesome :icon="faStar"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>