<script setup lang="ts">
import { faCalendarDays, faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
    item: PropertyItem
    showBuilder?: boolean
    hideStatus?: boolean
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

const isForSale = computed(() => {
    return !['Expired', 'Withdrawn', 'Terminated', 'Sold'].includes(props.item.s || props.item.status);
})

const onClickFavorite = () => {
  authStore.toggleFavorite(props.item.id, isFavoriteItem.value)
}

const validateNeighborhoodUrl = (val: string) => {
    const title = props.item.pn || props.item.polygon?.title || props.item.id || props.item.polygon?.ancestors[props.item.polygon?.ancestors?.length - 1]?.title
    if(val === '/neighborhood/') return `/neighborhood/${title}`
    else return val
} 
</script>

<template>
<div class="flex flex-col md:flex-row mb-4 lg:mb-10">
    <NuxtLink
    :to="props.item.pu || props.item.alt_path_url"
    class="relative w-full md:min-w-[240px] md:max-w-[240px] lg:min-w-[220px] lg:max-w-[220px] aspect-square overflow-hidden">
        <NuxtImg class="w-full h-full md:h-[240px] lg:h-[220px] aspect-square " 
        :placeholder="img(props.item.builderPrimaryLogo || props.item.pi || (homeStore.isBuilderSite ? '/images/property_no_img_thumb_bps.png' : '/images/property_no_img_thumb.png'), { f: 'png', blur: 2, q: 50 })"
        :src="props.item.builderPrimaryLogo || props.item.pi || (props.item.image_urls?.length && props.item.image_urls[0]) || (homeStore.isBuilderSite ? '/images/property_no_img_thumb_bps.png' : '/images/property_no_img_thumb.png')"/>
        <span v-if="homeStore.isBuilderSite" class="bg-secondary text-primary absolute top-0 left-0 px-2 py-1 font-semibold">LISTING</span>
    </NuxtLink>
    <div 
    class="w-full lg:w-[calc(100%-220px)] flex flex-row lg:flex-col text-primary1 bg-[#D7E4EA] lg:bg-white gap-y-2 m-0 md:ml-4">
        <div class="flex flex-col lg:flex-row w-full bg-[#D7E4EA] px-10 py-6 lg:p-2 text-xl lg:text-base min-h-1/3 gap-2 lg:gap-0">
            <span class="lg:w-1/5 text-4xl lg:text-base"><span class="hidden lg:inline-flex">{{ $t('property.list_details.price') }}</span> {{ formatedPrice }}</span>
            <span class="lg:w-2/5 inline-flex flex-col lg:flex-row gap-2 justify-between">
                <span class="w-full">{{ $t('property.list_details.address') }}
                    <NuxtLink 
                    :to="props.item.pu || props.item.alt_path_url"
                    class="underline hover:text-primary capitalize">
                        {{ props.item.fa || props.item.full_address || `${props.item.address_number} ${props.item.address_street}` }}
                    </NuxtLink>
                </span>
                <span v-if="!hideStatus" class="w-full text-black font-semibold">
                    {{ $t('property.list_details.status') }}
                    <span
                    :class="propertyStatusClass(props.item.s || props.item.status)"
                    class="inline-block rounded-md text-white p-1">
                        {{ props.item.s || props.item.status || 'N/A' }}
                    </span>
                </span>
            </span>
            <span
            v-if="item.pp || item.polygon" 
            :class="[showBuilder ? 'lg:w-1/5' : 'lg:w-2/5']"
            class="flex gap-1">
                <span class="hidden lg:inline-block">{{ $t('property.list_details.sub') }}</span>
                <span class="inline-block lg:hidden">{{ $t('property.show.features.subdivision') }}</span>
                <template v-if="item.pp">
                    <NuxtLink :to="validateNeighborhoodUrl(props.item.pp)" class="underline hover:text-primary capitalize">{{ props.item.pn }}</NuxtLink>
                </template>
                <template v-else-if="item.polygon">
                    <NuxtLink v-if="item.polygon.ancestors?.length > 0" 
                        :to="validateNeighborhoodUrl(item.polygon.ancestors[item.polygon.ancestors.length - 1].path_url)" 
                        class="underline hover:text-primary capitalize">
                        {{ item.polygon.ancestors[item.polygon.ancestors.length - 1].title }}
                    </NuxtLink>
                    <NuxtLink v-else
                    :to="validateNeighborhoodUrl(props.item.polygon.path_url)" 
                    class="underline hover:text-primary capitalize">{{ props.item.polygon.title }}</NuxtLink>
                </template>
            </span>
            <span v-if="showBuilder" class="lg:w-1/5 capitalize">
                <NuxtLink v-if="item.bp || item.builder"
                class="underline"
                :to="(item.builder && item.builder.path_url) || item.bp || item.builder_path">
                    {{ (item.builder && item.builder.name) || item.bn || item.builder_name }}
                </NuxtLink>
                <NuxtLink v-else-if="item.bn || item.builder_name">{{ item.bn || item.builder_name }}</NuxtLink>
            </span>
        </div>
        <div class="hidden lg:block h-full overflow-y-auto">{{ trimText(props.item.dsc || props.item.descr, 200) }}</div>
        <div class="hidden lg:flex gap-4">
            <NuxtLink
            :to="props.item.pu || props.item.alt_path_url" 
            class="cursor-pointer font-semibold capitalize hover:underline">
                {{ $t('property.cta.btn_view_listing') }}
            </NuxtLink>
            <span
            v-if="isForSale"
            @click="onClickFavorite()"
            :class="[isFavoriteItem ? 'text-red-500' : '']" 
            class="cursor-pointer hover:underline">
                {{ isFavoriteItem ? $t('favorite.item.btn_remove') : $t('favorite.item.btn_add') }}
                <FontAwesome :icon="faStar"/>
            </span>
            <span
            v-if="isForSale"
            @click="onClickSchedule()"
            class="cursor-pointer hover:underline">
                {{ $t('schedule.listing.btn_view') }}
                <FontAwesome :icon="faCalendarDays"/>
            </span>
            <span v-else
            :class="propertyStatusClass(props.item.s || props.item.status)"
            class="inline-block rounded-md text-white p-1 font-semibold">
                {{ props.item.s || props.item.status || 'N/A' }}
            </span>
        </div>
        <div
        v-if="isForSale"
        class="flex lg:hidden flex-col min-w-[120px] border-l border-white">
            <div
            @click="onClickFavorite()" 
            class="h-full border-white border-b cursor-pointer flex items-center justify-center text-2xl">
                <FontAwesome :icon="faStar"/>
            </div>
            <div
            @click="onClickSchedule()" 
            class="h-full border-white border-t cursor-pointer flex items-center justify-center text-2xl">
                <FontAwesome :icon="faCalendarDays"/>
            </div>
        </div>
    </div>
</div>
</template>