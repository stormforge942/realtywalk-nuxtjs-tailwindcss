<script setup lang="ts">
import { faAngleDown, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

const {t} = useI18n()

const homeStore = useHomeStore();
const authStore = useAuthStore();


const onClickSaveSearch = () => {
    if(authStore.authenticated) {
        homeStore.saveSearch = !homeStore.saveSearch
    } else {
        Swal.mixin({
            text: t('favorite.item.alert_login'),
            confirmButtonColor: '#012e55',
            confirmButtonText: 'OK'
        }).fire()
    }
}

const onClickShowSearch = (val: boolean) => {
    if(getBreakpoint() != 'sm' && !val) {
        homeStore.showResult = false;
    }
    homeStore.showSearch = val;
}


const onClickShowResult = (val: boolean) => {
    if(window.innerWidth > 1024) {
        homeStore.showSearch = val
    }
    homeStore.showResult = val
}
</script>

<template>
    <div class="absolute text-xl lg:text-base z-30 top-0 left-0 lg:top-[10px] lg:left-4 flex w-screen lg:w-max lg:gap-x-2 bg-dark py-[1px] lg:bg-transparent lg:py-0">
        <button
        class="flex group w-full lg:w-max"
        @click="onClickShowSearch(!homeStore.showSearch)">
            <div 
            :class="[homeStore.showSearch ? 'bg-secondary text-primary lg:text-white lg:bg-primary1' : 'text-white']"
            class="bg-primary1 lg:bg-primary lg:group-hover:bg-primary1 w-full h-[50px] lg:w-32 lg:h-10 flex items-center justify-center">
                {{ $t('home.map.btn_search_criteria') }}
            </div>
            <div class="bg-dark group-hover:bg-darkHover text-secondary min-w-[50px] h-[50px] lg:min-w-10 lg:h-10 flex items-center justify-center">
                <FontAwesome 
                :icon="faAngleDown"
                :class="homeStore.showSearch && 'rotate-180'"/>
            </div>
        </button>
        <button
        class="flex group w-full lg:w-max"
        @click="onClickSaveSearch">
            <div 
            :class="[homeStore.saveSearch ? 'bg-secondary text-primary font-semibold' : 'bg-primary1 lg:bg-primary lg:group-hover:bg-primary1 text-white']"
            class=" w-full h-[50px] lg:w-28 lg:h-10 flex items-center justify-center">
                {{ $t('home.map.btn_save_search_short') }}
            </div>
            <div 
            class="bg-dark group-hover:bg-darkHover text-secondary min-w-[50px] h-[50px] lg:min-w-28 lg:h-10 flex lg:hidden items-center justify-center">
                <FontAwesome 
                :icon="faBookmark"/>
            </div>
        </button>
        <div class="hidden lg:flex gap-x-2 ml-7">
            <button 
            @click="onClickShowResult(false)"
            :class="!homeStore.showResult && 'selected'"
            class="gradient-button ">{{homeStore.showResult ? $t('home.map.btn_back_to_neighborhoods') : $t('home.map.btn_neighborhoods') }}</button>
            <button 
            @click="onClickShowResult(true)"
            :class="homeStore.showResult && 'selected'"
            class="gradient-button ">{{ $t('home.map.btn_results') }}</button>
        </div>
        <div 
        :class="[homeStore.showResult && 'lg:flex']"
        class="hidden gap-x-2">
            <button 
            @click="homeStore.isListView = true"
            :class="[homeStore.isListView ? 'border-secondary' : 'border-gray-300']"
            class="border-2 h-10 px-2 hover:bg-gray-100">{{ $t('home.result.btn_map_view') }}</button>
            <button
            @click="homeStore.isListView = false"
            :class="[homeStore.isListView ? 'border-gray-300' : 'border-secondary']"
            class="border-2 h-10 px-2 hover:bg-gray-100">{{ $t('home.result.btn_list_view') }}</button>
        </div>
    </div>
</template>

<style lang="css" scoped>
.gradient-button {
    @apply h-10 bg-primary1 text-white text-base px-4 hover:bg-primary uppercase
}
.gradient-button.selected {
    @apply bg-secondary text-primary lg:font-semibold
}
</style>