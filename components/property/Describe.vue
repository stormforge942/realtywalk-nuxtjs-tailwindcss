<script setup lang="ts">

const propertyStore = usePropertyStore()
const isLoading = ref(true)
</script>

<template>
    <div class="flex flex-col lg:flex-row px-6 lg:px-12 py-10 gap-4">
        <div class="w-full">
            {{ propertyStore.selectedProperty?.descr }}
        </div>
        <div class="w-full h-[450px] border border-primary1 relative">
            <div class="w-full h-full flex items-center justify-center absolute top-0 left-0" v-if="isLoading">
                <BaseCircleProgress size="5xl"/>
            </div>
            <iframe
                class="w-full h-full mx-0 my-0" 
                @load="isLoading = false"
                :src="`https://maps.google.com/maps?width=100%&amp;height=450&amp;hl=en&amp;q=${propertyStore.selectedProperty?.full_address_with_zip}+(${propertyStore.selectedProperty?.full_address_with_zip})&amp;output=embed`"></iframe>
        </div>
    </div>
</template>