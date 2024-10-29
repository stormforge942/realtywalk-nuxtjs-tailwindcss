<script setup lang="ts">
import { faCalendarDays, faStar } from '@fortawesome/free-solid-svg-icons';


const {t} = useI18n()

const authStore = useAuthStore()
const propertyStore = usePropertyStore()

const formattedPrice = computed(() => {
    if(propertyStore.selectedProperty) {
        const item = propertyStore.selectedProperty
        if(item.price_format_id === 2 && item.price_to) {
            return `$${item.price_from?.toLocaleString()} - $${item.price_to.toLocaleString()}`
        } else if(item.price_format_id === 1) {
            return `$${item.price_from?.toLocaleString()}`
        }
    }
    return t('general.text_tbd')
})

const onClickSchedule = () => {
    eventBus.emit(OPEN_SCHEDULE_VIEWING, true)
}

const onClickFavorite = () => {
  if(!propertyStore.selectedProperty) return false
  authStore.toggleFavorite(propertyStore.selectedProperty.id, isFavoriteItem.value)
}

const isFavoriteItem = computed(() => {
  if(!propertyStore.selectedProperty) return false
  return authStore.favItems.findIndex(item => propertyStore.selectedProperty?.id == item.id) != -1
})

const isForSale = computed(() => {
  if(!propertyStore.selectedProperty) return false
  return !['Expired', 'Withdrawn', 'Terminated', 'Sold'].includes(propertyStore.selectedProperty.s || propertyStore.selectedProperty.status);
})
</script>

<template>
    <div class="flex flex-col py-6 px-7 bg-[#D6D6D6]">
        <div class="flex justify-between mb-4">
            <ul class="flex flex-col lg:flex-row text-xl">
                <li class="lg:pr-6">{{ $t('property.show.features.title') }}</li>
                <li class="lg:border-x-2 border-black lg:px-6 font-semibold">{{ formattedPrice }}</li>
                <li class="lg:pl-6 font-semibold">{{ propertyStore.selectedProperty?.full_address }}</li>
            </ul>
            <div
            v-if="isForSale" 
            class="flex text-primary text-lg gap-8 flex-col sm:flex-row">
              <span
              :class="[isFavoriteItem ? 'text-red-500' : '']"
              @click="onClickFavorite()" 
              class="cursor-pointer group">
                <span class="group-hover:underline pr-2">{{ isFavoriteItem ? $t('favorite.item.btn_remove') : $t('favorite.item.btn_add') }}</span>
                <FontAwesome :icon="faStar"/>
              </span>
              <span
              @click="onClickSchedule()"
              class="cursor-pointer group">
                <span class="group-hover:underline pr-2">{{ $t('schedule.listing.btn_view') }}</span>
                  <FontAwesome :icon="faCalendarDays"/>
              </span>
            </div>
        </div>
        <div>
            <ul class="grid grid-cols-1 gap-1 grid-flow-row sm:grid-flow-col sm:grid-cols-none sm:grid-rows-6 lg:grid-rows-3">
              <li>
                {{ propertyStore.selectedProperty?.bedrooms }}
                {{ $t("property.show.features.bedrooms") }}
              </li>
              <li>
                {{
                  $t("property.show.features.bathrooms", {
                    n: propertyStore.selectedProperty?.bathrooms_full,
                    h: propertyStore.selectedProperty?.bathrooms_half,
                  })
                }}
              </li>
              <li>
                {{ propertyStore.selectedProperty?.sqft }}
                {{ $t("property.show.features.sqft") }}
              </li>
              <li v-if="propertyStore.selectedProperty?.garage_capacity">
                {{ $t("property.show.features.garage_capacity") }}
                {{ propertyStore.selectedProperty?.garage_capacity }}
              </li>
              <li v-if="propertyStore.selectedProperty?.stories">
                {{ $t("property.show.features.stories") }}
                {{ propertyStore.selectedProperty?.stories }}
              </li>
              <li>
                {{ $t("property.show.features.year_built") }}
                {{ propertyStore.selectedProperty?.year_built }}
              </li>
              <li>
                {{ $t("property.show.features.neighborhood") }}
                <NuxtLink v-if="propertyStore.selectedProperty?.neighborhood != 'N/A'" 
                  :to="propertyStore.selectedProperty?.neighborhood_path
                    ? propertyStore.selectedProperty?.neighborhood_path
                    : '/neighborhood/' + propertyStore.selectedProperty?.neighborhood_slug
                  ">
                  {{ propertyStore.selectedProperty?.neighborhood }}
                </NuxtLink>
                <span v-else>{{ propertyStore.selectedProperty?.neighborhood }}</span>
              </li>
              <li class="">
                {{ $t("property.show.features.subdivision") }}
                <NuxtLink v-if="propertyStore.selectedProperty?.subdivision != 'N/A'" 
                :to="propertyStore.selectedProperty?.subdivision_path
                    ? propertyStore.selectedProperty?.subdivision_path
                    : '/neighborhood/' + propertyStore.selectedProperty?.subdivision_slug
                  ">
                  {{ propertyStore.selectedProperty?.subdivision }}
                </NuxtLink>
                <span v-else>{{ propertyStore.selectedProperty?.subdivision }}</span>
              </li>
              <li class="" 
              v-if="propertyStore.selectedProperty?.office_name">
                {{ $t("property.show.features.office") }}
                <NuxtLink v-if="propertyStore.selectedProperty?.office_website" :to="propertyStore.selectedProperty?.office_website">{{ propertyStore.selectedProperty?.office_name }}</NuxtLink>
                <span v-else>{{ propertyStore.selectedProperty?.office_name }}</span>
              </li>
              <li class="">
                {{ $t("property.show.features.zipcode") }}
                {{ propertyStore.selectedProperty?.zipcode }}
              </li>
              <li class="">
                {{ $t("property.show.features.mls_number") }}
                {{ propertyStore.selectedProperty?.mls_number }}
              </li>
              <li>
                {{ $t("property.show.features.fees_and_taxes") }} N/A
              </li>
              <li>
                {{ $t("property.show.features.status") }}
                <span
                class="p-1 rounded-md text-white" 
                :class="propertyStatusClass(propertyStore.selectedProperty?.status)" >
                  {{ propertyStore.selectedProperty?.status }}
                </span>
              </li>
              <li>
                {{ $t("property.show.features.broker") }}
                {{ propertyStore.selectedProperty?.broker || '–' }}
              </li>
            </ul>
        </div>
    </div>
</template>

<style lang="css" scoped>
a {
  @apply text-blue-600 hover:text-primary cursor-pointer hover:underline normal-case;
}
</style>