<script setup lang="ts">

const homeStore = useHomeStore();

</script>

<template>
    <div
    :class="homeStore.showResult ? 'h-[calc(100vh-200px)] md:h-[calc(100vh-170px)]' : 'h-0'" 
    class="absolute top-[200px] md:top-[100px] lg:top-[120px] left-0 w-screen md:left-[320px] md:w-[calc(100vw-320px)] bg-white">

    </div>
</template>