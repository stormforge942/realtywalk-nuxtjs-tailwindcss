<template>
    <div
    @mouseenter="open = true"
    @mouseleave="open = false" 
    class="absolute top-0 right-40">
        <div
        class="inline-flex h-10 items-center gap-x-2 cursor-pointer bg-dark hover:bg-darkHover px-4">
            <span class="text-white uppercase text-sm">{{ $t('home.header.btn_settings') }}</span>
           <FontAwesome
           :class="[open && '-rotate-180']" 
           class="text-secondary pb-2" :icon="faSortDown"/>
        </div>
        <ul
        :class="[open ? 'opacity-100 h-max' : 'opacity-0 h-0']" 
        class="bg-white text-primary flex flex-col overflow-y-hidden drop-shadow-lg">
            <li><NuxtLink to="/user/profile">{{ $t('menu.my_profile') }}</NuxtLink></li>
            <li><NuxtLink to="/user/favorites">{{ $t('menu.favorite') }}</NuxtLink></li>
            <li @click="onClickLogOut()"><NuxtLink to="/">{{ $t('menu.log_out') }}</NuxtLink></li>
        </ul>
    </div>

</template>


<script setup lang="ts">
import { faSortDown } from '@fortawesome/free-solid-svg-icons';

const authStore = useAuthStore()

const open = ref(false)

const onClickLogOut = () => {
    authStore.logout()
    localStorage.setItem('user', 'null')
    localStorage.setItem('token', '')
}

</script>

<style lang="css" scoped>
ul > li {
    @apply inline-flex h-8 items-center p-2 cursor-pointer hover:bg-gray-200
}

li a {
    @apply capitalize
}
</style>