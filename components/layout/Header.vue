<script setup lang="ts">
import WatchDemo from '@/components/base/WatchDemo.vue';
</script>

<template>
    <div class="flex justify-between p-4 items-center bg-primary text-white h-[100px] lg:h-[120px]">
        <NuxtImg 
            class="hidden lg:block"
            alt="Realty Walk" 
            src="/images/logo-rw.png" 
            width="60px" 
            height="90px"/>
        <NuxtImg 
            class="block lg:hidden"
            alt="Realty Walk" 
            src="/images/logo-rw-horizontal.png" 
            height="45px"/>
        <div class="font-semibold hidden lg:block w-full max-w-[460px] px-4">
            {{ $t('home.header.caption') }}
        </div>
        <div class="hidden lg:flex flex-col h-full justify-between">
            <div>
                <button></button>
            </div>
            <ul class="flex items-center">
                <li><NuxtLink to="/">{{ $t('menu.address_lookup') }}</NuxtLink></li>
                <li><NuxtLink to="/about">{{ $t('menu.about') }}</NuxtLink></li>
                <li><NuxtLink to="/neighborhoods">{{ $t('menu.neighborhoods') }}</NuxtLink></li>
                <li><NuxtLink to="/builders">{{ $t('menu.report_bug') }}</NuxtLink></li>
                <WatchDemo />
            </ul>
        </div>
        
    </div>
</template>

<style lang="css" scoped>
a {
    @apply px-2 w-min hover:text-secondary
}
li {
    @apply flex items-center text-center font-semibold;
}
li:not(:first-of-type)::before {
    content: "|";
    @apply block text-secondary opacity-50;
}
</style>