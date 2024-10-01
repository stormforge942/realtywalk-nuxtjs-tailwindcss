<script lang="ts" setup>
import MenuButton from './MenuButton.vue';
import WatchDemo from './WatchDemo.vue';

const isActive = ref(false);

const toggleMenu = () => {
    isActive.value = !isActive.value;
}

const handleOutSideClick = (e: MouseEvent) => {
    const drawer = document.querySelector('#mobile-drawer');
    const button = document.querySelector('#mobile-button');

    if (drawer && !drawer.contains(e.target as Node) && button && !button.contains(e.target as Node)) {
        isActive.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleOutSideClick);
});

onUnmounted(() => {
    document.removeEventListener('click', handleOutSideClick);
});
</script>

<template>
    <div 
    id='mobile-button'
    class="flex items-center h-[100px] lg:hidden fixed z-50 top-0 right-8">
        <MenuButton :is-active="isActive" @toggle-menu="toggleMenu"/>
    </div>
    <ul 
    id='mobile-drawer'
    :class="[
        isActive ? 'right-0' : '-right-[300px]',
        'fixed z-40 top-0  w-[300px] h-screen bg-primary',
        'pt-[100px] shadow-[-11px_1px_13px_-6px_#0000003F]']">
        <div class="flex flex-col items-center justify-start max-h-[calc(100vh - 100px)] overflow-y-auto">
            <li><NuxtLink to="/">{{ $t('menu.address_lookup') }}</NuxtLink></li>
            <li><NuxtLink to="/about">{{ $t('menu.about') }}</NuxtLink></li>
            <li><NuxtLink to="/neighborhoods">{{ $t('menu.neighborhoods') }}</NuxtLink></li>
            <li><NuxtLink to="/builders">{{ $t('menu.builder') }}</NuxtLink></li>
            <li><NuxtLink to="/register">{{ $t('menu.register') }}</NuxtLink></li>
            <li><NuxtLink to="/signin">{{ $t('menu.sign_in') }}</NuxtLink></li>
            <li><NuxtLink to="/favorites">{{ $t('menu.favorite') }}</NuxtLink></li>
            <li><NuxtLink to="/">{{ $t('menu.report_bug') }}</NuxtLink></li>
            <WatchDemo />
        </div>
    </ul>
</template>

<style lang="css" scoped>
a {
    @apply text-xl p-3 w-max font-semibold hover:text-secondary
}
li {
    @apply block m-3
}
</style>