<script setup lang="ts">
const propertyStore = usePropertyStore()
</script>


<template>
    <div class="w-full bg-primary py-3 px-5 lg:p-5">
        <div class="flex flex-col sm:flex-row gap-4 sm:items-center max-w-screen-lg mx-auto">
            <div class="text-white text-3xl w-full">  
                {{propertyStore.selectedNeighbor?.title}}
            </div>
            <div class="bg-secondary hover:opacity-95 cursor-pointer text-primary text-base font-semibold pt-[10px] px-2 pb-2 sm:max-w-[250px] text-center">
                {{ $t('View Properties in this Neigbhorhood') }}
            </div>
        </div>
    </div>
</template>