<script setup lang="ts">

const propertyStore = usePropertyStore()
</script>

<template>
    <div class="flex flex-col lg:flex-row px-12 py-10 gap-4">
        <div class="w-full">
            {{ propertyStore.selectedProperty?.descr }}
        </div>
        <div class="w-full">
            <iframe width="100%" height="450"
                :src="`https://maps.google.com/maps?width=100%&amp;height=450&amp;hl=en&amp;q=${propertyStore.selectedProperty?.full_address_with_zip}+(${propertyStore.selectedProperty?.full_address_with_zip})&amp;output=embed`"
                frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
        </div>
    </div>
</template>