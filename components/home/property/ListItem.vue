<script setup lang="ts">
import { faCalendarDays, faStar } from '@fortawesome/free-solid-svg-icons';

interface Props {
    property: PropertyItem
}

const props = defineProps<Props>()
const img = useImage()
</script>

<template>
<div class="flex flex-col md:flex-row mb-4 lg:mb-10">
    <NuxtLink
    class="relative w-full md:min-w-[240px] md:max-w-[240px] lg:min-w-[220px] lg:max-w-[220px] aspect-square overflow-hidden">
        <NuxtImg class="w-full h-full md:h-[240px] lg:h-[220px] aspect-square " 
        :placeholder="img(props.property.pi, { f: 'png', blur: 2, q: 50 })"
        :src="props.property.pi"/>
    </NuxtLink>
    <div 
    class="w-[calc(100%-220px)] hidden lg:flex flex-col text-primary1 gap-y-2 ml-4">
        <div class="flex bg-[#D7E4EA] p-2 min-h-1/3">
            <span class="w-1/5">{{ $t('property.list_details.price') }} ${{ props.property.pf }}</span>
            <span class="w-2/5 inline-flex gap-x-2 justify-between">
                <span class="w-full">{{ $t('property.list_details.address') }}
                    <NuxtLink 
                    :to="props.property.pu"
                    class="underline hover:text-primary cursor-pointer">
                        {{ props.property.fa }}
                    </NuxtLink>
                </span>
                <span class="w-full text-black font-semibold">
                    {{ $t('property.list_details.status') }}
                    <NuxtLink
                    :to="props.property.pp" 
                    class="bg-green-600 rounded-md text-white p-1">
                        {{ props.property.s }}
                    </NuxtLink>
                </span>
            </span>
            <span class="w-2/5">{{ $t('property.list_details.sub') }} 
                <span class="underline hover:text-primary cursor-pointer">{{ props.property.pn }}</span>
            </span>
        </div>
        <div class="h-1/3">{{ props.property.dsc }}</div>
        <div class="flex">
            <span class="w-1/5 cursor-pointer font-semibold">
                {{ $t('property.cta.btn_view_listing') }}
            </span>
            <span class="w-2/5 cursor-pointer">
                {{ $t('favorite.item.btn_add') }}
                <FontAwesome :icon="faStar"/>
            </span>
            <span class="w-2/5 cursor-pointer">
                {{ $t('schedule.listing.btn_view') }}
                <FontAwesome :icon="faCalendarDays"/>
            </span>
        </div>
    </div>
    <div class="flex lg:hidden w-full bg-[#D7E4EA] text-primary1">
        <div class="border-white border-r w-full flex flex-col px-10 py-6 text-xl">
            <div class="text-4xl">${{ props.property.pf.toLocaleString() }}</div>
            <div class="w-full">{{ $t('property.list_details.address') }}
                <NuxtLink 
                :to="props.property.pu"
                class="underline hover:text-primary cursor-pointer">
                    {{ props.property.fa }}
                </NuxtLink>
            </div>
            <div>
                {{ $t('property.list_details.status') }}
                <span class="bg-green-600 rounded-md text-white px-2 py-1">
                    {{ props.property.s }}
                </span>
            </div>
            <div>
                {{ $t('property.show.features.subdivision') }} 
                <NuxtLink 
                :to="props.property.pp" 
                class="underline hover:text-primary cursor-pointer">
                    {{ props.property.pn }}
                </NuxtLink>
            </div>
            <div>{{ props.property.bn }}</div>
        </div>
        <div class="flex flex-col min-w-[120px] border-l border-white">
            <div class="h-full border-white border-b cursor-pointer flex items-center justify-center text-2xl">
                <FontAwesome :icon="faStar"/>
            </div>
            <div class="h-full border-white border-t cursor-pointer flex items-center justify-center text-2xl">
                <FontAwesome :icon="faCalendarDays"/>
            </div>
        </div>
    </div>
</div>
</template>