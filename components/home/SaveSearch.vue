<script setup lang="ts">
import Swal from 'sweetalert2';

const {t} = useI18n()

const homeStore = useHomeStore()
const authStore = useAuthStore()

const search = ref('')

const onClickSave = async () => {
    if(authStore.authenticated) {
        await authStore.saveSearch(search.value)
        homeStore.saveSearch = false
    } else {
        await Swal.mixin({
            text: t('favorite.item.alert_login'),
            confirmButtonColor: '#012e55',
            confirmButtonText: 'OK'
        }).fire()
    }
}
</script>

<template>
    <div 
    :class="[homeStore.saveSearch ? 'max-h-full lg:opacity-100' : 'max-h-0 opacity-0']"
    class="bg-white lg:max-w-[300px] h-[calc(100vh-150px)] lg:h-max w-full fixed top-[120px] left-0 lg:left-[320px] flex flex-col gap-y-4 px-4 pb-4 pt-20 overflow-y-hidden z-20">
        <span class="text-xl lg:text-base text-primary">{{ $t('home.searches.name_search') }}</span>
        <input type="text" v-model="search"/>
        <button 
        @click="onClickSave()"
        :disabled="search.length === 0 || authStore.isLoading" 
        type="submit">
            {{ $t('home.searches.btn_save') }}
        </button>
    </div>
</template>