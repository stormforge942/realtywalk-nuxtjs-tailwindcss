<script setup lang="ts">
const store = useHomeStore();
const items = ref(Array(30))
</script>

<template>
    <div class="w-full flex flex-col p-4 text-primary ">
        <button
        @click="store.setMapViewMode(true)" 
        class="self-end hover:text-dark">{{ $t('home.start_screen.btn_go_to_map') }}</button>
        <h1 class="self-center pt-6 pb-4 text-4xl">{{ $t('home.start_screen.title') }}</h1>
    </div>
    <div class="w-full max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4 gap-8">
        <HomeNeighborItem :key="item" v-for="item in items"/>
    </div>
</template>